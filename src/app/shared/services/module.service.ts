import { Injectable } from '@angular/core';
import { LOGIN_TYPES } from '../../utility/constants';
import { AccessRights, MODULE_ACTION_ACCESS } from '../../utility/action-rights-control';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class ModuleService {
    private readonly moduleKey = 'module';


    constructor(private authService: AuthService) { }


    getModuleByName(name: string) {
        const module = this.authService.getModule();

        return module?.find((module: any) => module.title === name);
    }

    getModuleForm(name: string, formId: any) {
        const module = this.getModuleByName(name);
        return module?.forms?.find((form: any) => form.form_id === formId);
    }
    getModuleTable(name: string, tableId: any) {
        const module = this.getModuleByName(name);
        return module?.tables?.find((form: any) => form.table_id === tableId);
    }

    getSubModuleByName(moduleName: string, subModuleName: string) {
        const module = this.getModuleByName(moduleName);
        return module?.children?.find((subModule: any) => subModule.title === subModuleName);
    }

    getSubSubModuleByName(moduleName: string, subModuleName: string, subSubModuleName: string) {
        const subModule = this.getSubModuleByName(moduleName, subModuleName);
        return subModule?.children?.find((subSubModule: any) => subSubModule.title === subSubModuleName);
    }

    getFormById(moduleName: string, subModuleName: string, formId: any) {
        const subModule = this.getSubModuleByName(moduleName, subModuleName);
        return subModule?.forms?.find((form: any) => form.form_id === formId);
    }

    getTableById(moduleName: string, subModuleName: string, tableId: any) {
        const subModule = this.getSubModuleByName(moduleName, subModuleName);
        return subModule?.tables?.find((form: any) => form.table_id === tableId);
    }

    getAccessMap(moduleName: string, subModuleName?: string, subSubModuleName?: string): Record<string, boolean> {
        let module = this.authService.getModule();

        if (subModuleName && subSubModuleName) {
            module = this.getSubSubModuleByName(moduleName, subModuleName, subSubModuleName);
        } else if (subModuleName) {
            module = this.getSubModuleByName(moduleName, subModuleName);
        } else {
            module = this.getModuleByName(moduleName);
        }
        const defaultAccess = module?.default_access || {};
        const loginTypeId = this.authService.getUser()?.login_type_id;
        const moduleKey = [moduleName, subModuleName, subSubModuleName].filter(Boolean).join('_');
        if (loginTypeId === LOGIN_TYPES.ORGANIZATION_ADMIN) {
            const overrideAccess = ((MODULE_ACTION_ACCESS[loginTypeId] as unknown) as Record<string, AccessRights>)[moduleKey] || {};
            return {
                addRight: overrideAccess.addRight ?? true,
                approveRight: overrideAccess.approveRight ?? true,
                deleteRight: overrideAccess.deleteRight ?? true,
                exportRight: overrideAccess.exportRight ?? true,
                importRight: overrideAccess.importRight ?? true,
                modifyRight: overrideAccess.modifyRight ?? true,
                viewRight: overrideAccess.viewRight ?? true,
            };
        }

        else if (loginTypeId === LOGIN_TYPES.PRIMARY || loginTypeId === LOGIN_TYPES.FIELD_USER) {
            const overrideAccess = ((MODULE_ACTION_ACCESS[loginTypeId] as unknown) as Record<string, AccessRights>)[moduleKey] || {};
            return {
                addRight: overrideAccess.addRight ?? false,
                approveRight: overrideAccess.approveRight ?? false,
                deleteRight: overrideAccess.deleteRight ?? false,
                exportRight: overrideAccess.exportRight ?? false,
                importRight: overrideAccess.importRight ?? false,
                modifyRight: overrideAccess.modifyRight ?? false,
                viewRight: overrideAccess.viewRight ?? false,
            };
        }

        else {
            return {
                addRight: defaultAccess.add === true,
                approveRight: defaultAccess.approve === true,
                deleteRight: defaultAccess.delete === true,
                exportRight: defaultAccess.export === true,
                importRight: defaultAccess.import === true,
                modifyRight: defaultAccess.modify === true,
                viewRight: defaultAccess.view === true,
            };
        }
    }


    getAllowedPaths(): string[] {
        const paths: string[] = [];
        const modules = this.authService.getModule();
        if (!modules) return paths;

        for (const module of modules) {
            if (module.path) {
                paths.push('/' + module.path.replace(/^\/+/, ''));
            }

            if (Array.isArray(module.children)) {
                for (const child of module.children) {
                    if (child.path) {
                        paths.push('/' + child.path.replace(/^\/+/, ''));
                    }

                    if (Array.isArray(child.children)) {
                        for (const subChild of child.children) {
                            if (subChild.path) {
                                paths.push('/' + subChild.path.replace(/^\/+/, ''));
                            }
                        }
                    }
                }
            }
        }

        return paths;
      }
      

}

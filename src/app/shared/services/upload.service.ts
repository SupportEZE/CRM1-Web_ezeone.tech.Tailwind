import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../core/services/api/api.service';
import { LogService } from '../../core/services/log/log.service';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {
    constructor(
        private router: Router,
        private logService: LogService,
        private toastr: ToastrService,
        public api: ApiService,
    ) { }

    uploadFile(
        id: string | number,
        controller: any,
        uploadFiles: { file: File[] }[] | File[] | undefined,
        label: string,
        submodule: any,
        redirectUrl?: any,
        onSuccessCallback?: () => void,
        docId?:any,
        originalData?: any,
    ): void {
        if (!uploadFiles || uploadFiles.length === 0) {
            console.warn("No files to upload.");
            return;
        }

        const formData = new FormData();
        const filename:any[] = [];
        // If uploadFiles is an array of File objects, handle it separately
        if (uploadFiles[0] instanceof File) {
            (uploadFiles as File[]).forEach((fileObj) => {
                const fileExtension = fileObj.name.split('.').pop();
                const randomName = `${this.generateRandomName(12)}.${fileExtension}`;
                formData.append('files', fileObj, randomName);
                filename.push({ 'file': randomName, 'label': (fileObj as any).image_type || label, 'doc_no': (fileObj as any).doc_no || '' })
            });
        } else {
            (uploadFiles as { file: File[] }[]).forEach((field) => {
                if (field && Array.isArray(field.file)) {
                    field.file.forEach((fileObj) => {

                        const fileExtension = fileObj.name.split('.').pop();
                        const randomName = `${this.generateRandomName(12)}.${fileExtension}`;
                        formData.append('files', fileObj, randomName);
                        filename.push({
                            file: randomName,
                            label: (fileObj as any).image_type || label,
                            doc_no: (fileObj as any).doc_no || ''
                        });
                        // Object.assign(field.file, { image_type: (fileObj as any).image_type });
                    });
                }
            });
        }
        if (docId != '' && docId != undefined){
            formData.append('exist_id', docId ?? 0);
        }
        formData.append('module_id', submodule?.module_id ?? 0);
        formData.append('module_name', submodule?.module_name ?? '');
        formData.append('sub_module_id', submodule?.sub_module_id ?? 0);
        formData.append('sub_module_name', submodule?.sub_module_name ?? '');
        formData.append('label', JSON.stringify(filename));
        formData.append('_id', id.toString());
        if (originalData) {
            this.logService.logActivityOnDelete(submodule.sub_module_id ? submodule.sub_module_id : submodule.module_id, submodule.title ? submodule.title : submodule.module_name, 'update', id , 'Images are updated');
        }
        this.api.uploadFile(formData, controller+'/upload').subscribe({
            next: (result) => {
                if (result?.statusCode === 200) {
                    this.api.disabled= false;
                    this.toastr.success(result['message'], '', { positionClass: 'toast-top-right' });
                    if (redirectUrl) {
                        this.router.navigate([redirectUrl]).catch(() => {
                            onSuccessCallback?.();
                        });
                    } else {
                        onSuccessCallback?.();
                    }
                }
            },
            error: (error) => {
                console.error("Error uploading files:", error);
            }
        });
    }


    generateRandomName(length: number = 12): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

}

import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { formatDate } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class TargetLogService {
    constructor(public api: ApiService) {}
    
    // Detect changes between original and updated data
    private getChanges(original: any, updated: any) {
        if (!original || !updated) return {};
        
        const deepEqual = (a: any, b: any): boolean => {
            if (Array.isArray(a) && Array.isArray(b)) {
                if (a.length !== b.length) return false;
                return a.every((item, index) => deepEqual(item, b[index]));
            }
            
            if (a && b && typeof a === 'object' && typeof b === 'object') {
                const aKeys = Object.keys(a);
                const bKeys = Object.keys(b);
                if (aKeys.length !== bKeys.length) return false;
                return aKeys.every(key => deepEqual(a[key], b[key]));
            }
            
            return a === b;
        };
        
        
        return Object.keys(updated).reduce((changes: any, key) => {
            const oldValue = original[key];
            const newValue = updated[key];
            if (newValue === "" || newValue === null || newValue === undefined) {
                return changes;
            }
            
            // Exclude if both old and new values are empty arrays
            if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === 0 && newValue.length === 0) {
                return changes;
            }
            
            
            if (!deepEqual(oldValue, newValue)) {
                changes[key] = { old: oldValue, new: newValue };
            }
            
            return changes;
        }, {});
    }
    
    
    
    // Log changes only if there are updates
    directMainLog(moduleId:any, moduleFormId:any, moduleName:any,label:any,key_action:any,module_type:string){
        this.api.post({'module_name':moduleName, 'message':label + ' field has been ' + key_action, 'action':key_action, "module_id":moduleId, "form_id":moduleFormId, module_type: module_type}, 'log/form-action').subscribe(result => {
            if(result['statusCode'] === 200){
                // this.logsApi()
                // this.api.disabled = false;
            }
        });
    }
    
    
    
    
    
    logActivityOnUpdate(
        isEditMode: boolean,
        changes: any, // ✅ Already-diffed fields passed from component
        moduleId: number,
        moduleName: string,
        action: string,
        rowId?: any,
        onNoChanges?: () => void,
        module_type?: string
    ): string | boolean {
        if (!isEditMode) return false;
        
        if (!changes || Object.keys(changes).length === 0) {
            if (onNoChanges) onNoChanges();
            return true; // ✅ No changes to log
        }
        
        const logData = {
            module_id: moduleId,
            module_name: moduleName,
            action,
            row_id: rowId,
            changes, // ✅ Already computed
            module_type: module_type
        };
        
        if (!rowId) {
            delete logData.row_id;
        }
        
        this.api.post(logData, 'log/transaction-action').subscribe(result => {
            if (result.statusCode === 200) {
                // You can optionally log success or call a callback here
            }
        });
        
        return false; // ✅ Changes were logged
    }
    
    
    
    
    logActivityOnDelete(moduleId: number, moduleName: string, action: string, rowId?: any, label?:string, module_type?:string) {
        const logData = {
            module_id: moduleId,
            module_name: moduleName,
            action,
            row_id: rowId,
            message: `${label} Record with ID - ${rowId} `,
            module_type: module_type
        };
        this.api.post(logData, 'log/transaction-action').subscribe(result => {
            if (result.statusCode === 200) {
            }
        });
    }
    
    
    
    logActivityOnImage(moduleId: number, moduleName: string, action: string, rowId?: any, label?: string) {
        const logData = {
            module_id: moduleId,
            module_name: moduleName,
            action,
            row_id: rowId,
            message: `${label} record with ID - ${rowId} `
        };
        this.api.post(logData, 'log/transaction-action').subscribe(result => {
            if (result.statusCode === 200) {
            }
        });
    }
    
    
    // Fetch logs
    getLogs(moduleId: number, callback: (logs: any) => void, row?: string, module_type?: string) {
        const payload: any = { module_id: moduleId };
        if (row) {
            payload.module_id= moduleId
            payload.row_id = row;
        }
        if (module_type) {
            payload.module_type = module_type;
        }
        
        this.api.post(payload, 'log/read').subscribe(result => {
            if (result.statusCode === 200) {
                const formattedLogs = result.data.map((log: any) => ({
                    createdName: log.created_name,
                    createdAt: new Date(log.created_at),
                    changes: this.formatChanges(log.changes ? log.changes : log.message)
                }));
                callback(formattedLogs);
            }
        });
    }
    
    formatChanges(changes: any): string {
        if (typeof changes === 'string') return changes;
        
        const isPlainDiffObject = (obj: any): boolean =>
            obj && typeof obj === 'object' && 'old' in obj && 'new' in obj;
        
        const formatValue = (val: any): string => {
            if (val === null || val === undefined || val === '') return '-';
            
            if (typeof val === 'string' && val.includes('T') && val.includes('Z')) {
                try {
                    const date = new Date(val);
                    return formatDate(date, 'd MMM yyyy', 'en-US');
                } catch {
                    return val;
                }
            }
            
            if (Array.isArray(val)) {
                return val.map(item => item.name || item.product_name || JSON.stringify(item)).join(', ');
            }
            
            if (typeof val === 'object') {
                return val.name || val.product_name || JSON.stringify(val);
            }
            
            return String(val);
        };
        
        const formatArrayChange = (label: string, diff: any): string => {
            let output = `<span class="font-medium">${label}:</span><br>`;
            
            // Removed items
            if (diff.removed?.length) {
                const removed = diff.removed.map((item:any) => formatValue(item)).join(', ');
                output += `<span class="font-medium">Removed:</span> <span class="text-danger">${removed}</span><br><br>`;
            }
            
            // Added items with full object info
            if (diff.added?.length) {
                output += `<span class="font-medium">Added:</span><br>`;
                diff.added.forEach((item:any) => {
                    const label = item.name || item.product_name || 'Item';
                    const json = JSON.stringify(item, null, 2);
                    output += `<strong>${label}</strong><br><pre>${json}</pre>`;
                });
            }
            
            // Modified items
            if (diff.modified?.length) {
                diff.modified.forEach((mod: any, index: number) => {
                    const label = formatValue(mod.old.name || mod.old.product_name || `Item ${index + 1}`);
                    output += `<span class="font-medium">Modified</span> <span class="font-medium">${label}</span>:<br>`;
                    Object.keys(mod.old).forEach(key => {
                        if (mod.old[key] !== mod.new[key]) {
                            output += `- ${key}: <span class="text-danger">${formatValue(mod.old[key])}</span> → <span class="text-success">${formatValue(mod.new[key])}</span><br>`;
                        }
                    });
                });
            }
            
            return output;
        };
        
        
        return Object.entries(changes)
        .map(([field, value]: [string, any]) => {
            const label = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            if (field === 'additional_target' && typeof value === 'object' && ('added' in value || 'removed' in value || 'modified' in value)) {
                return formatArrayChange(label, value);
            }
            
            if (Array.isArray(value?.old) && Array.isArray(value?.new)) {
                return `<span class="font-medium">${label}:</span><br>${formatArrayChange(label, { added: value.new, removed: value.old, modified: [] })}`;
            }
            
            if (isPlainDiffObject(value)) {
                return `<span class="font-medium">${label}:</span> changed from <span class="text-danger">${formatValue(value.old)}</span> to <span class="text-success">${formatValue(value.new)}</span>`;
            }
            
            return `<span class="font-medium">${label}:</span> changed from <span class="text-danger">-</span> to <span class="text-success">${formatValue(value)}</span>`;
        })
        .join('<br>');
    }
    
    
    // ---------------------------- //
    
    logActivityOnUpdateArray(
        isEditMode: boolean,
        originalData: any,
        updatedData: any,
        moduleId: number,
        moduleName: string,
        action: string,
        rowId?: any,
        onNoChanges?: () => void,
        module_type?: string
    ): string | boolean {
        if (!isEditMode) return false; // Only log for edits
        const changes = this.getChangesArray(originalData, updatedData);
        if (Object.keys(changes).length === 0) {
            if (onNoChanges) onNoChanges();
            return true;
        }
        const logData = { module_id: moduleId, module_name: moduleName, action, row_id: rowId, changes, module_type: module_type };
        if (rowId === '') {
            delete logData.row_id;
        }
        this.api.post(logData, 'log/transaction-action').subscribe(result => {
            if (result.statusCode === 200) {
            }
        });
        return false; // Indicating that changes were logged
    }
    
    getChangesArray(original: any, updated: any): any {
        if (Array.isArray(original) && Array.isArray(updated)) {
            return this.getArrayDifferences(original, updated);
        }
        
        const changes: any = {};
        for (const key in original) {
            if (original[key] !== updated[key]) {
                changes[key] = { old: original[key], new: updated[key] };
            }
        }
        return changes;
    }
    
    getArrayDifferences(original: any[], updated: any[]): any {
        const changes: any = {};
        
        const maxLength = Math.max(original.length, updated.length);
        
        for (let i = 0; i < maxLength; i++) {
            const oldItem = original[i];
            const newItem = updated[i];
            
            if (oldItem && !newItem) {
                // Row deleted
                changes[`deleted_${i}`] = { old: oldItem, new: null };
            } else if (!oldItem && newItem) {
                // Row added
                changes[`added_${i}`] = { old: null, new: newItem };
            } else {
                const rowDiff: any = {};
                for (const key in oldItem) {
                    if (oldItem[key] !== newItem?.[key]) {
                        rowDiff[key] = { old: oldItem[key], new: newItem[key] };
                    }
                }
                if (Object.keys(rowDiff).length > 0) {
                    changes[`updated_${i}`] = {
                        old: oldItem,
                        new: newItem
                    };
                }
            }
        }
        
        return changes;
    }
    
    // ---------------------------- //
    
}

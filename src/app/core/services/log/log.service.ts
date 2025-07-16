import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { formatDate } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class LogService {
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
            
            // Add to changes if the values are different
            if (oldValue !== newValue) {
                changes[key] = { old: oldValue, new: newValue };
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
        console.log(originalData, 'originalData');
        console.log(updatedData, 'updatedData');

        
        const changes = this.getChanges(originalData, updatedData);
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
    
    
    
    
    // formatChanges(changes: any): string {
    //     if (typeof changes === 'string') {
    //         return changes;
    //     }
    //     if (changes && typeof changes === 'object') {
    //         return Object.entries(changes)
    //         .map(([field, value]: any) => {
    //             const formattedField = field.replace(/_/g, ' ')
    //             return `${formattedField.charAt(0).toUpperCase() + formattedField.slice(1)}: changed from 
    //                             <span class="text-danger">${value.old}</span> to 
    //                             <span class="text-success">${value.new}</span>`;
    //         })
    //         .join('<br>');
    //     } else {
    //         return '';
    //     }
    // }
    
    
    formatChanges(changes: any): string {
        // Price Confiq Format In Product Module//
        const isArrayLikeChange = changes && typeof changes === 'object' &&
        Object.keys(changes).every(key => !isNaN(Number(key)) && changes[key]?.old && changes[key]?.new);
        
        if (isArrayLikeChange) {
            return Object.keys(changes)
            .map(key => {
                const oldItem = changes[key].old;
                const newItem = changes[key].new;
                
                // Dynamically choose a label field (e.g. zone, name, etc.)
                const labelKey = Object.keys(oldItem).find(k => typeof oldItem[k] === 'string') || `Row ${key}`;
                const label = oldItem[labelKey] || newItem[labelKey] || `Row ${key}`;
                
                const fieldDiffs = Object.keys(oldItem)
                .filter(field => oldItem[field] !== newItem[field])
                .map(field =>
                    `${label}: changed from ${this.stringifyValue(oldItem[field])} to ${this.stringifyValue(newItem[field])}`
                );
                
                return fieldDiffs.join('<br>');
            })
            .filter(Boolean)
            .join('<br>');
        }
        // Price Confiq Format In Product Module//
        
        if (typeof changes === 'string') return changes;
        
        const stringifyValue = (val: any): string => {
            if (val === null || val === undefined || val === '') return '-';
            
            // Handle ISO date format and format as 'd MMM yyyy'
            if (typeof val === 'string' && val.includes('T') && val.includes('Z')) {
                try {
                    const date = new Date(val);
                    return formatDate(date, 'd MMM yyyy', 'en-US'); // e.g. "21 Apr 2025"
                } catch {
                    return val;
                }
            }
            
            // Show simplified display for array of objects
            if (Array.isArray(val)) {
                return val.map((item: any) => {
                    if (item.product_name) return item.product_name;
                    if (item.name) return item.name;
                    return JSON.stringify(item);
                }).join(', ');
            }
            
            if (typeof val === 'object') {
                if (val.product_name) return val.product_name;
                if (val.name) return val.name;
                return JSON.stringify(val);
            }
            
            return String(val);
        };
        
        const getDifferenceInArrays = (oldArr: any[], newArr: any[]): string => {
            const oldNames = oldArr.map((item: any) => item.product_name || item.name || JSON.stringify(item));
            const newNames = newArr.map((item: any) => item.product_name || item.name || JSON.stringify(item));
            
            const removed = oldNames.filter(x => !newNames.includes(x));
            const added = newNames.filter(x => !oldNames.includes(x));
            
            let output = '';
            if (removed.length) {
                output += `Last Value: <span class="text-danger">${removed.join(', ')}</span><br>`;
            }
            if (added.length) {
                output += `Updated Value: <span class="text-success">${added.join(', ')}</span><br>`;
            }
            
            return output || 'No actual difference';
        };
        
        if (changes && typeof changes === 'object') {
            return Object.entries(changes)
            .map(([field, value]: any) => {
                const formattedField = field.replace(/_/g, ' ');
                const label = formattedField.charAt(0).toUpperCase() + formattedField.slice(1);
                
                // Special handling for additional_target array
                if (Array.isArray(value.old) && Array.isArray(value.new)) {
                    return `${label}: <br>${getDifferenceInArrays(value.old, value.new)}`;
                }
                
                // Regular fields
                return `${label}: changed from 
                        <span class="text-danger">${stringifyValue(value.old)}</span> to 
                        <span class="text-success">${stringifyValue(value.new)}</span>`;
            })
            .join('<br>');
        }
        
        return '';
    }
    
    stringifyValue(val: any): string {
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
            return val.map((item: any) => item.product_name || item.name || JSON.stringify(item)).join(', ');
        }
        if (typeof val === 'object') {
            return val.product_name || val.name || JSON.stringify(val);
        }
        return String(val);
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
        
        original.forEach((oldItem, index) => {
            const newItem = updated[index];
            const diff: any = {};
            
            for (const key in oldItem) {
                if (oldItem[key] !== newItem?.[key]) {
                    diff[key] = { old: oldItem[key], new: newItem?.[key] };
                }
            }
            
            if (Object.keys(diff).length > 0) {
                changes[index] = {
                    old: oldItem,
                    new: newItem
                };
            }
        });
        
        return changes;
    }
    
    // ---------------------------- //
    
}

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RemoveSpaceService {
    formatValue(obj: any) {
        return {
            ...obj,
            value: obj?.value ? obj.value.toLowerCase().replace(/\s+/g, "_") : ""
        };
    }
    formatString(obj: any): string {
        const value = typeof obj === 'string' ? obj : obj?.value;
        return value
            ? value
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "_")
            : "";
    }
    
    
    // remove _ to space
    formatText(text: string): string {
        return text ? text.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase()) : '';
    }
}

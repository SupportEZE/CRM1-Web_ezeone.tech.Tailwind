import { Injectable } from '@angular/core';
import moment from 'moment';
import { format } from 'date-fns';
@Injectable({
    providedIn: 'root'
})
export class DateService {
    // Convert date to "YYYY-MM-DD" format
    formatToYYYYMMDD(date: string | Date): string {
        return moment(date).format('YYYY-MM-DD');
    }
    
    // Convert date to "DD MMM YYYY" (e.g., 14 Nov 2025)
    formatToDDMMYYYY(data: any): any {
        if (typeof data === 'string' && moment(data, moment.ISO_8601, true).isValid()) {
            // If it's a valid date string, format it
            return moment(data).format('DD MMM YYYY');
        } 
        else if (Array.isArray(data)) {
            // If it's an array, format each element (if it's a valid date string or Date)
            return data.map(item => this.formatToDDMMYYYY(item));
        } 
        else if (typeof data === 'object' && data !== null) {
            // If it's an object, iterate through its keys and format only the date values
            for (let key in data) {
                const value = data[key];
                
                // Check if the value is a valid date string or Date object
                if (typeof value === 'string' && moment(value, moment.ISO_8601, true).isValid()) {
                    data[key] = moment(value).format('DD MMM YYYY');
                } 
                else if (value instanceof Date) {
                    data[key] = moment(value).format('DD MMM YYYY');
                } 
                else if (typeof value === 'object') {
                    // If the value is an object, process it recursively
                    data[key] = this.formatToDDMMYYYY(value);
                }
            }
        }
        return data;
    }
    
    // Convert date to "DD MMM YYYY MM" (e.g., 14 Nov 2025)
    formatToDDMMYYYYHHMM(data: any): any {
        if (typeof data === 'string' && moment(data, moment.ISO_8601, true).isValid()) {
            // Convert to 12-hour format with AM/PM
            return moment(data).format('DD MMM YYYY h:mm A');
        } 
        else if (Array.isArray(data)) {
            // If it's an array, format each date inside
            return data.map(item => this.formatToDDMMYYYYHHMM(item));
        } 
        else if (typeof data === 'object' && data !== null) {
            // If it's an object, process its keys
            for (let key in data) {
                const value = data[key];
                
                if (typeof value === 'string' && moment(value, moment.ISO_8601, true).isValid()) {
                    data[key] = moment(value).format('DD MMM YYYY h:mm A');
                } 
                else if (value instanceof Date) {
                    data[key] = moment(value).format('DD MMM YYYY h:mm A');
                } 
                else if (typeof value === 'object') {
                    // Recursively format nested objects
                    data[key] = this.formatToDDMMYYYYHHMM(value);
                }
            }
        }
        return data;
    }
    
    
    
    
    // Optionally, you can also create a method for arrays of objects  
    
    formatDatesInArray(data: any): any {
        if (Array.isArray(data)) {
            return data.map(item => this.formatDatesInObject(item)); // Process each item if it's an array
        } else if (typeof data === 'object' && data !== null) {
            return this.formatDatesInObject(data); // Process single object
        }
        return data; // Return unchanged if it's neither an array nor an object
    } 
    
    // Helper method to format all dates in an object (or array) that are ISO 8601 strings
    formatDatesInObject(obj: any): any {
        
        for (let key in obj) {
            const value = obj[key];
            if (typeof value === 'string' && moment(value, moment.ISO_8601, true).isValid()) {
                obj[key] = moment(value).format('YYYY-MM-DDTHH:mm:ssZ');  // This includes the timezone offset like +05:30
            }
            else if (value instanceof Date) {
                obj[key] = moment(value).format('YYYY-MM-DDTHH:mm:ssZ');
            }
        }
        return obj;
    }
    
    
    
    
    convertUTCtoLocal(utcDateString: string): Date {
        const utcDate = new Date(utcDateString);
        return new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    }
    
    
    
    
    
    
    
    //-----------format Dates For Listing Page In Array------------------//
    formatDatesForListPageInArray(data: any): any {
        if (Array.isArray(data)) return data.map(this.formatDatesListPageInObject.bind(this));
        if (data && typeof data === 'object') return this.formatDatesListPageInObject(data);
        return data;
    }
    
    private formatDatesListPageInObject(obj: any): any {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && this.isValidDate(obj[key])) {
                obj[key] = format(new Date(obj[key]), 'dd MMM yyyy');
            } else if (Array.isArray(obj[key])) {
                obj[key] = obj[key].map(this.formatDatesListPageInObject.bind(this));
            } else if (obj[key] && typeof obj[key] === 'object') {
                obj[key] = this.formatDatesListPageInObject(obj[key]);
            }
        }
        return obj;
    }
    
    
    
    private isValidDate(value: any): boolean {
        return typeof value === 'string' && !isNaN(Date.parse(value));
    }
    
    formatAndPrintFormData(form: any) {
        const formattedObject: { [key: string]: any } = {}; // Create a new object to store formatted keys and values
        
        for (let key in form) {
            if (form.hasOwnProperty(key)) {
                const formattedKey = key
                .split('_') // Split by underscore
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
                .join(' '); // Join with spaces
                
                formattedObject[formattedKey] = form[key]; // Assign the original value to the new formatted key
            }
        }
        
        return formattedObject; // Return the new object with formatted keys
    }
    
    
    
    // Convert to UTC format 2025-04-22T18:30:00.000Z
    convertToUTC(timeString: string, date: any) {
        date = new Date(date);
        const datePart = date.toISOString().split('T')[0]; // Get the date part (YYYY-MM-DD)
        const timeParts = timeString.match(/(\d+):(\d+)\s*(AM|PM)/i); // Match time and AM/PM
        
        if (!timeParts) {
            throw new Error('Invalid time format');
        }
        
        let hours = parseInt(timeParts[1], 10);
        const minutes = parseInt(timeParts[2], 10);
        const period = timeParts[3].toUpperCase(); // AM or PM
        
        // Adjust for AM/PM
        if (period === 'AM') {
            if (hours === 12) {
                hours = 0; // Midnight case
            }
        } else if (period === 'PM') {
            if (hours !== 12) {
                hours += 12; // Convert PM times to 24-hour format
            }
        }
        
        // Construct the local date-time string
        const localDateTime = `${datePart}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
        
        // Create a Date object using the local date-time string
        const localDate = new Date(localDateTime);
        
        // Convert to UTC
        const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
        
        return utcDate;
    }
    
    // Convert only time tp 12hr format
    formatTime24to12(timeStr: string): string {
        if (!timeStr) return '--';
        const [hour, minute] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hour, minute);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    dateandtimetotime(dateTime: string | Date): string {
        const date = new Date(dateTime);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    convrtMinToHrAndMin(minutes: number): string {
        if (minutes == null || isNaN(minutes)) return '-';
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        let result = '';
        if (hrs > 0) result += `${hrs} hr `;
        if (mins > 0 || hrs === 0) result += `${mins} min`;
        return result.trim();
    }
    
    
    
    adjustDateRange(filter: any, key_name: any): { start: string; end: string } | null {
        if (filter.start_date && filter.end_date) {
            const start = new Date(filter.start_date);
            const end = new Date(filter.end_date);
            
            const formattedStart = moment(start).format('YYYY-MM-DD');
            const formattedEnd = moment(end).format('YYYY-MM-DD');
            const range = {
                start: formattedStart,
                end: formattedEnd
            };
            
            filter[key_name] = range;
            
            return range;
        }
        
        return null;
    }
}

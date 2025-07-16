import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() {}
  /**
  * Formats API validation error messages into a readable string.
  * @param errors - API response error object
  * @returns A formatted string containing all error messages
  */
  formatErrorMessages(errors: any): string {
    if (!errors || typeof errors !== 'object') {
      return 'An unknown error occurred.';
    }
    
    return Object.values(errors).join('\n'); // Joins all error messages with line breaks
  }
  
  /**
  * Handles different API response status codes and returns appropriate messages.
  * @param error - HTTP error response
  * @returns A formatted error message
  */
  handleApiError(error: any): string {
    if (!error || !error.status) {
      return 'An unknown error occurred. Please try again.';
    }
    
    switch (error.status) {
      case 400:
      return error.error.message;;
      case 401:
      return error.error.message ? error.error.message : 'Unauthorized. Please log in again.';
      case 403:
      return 'Forbidden. You do not have permission to access this resource.';
      case 404:
      return error.error.message;
      case 409:
      return error.error.message;
      case 422:
      return 'The request could not be processed due to invalid input. Please check the provided data and try again';
      case 500:
      return 'Internal Server Error. Please try again later.';
      case 503:
      return 'Service Unavailable. Please try again later.';
      default:
      return `Unexpected Error (${error.status}). Please try again.`;
    }
  }
  
  createValidation(formField:any){
    
    const validators= []
    
    if(formField.required){
      validators.push(Validators.required);
    }
    if(formField.minLength){
      validators.push(Validators.minLength(formField.minLength));
    }
    if(formField.maxLength){
      validators.push(Validators.maxLength(formField.maxLength));
    }
    formField.control = new FormControl('', validators)
  }
}

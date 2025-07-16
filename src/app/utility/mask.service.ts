import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaskService {

  constructor() { }

  maskValue(value: string): string {
    if (!value || value.length <= 4) return value;
    return 'X'.repeat(value.length - 4) + value.slice(-4);
  }
}

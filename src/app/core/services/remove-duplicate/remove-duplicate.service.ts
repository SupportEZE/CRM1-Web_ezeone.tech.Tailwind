import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoveDuplicateService {

  constructor() { }

  removeDuplicateNames(data: any[]): any[] {
    const seen = new Set();
    return data.filter(item => {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        return true;
      }
      return false;
    });
  }
}

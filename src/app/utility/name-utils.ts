import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameUtilsService {
  getInitials(name: string): string {
  if (!name) return '';
  const words = name.split(' ').filter(word => /^[A-Za-z]/.test(word)); 
  if (words.length === 1) return words[0][0].toUpperCase(); 
  return (words[0][0] + words[words.length - 1][0]).toUpperCase(); 
}
}

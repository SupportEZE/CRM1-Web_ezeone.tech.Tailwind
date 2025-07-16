import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
export interface BreadcrumbItem {
  label: string;
  icon?: string; // Optional icon class
  isActive?: boolean;
  svgClass?: string;
  svgPath?:string;
  iconClass?: string;
  separatorIconPath?: string; 
  prefixIconPath?: string; // Optional SVG path for prefix icon
  prefixIconPath1?: string; 
  prefixIconClass?: string; 
  separatorIconClass?: string; // CSS class for the separator icon
   isLast?: boolean; 
}

@Component({
  selector: 'spk-breadcrumb',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './spk-breadcrumb.component.html',
  styleUrl: './spk-breadcrumb.component.scss'
})
export class SpkBreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  @Input() defaultIconPath: string = 'M6 13L10 3';
  @Input() defaultSeparatorPath: string = 'M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14'; // Default separator path
  @Input() defaultPrefixClass: string = 'flex-shrink-0 me-3 h-4 w-4 text-primary hover:text-primary dark:text-primary'; // Default prefix icon class
}

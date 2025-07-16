import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-blog-category-card',
  standalone: true,
  imports: [],
  templateUrl: './spk-blog-category-card.component.html',
  styleUrl: './spk-blog-category-card.component.scss'
})
export class SpkBlogCategoryCardComponent {
  @Input() icon: string = ''; // Icon class for each category
  @Input() categoryName: string = ''; // Name of the category
  @Input() itemCount: number = 0; // Number of items in the category
  @Input() badgeClass: string = ''; // Badge class for styling
}

import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'spk-blog-image-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './spk-blog-image-card.component.html',
  styleUrl: './spk-blog-image-card.component.scss'
})
export class SpkBlogImageCardComponent {
  @Input() cardData!: {
    title?: string;
    description?: string;
    image?: string;
    altText?: string;
    routerLink?: string;
    readMoreLink?: string;
    authorName?: string;
    avatarClass?: string;
    authorImage?: string;
    date?: string;
    link?: string;
    imageClass?: string;
    imageClass1?: string;
    imageBottom?:boolean;
    imageTop?:boolean;
  };
}

import { Component, Input} from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { DateService } from '../../services/date.service';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataNotFoundComponent } from '../data-not-found/data-not-found.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
    selector: 'app-comments',
    standalone: true,
    imports: [CommonModule,MaterialModuleModule, FormsModule, DataNotFoundComponent, SkeletonComponent],
    templateUrl: './comments.component.html',
})
export class CommentsComponent {
    
    @Input() detailId!: string;
    @Input() module = '';
    @Input() showAvatar = true;
    
    comment: string = '';
    commentsData: any[] = [];
    skCommentsLoading = false;
    
    constructor(public api: ApiService, private dateService: DateService) {}
    
    ngOnInit(): void {
        this.getComments();
    }
    
    ngOnChanges(): void {
        this.getComments();
    }
    
    getComments(): void {
        this.getCommentsDetail();
        setTimeout(() => this.scrollToBottom(), 200);
    }
    
    getCommentsDetail(): void {
        this.skCommentsLoading = true;
        this.api.post({ row_id: this.detailId }, `${this.module}/read-comment`).subscribe(result => {
            if (result['statusCode'] === 200) {
                this.skCommentsLoading = false;
                this.commentsData = this.dateService.formatToDDMMYYYYHHMM(result['data']);
                setTimeout(() => this.scrollToBottom(), 100);
            }
        });
    }
    
    postComment(): void {
        if (this.comment.trim() !== '') {
            this.api.disabled = true;
            this.api.post({ row_id: this.detailId, comment: this.comment }, `${this.module}/save-comment`).subscribe(result => {
                if (result['statusCode'] === 200) {
                    this.comment = '';
                    this.api.disabled = false;
                    this.getCommentsDetail();
                }
            });
        }
    }
    
    scrollToBottom(): void {
        const commentList = document.getElementById('commentList');
        if (commentList) {
            commentList.scrollTop = commentList.scrollHeight;
        }
    }
    
}

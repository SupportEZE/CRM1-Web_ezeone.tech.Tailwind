import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { FilePondModule } from 'ngx-filepond';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { FormsModule } from '@angular/forms';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { CommonApiService } from '../../../../../shared/services/common-api.service';
import { SpkGalleryComponent } from '../../../../../../@spk/spk-reusable-plugins/spk-gallery/spk-gallery.component';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { SpkProductCardComponent } from '../../../../../../@spk/reusable-apps/spk-product-card/spk-product-card.component';

const data1 = [
    {
        srcUrl: './assets/images/media/media-40.jpg',
        previewUrl: './assets/images/media/media-40.jpg',
    },
];

@Component({
    selector: 'app-social-engagement-add',
    imports: [FormsModule,CommonModule, SharedModule,MaterialModuleModule, FilePondModule,SpkProductCardComponent,ModalHeaderComponent],
    templateUrl: './social-engagement-add.component.html',
})
export class SocialEngagementAddComponent {
    data:any ={};
    skLoading:boolean = false
    items!: GalleryItem[];
    socialList: any = [];
    selectedPlatform:any = {};
    
    constructor(public dialog:MatDialog,public api: ApiService,public toastr: ToastrServices,public CommonApiService: CommonApiService,@Inject(MAT_DIALOG_DATA) public modalData: any,private dialogRef: MatDialogRef<SocialEngagementAddComponent>){}
    
    ngOnInit() {
        this.getList();
    }
    
    close() {
        this.dialogRef.close(); // Closes the dialog
    }
    
    getList(){
        this.skLoading = true
        this.api.post({}, 'web-social/default-platforms').subscribe(result => {
            if(result['statusCode'] == 200){
                this.skLoading = false;
                this.socialList = result['data'];
                
                if (this.modalData.pageType === 'edit') {
                    this.data = this.modalData.rowData;
                    this.selectedPlatform = this.socialList.find(
                        (item: any) => item.title === this.data.title
                    ) || null;
                }
            }
        });
    }
    
    onSelectPlatform(selectedTitle: string) {
        const selectedPlatform = this.socialList.find((item: any) => item.title === selectedTitle);
        if (selectedPlatform) {
            this.data.title = selectedPlatform.title;
            this.data.icon = selectedPlatform.icon;
            this.data.web_icon = selectedPlatform.web_icon;
            this.data.web_text_color = selectedPlatform.web_text_color;
            this.data.app_icon = selectedPlatform.app_icon;
            this.data.app_text_color = selectedPlatform.app_text_color;
        }
    }
    
    onSubmit(){
        this.api.disabled = true;

        const isEditMode = this.modalData.pageType === 'edit';
        const functionName = isEditMode ? 'web-social/update' : 'web-social/create';
        const httpMethod = isEditMode ? 'patch' : 'post';
        this.api[httpMethod](this.data, functionName).subscribe(result => {
            if(result['statusCode'] === 200){
                this.api.disabled = false;
                this.toastr.success(result['message'], '', 'toast-top-right');
                this.dialogRef.close(true)
            }
        });
    }
    
    statusList = [
        { label: "Active"},
        { label: "Inactive"},
    ];
    
}
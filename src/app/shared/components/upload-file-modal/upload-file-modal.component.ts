import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { FilePondModule } from 'ngx-filepond';
import { ToastrServices } from '../../services/toastr.service ';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api/api.service';
import { FormsModule } from '@angular/forms';
import { SpkBlockquoteCardComponent } from '../../../../@spk/reusable-ui-elements/spk-cards/spk-blockquote-card/spk-blockquote-card.component';

@Component({
  selector: 'app-upload-file-modal',
  imports: [CommonModule, SharedModule, FormsModule, MaterialModuleModule, FilePondModule, SpkBlockquoteCardComponent],
  templateUrl: './upload-file-modal.component.html'
})
export class UploadFileModalComponent {
  uploadUrl:any;
  formData = new FormData();
  data:any={};
  errorLogs:any =[];
  errorFilename:any
  
  
  constructor(public toastr: ToastrServices, @Inject(MAT_DIALOG_DATA) public modalData: any, private dialogRef: MatDialogRef<UploadFileModalComponent>, public api:ApiService){
    this.uploadUrl  = this.api.upload
  }
  
  
  pondOptions = {
    allowMultiple: false,
    labelIdle: 'Drop .csv files here or <span class="filepond--label-action">Browse</span>',
    acceptedFileTypes: ['text/csv', '.csv'],
    maxFileSize: '5MB',
  };
  
  pondFiles: File[] = [];
  
  pondHandleInit() {
  }
  
  pondHandleAddFile(event: any) {
  }
  
  pondHandleActivateFile(event: any) {
  }
  
  onFileAdd(event: any) {
    const file = event.file.file;
    const validFormats = ['text/csv', '.csv'];
    // Validate file type
    if (!validFormats.includes(file.type)) {
      this.pondFiles =[];
      this.toastr.error('Invalid file type. Only .csv are allowed.', '', 'toast-top-right');
      return;
    }
    // Validate file size
    const byte = 1000000; // 1 MB in bytes
    if (file.size > (2 * byte) ) {
      this.toastr.error('File size should not exceed 2MB.', '', 'toast-top-right');
      return;
    }
    this.pondFiles.push(file);
  }
  
  
  sampleFile(){
    this.api.post({"form_id":this.modalData.formId}, 'csv/generate-sample-csv').subscribe(result => {
      if(result['statusCode'] === 200){
        window.open(this.uploadUrl+result['data']['filename'],  '_blank');
        this.dialogRef.close(true)
      }
    });
  }
  
  
  downloadErrorFile(){
    window.open(this.uploadUrl+this.errorFilename,  '_blank');
    this.dialogRef.close(true)
  }
  
  onSubmit(form:any) {

    if(this.errorLogs.length > 0){
      this.toastr.error('.Csv file not correct', '', 'toast-top-right');
      return;
    }
    if (!this.pondFiles) {
      this.toastr.error('Upload a file.', '', 'toast-top-right');
      return;
    }
    this.formData.append('file', this.pondFiles[0]);
    this.formData.append("form_id", this.modalData.formId);
    this.api.disabled = true;
    this.api.uploadFile(this.formData, 'csv/analyze-csv-data').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.errorLogs = result['data']['errors'] ? result['data']['errors'] : [];
        if(this.errorLogs.length > 0){
          this.errorFilename =result['data']['filename'];
        }
        if(this.errorLogs === 0){
          this.productImport(result['data']['data']);
        }
        this.api.disabled = false;
      }
    });
  }
  
  productImport(data:any =[]) {
    this.api.disabled = true;
    this.api.post({'form_id':this.modalData.formId, 'csv_data':data}, 'product/import').subscribe(result => {
      if (result['statusCode'] === 200) {
        this.api.disabled = false;
      }
    });
  }
  
  
  
  
}

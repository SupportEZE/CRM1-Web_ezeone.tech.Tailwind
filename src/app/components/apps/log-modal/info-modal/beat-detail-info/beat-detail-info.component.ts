import { Component, Inject } from '@angular/core';
import { MaterialModuleModule } from '../../../../../material-module/material-module.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrServices } from '../../../../../shared/services/toastr.service ';
import { ApiService } from '../../../../../core/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpkRibbonsComponent } from '../../../../../../@spk/reusable-advancedui/spk-ribbons/spk-ribbons.component';
import { ShowcodeCardComponent } from '../../../../../shared/components/showcode-card/showcode-card.component';
import { ModalHeaderComponent } from '../../../../../shared/components/modal-header/modal-header.component';
import { NameUtilsService } from '../../../../../utility/name-utils';

@Component({
  selector: 'app-beat-detail-info',
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MaterialModuleModule,
    // SpkRibbonsComponent,
    ShowcodeCardComponent,
    ModalHeaderComponent
  ],
  templateUrl: './beat-detail-info.component.html',
})
export class BeatDetailInfoComponent {
  beatPartyInfo:any=[];
  skLoading:boolean = false;
  // prsimCodeData: any = PrismCode;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<BeatDetailInfoComponent>,public api: ApiService,public toastr: ToastrServices, public nameUtils: NameUtilsService){}
  
  ngOnInit() {
    if (this.data && this.data.beat_code) {
      this.getBeatInfo();
    }
  }
  
  close() {
    this.dialogRef.close(); // Closes the dialog
  }

  getBeatInfo() {
    if (!this.data.beat_code) {
      console.warn("No beat_code provided");
      return;  // Stop execution if beat_code is undefined
    }
    
    this.skLoading = true;
    this.api.post({ 'beat_code': this.data.beat_code, 'user_id': this.data.user_id }, 'beat/read-party').subscribe(result => {
      this.skLoading = false;
      if (result['statusCode'] === 200) {
        this.beatPartyInfo = result['data'];
      }
    });
  }
  
}

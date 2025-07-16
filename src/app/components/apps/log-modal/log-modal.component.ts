import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogService } from '../../../core/services/log/log.service';
import { SharedModule } from '../../../shared/shared.module';
import { LogsComponent } from '../../../shared/components/logs/logs.component';

@Component({
  selector: 'app-log-modal',
  imports: [SharedModule, LogsComponent],
  templateUrl: './log-modal.component.html',
})
export class LogModalComponent {
  logList:any =[]
  skLoading:boolean = false
  
  
  constructor(@Inject(MAT_DIALOG_DATA) public modalData: any,private logService: LogService){}
  ngOnInit() {
    this.skLoading = true;
    this.logService.getLogs(this.modalData.moduleId, (logs) => {
      this.logList = logs;
      this.skLoading = false;
    }, 
    this.modalData.rowId ? this.modalData.rowId : '',
    this.modalData.module_type ?? this.modalData.module_type
  );
}
}

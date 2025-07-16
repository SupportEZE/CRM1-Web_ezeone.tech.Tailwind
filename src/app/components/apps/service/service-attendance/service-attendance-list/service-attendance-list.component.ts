import { Component, Input } from '@angular/core';
import { AttendanceListComponent } from "../../../sfa/attendance/attendance-list/attendance-list.component";

@Component({
  selector: 'app-service-attendance-list',
  imports: [AttendanceListComponent],
  templateUrl: './service-attendance-list.component.html',
})
export class ServiceAttendanceListComponent {
  
}

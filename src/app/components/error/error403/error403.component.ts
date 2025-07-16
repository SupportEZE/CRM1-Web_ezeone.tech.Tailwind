import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error403',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './error403.component.html',
})
export class Error403Component {

  constructor(public location: Location) { }


  back(): void {
    this.location.back()
  }
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error401',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './error401.component.html',
  styleUrl: './error401.component.scss'
})
export class Error401Component {
  constructor(public location: Location) { }


  back(): void {
    this.location.back()
  }
}

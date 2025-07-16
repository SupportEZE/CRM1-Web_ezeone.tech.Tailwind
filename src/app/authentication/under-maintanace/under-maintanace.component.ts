import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Renderer2,Inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-under-maintanace',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './under-maintanace.component.html',
  styleUrl: './under-maintanace.component.scss'
})
export class UnderMaintanaceComponent {
  futureDate = new Date();
  constructor(@Inject(DOCUMENT) private document: Document,private elementRef: ElementRef,
  private renderer: Renderer2){
    document.body.classList.add('coming-soon-main');
    this.futureDate.setDate(this.futureDate.getDate() + 356); // Set the future date to two days ahead
  }

  ngOnDestroy(): void {
    document.body.classList.remove('coming-soon-main');    
  }
  days!: number;
  hours!: number;
  minutes!: number;
  seconds!: number;
  timerInterval:any;
  ngOnInit(): void {
    setInterval(() => {
      this.timerInterval =  this.updateTimer();
    }, 1000);
  }

  updateTimer() {
    const currentDate = new Date();
    const timeDifference = this.futureDate.getTime() - currentDate.getTime();
    
    if (timeDifference > 0) {
      this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        this.futureDate.setSeconds(this.futureDate.getSeconds() - 1); // Decrease future date by one second
    } else {
        clearInterval(this.timerInterval);
    }
}
}

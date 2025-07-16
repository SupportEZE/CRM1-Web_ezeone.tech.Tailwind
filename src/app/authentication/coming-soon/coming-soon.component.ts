import { Component, ElementRef, Renderer2, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss',
})
export class ComingSoonComponent {
  futureDate = new Date();
  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    document.body.classList.add('coming-soon-main');
    this.futureDate.setDate(this.futureDate.getDate() + 356); // Set the future date to two days ahead
  }

  timerInterval:any;
  ngOnDestroy(): void {
    document.body.classList.remove('coming-soon-main');
  }
  days!: number;
  hours!: number;
  minutes!: number;
  seconds!: number;
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

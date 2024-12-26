import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successpage',
  templateUrl: './successpage.component.html',
  styleUrls: ['./successpage.component.css']
})

export class SuccesspageComponent implements OnInit  {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Automatically navigate to the next page after 3 seconds
    this.navigateToNextPage();

  }

  // Method to navigate to the desired route after a delay
  navigateToNextPage(): void {
    // Show a message or perform any action before navigating
    // console.log('Navigating in 3 seconds...');
    // Set a timeout for 5 seconds (5000 milliseconds)
    setTimeout(() => {
      this.router.navigate(['/']); // Replace '/next-page' with your desired route
    }, 5000); // 1000 milliseconds = 1 seconds
  }
}

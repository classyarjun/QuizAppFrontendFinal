import { Component, OnInit } from '@angular/core';
// src/app/components/user-score-list/user-score-list.component.ts
import { UserScoreService } from 'src/service/user-score.service';
import { UserScore, Status } from 'src/modal/user-score';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-all-users',
  templateUrl: './admin-all-users.component.html',
  styleUrls: ['./admin-all-users.component.css']
})
export class AdminAllUsersComponent  implements OnInit {
  userScores: UserScore[] = []; // Array to hold user scores
  filteredUserScores: UserScore[] = []; // Array to hold filtered user scores
  searchQuery: string = ''; // Search query for domain filtering
  statusQuery: string = ''; // Search query for status filtering
  errorMessage: string = ''; // Error message for API failure

  constructor(private userScoreService: UserScoreService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserScores();
  }

  fetchUserScores(): void {
    this.userScoreService.getUserScores().subscribe({
      next: (data: UserScore[]) => {
        this.userScores = data.map((score) => ({
          ...score,
          domain: score.domain || '', // Default to an empty string if domain is null
          status: score.status || '', // Default to an empty string if status is null
        }));
        this.filteredUserScores = [...this.userScores]; // Initialize filtered array
        console.log('Fetched User Scores:', this.userScores);
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch user scores. Please try again later.';
        console.error('Error fetching user scores:', error);
      },
    });
  }

  filterByDomain(): void {
    const query = this.searchQuery?.toLowerCase().trim() || ''; // Handle undefined or null query
    this.filteredUserScores = this.userScores.filter((score) =>
      score.domain.toLowerCase().includes(query)
    );
    this.filterByStatus(); // Reapply status filter after domain filtering
  }

  filterByStatus(): void {
    const query = this.statusQuery?.toLowerCase().trim() || ''; // Handle undefined or null query
    this.filteredUserScores = this.filteredUserScores.filter((score) =>
      score.status.toLowerCase().includes(query)
    );
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.statusQuery = '';
    this.filteredUserScores = [...this.userScores]; // Reset filters
  }

  logout(): void {
    const confirmLogout = confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      this.router.navigate(['']); // Adjust the path as needed
    }
  }
}

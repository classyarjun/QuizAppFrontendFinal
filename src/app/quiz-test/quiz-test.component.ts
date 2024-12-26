// import { Component, OnInit, OnDestroy,HostListener } from '@angular/core';
// import { Router } from '@angular/router';
// import { QuestionService } from './../../service/question.service';
// import { UserScoreService } from './../../service/user-score.service';


// @Component({
//   selector: 'app-quiz-test',
//   templateUrl: './quiz-test.component.html',
//   styleUrls: ['./quiz-test.component.css'],
// })
// export class QuizTestComponent implements OnInit, OnDestroy {
//   timeInSecs: number;
//   ticker: any;
//   countdownDisplay: string;
//   questions: any[] = [];
//   userAnswers: { [questionId: number]: string | null } = {}; // Track user answers
//   loading: boolean = true;
//   score: number = 0;
//   attemptedQuestions: number = 0;
//   showResult: boolean = false;

//   constructor(
//     private questionService: QuestionService,
//     private UserScoreService: UserScoreService,
//     private router: Router
//   ) {
//     this.timeInSecs = 55 * 60; // 55 minutes in seconds
//     this.countdownDisplay = this.formatTime(this.timeInSecs);
//   }

//   ngOnInit(): void {
//     this.startTimer(this.timeInSecs);
//     this.fetchQuestions();

//     // Listen to visibilitychange event to detect tab switching or minimization
//     document.addEventListener('visibilitychange', this.handleVisibilityChange);

//     // Prevent page refresh or closing
//     // window.addEventListener('beforeunload', this.handleBeforeUnload);
//   }

//   ngOnDestroy(): void {
//     clearInterval(this.ticker); // Clear interval when component is destroyed
//     document.removeEventListener('visibilitychange', this.handleVisibilityChange); // Clean up visibilitychange event listener
//     window.removeEventListener('beforeunload', this.handleBeforeUnload); // Clean up beforeunload event listener
//   }

//   // This function handles tab switch or minimizing
//   handleVisibilityChange = (): void => {
//     if (document.visibilityState === 'hidden') {
//       alert('Warning: Do not switch tabs during the quiz. Please stay on the quiz page!');
//     }
//   };

//   // Handle page refresh or closing
//   handleBeforeUnload = (event: BeforeUnloadEvent): void => {
//     event.preventDefault();
//     event.returnValue = 'Are you sure you want to leave the quiz? Your progress may be lost.';
//   };

//   // Timer logic
//   startTimer(secs: number): void {
//     this.timeInSecs = secs;
//     this.ticker = setInterval(() => this.tick(), 1000); // Update every second
//   }

//   tick(): void {
//     if (this.timeInSecs > 0) {
//       this.timeInSecs--; // Decrease time by one second
//     } else {
//       clearInterval(this.ticker); // Stop timer when time reaches 0
//       this.onSubmit(); // Automatically submit the quiz when time runs out
//     }
//     this.countdownDisplay = this.formatTime(this.timeInSecs); // Update the time display
//   }

//   // Format the time to MM:SS format
//   formatTime(secs: number): string {
//     const mins = Math.floor(secs / 60);
//     secs %= 60;
//     return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   }

//   // Fetch questions from the service
//   fetchQuestions(): void {
//     this.questionService.getQuestions().subscribe(
//       (data) => {
//         this.questions = data;
//         this.loading = false;

//         // Initialize answers for each question
//         this.questions.forEach((question) => {
//           this.userAnswers[question.id] = null;
//         });
//       },
//       (error) => {
//         console.error('Error fetching questions:', error);
//         this.loading = false;
//       }
//     );
//   }

//   // Handle option selection (deselect if same option clicked)
//   onOptionClick(questionId: number, selectedOption: string): void {
//     if (this.userAnswers[questionId] === selectedOption) {
//       this.userAnswers[questionId] = null;
//     }
//   }

//   // Submit the quiz
//   onSubmit(): void {
//     this.score = 0; // Reset score
//     this.attemptedQuestions = 0; // Reset attempted questions count

//     // Evaluate answers
//     this.questions.forEach((question) => {
//       const selectedAnswer = this.userAnswers[question.id];
//       if (selectedAnswer) {
//         this.attemptedQuestions++;
//         if (selectedAnswer === question.correctAnswer) {
//           this.score++;
//         }
//       }
//     });

//     const userData = JSON.parse(localStorage.getItem('studentData') || '{}');
//     const quizResult: any = {
//       name: userData.name?.trim(),
//       email: userData.emailId,
//       contactNo: userData.mono?.trim(),
//       correctAnswers: this.score,
//       attemptQuestions: this.attemptedQuestions,
//       domain: userData.interestDomain,
//       totalQuestions: this.questions.length,
//     };

//     // Submit result to the UserScoreService
//     this.UserScoreService.createUserScore(quizResult).subscribe(
//       () => {
//         this.showResult = true;
//         this.router.navigate(['/successpage']); // Navigate to success page
//       },
//       (error) => {
//         console.error('Error submitting quiz result:', error);
//         alert('Something went wrong while submitting the quiz.');
//       }
//     );
//   }
// }

//? ============// code perfect working // ==============================

// import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { QuestionService } from './../../service/question.service';
// import { UserScoreService } from './../../service/user-score.service';

// @Component({
//   selector: 'app-quiz-test',
//   templateUrl: './quiz-test.component.html',
//   styleUrls: ['./quiz-test.component.css'],
// })
// export class QuizTestComponent implements OnInit, OnDestroy, AfterViewInit {
//   timeInSecs: number;
//   ticker: any;
//   countdownDisplay: string;
//   questions: any[] = [];
//   userAnswers: { [questionId: number]: string | null } = {}; // Track user answers
//   loading: boolean = true;
//   score: number = 0;
//   attemptedQuestions: number = 0;
//   showResult: boolean = false;

//   constructor(
//     private questionService: QuestionService,
//     private UserScoreService: UserScoreService,
//     private router: Router
//   ) {
//     this.timeInSecs = 1 * 60; // 1 minute in seconds
//     this.countdownDisplay = this.formatTime(this.timeInSecs);
//   }

//   ngOnInit(): void {
//     this.startTimer(this.timeInSecs);
//     this.fetchQuestions();

//     // Add event listener for Escape key prevention
//     document.addEventListener('keydown', this.preventEscape);
//     document.addEventListener('fullscreenchange', this.onFullscreenChange); // Listen for fullscreen change

//     // Add event listener for page reload or closing
//     window.addEventListener('beforeunload', this.handleBeforeUnload);

//     // Add visibility change event listener for tab switch
//     document.addEventListener('visibilitychange', this.handleVisibilityChange);
//   }

//   ngAfterViewInit(): void {
//     // Call fullscreen after a short delay
//     setTimeout(() => {
//       this.enterFullscreen();
//     }, 100); // 100ms delay to ensure fullscreen request is within allowed action
//   }

//   ngOnDestroy(): void {
//     clearInterval(this.ticker); // Clear interval when component is destroyed
//     document.removeEventListener('keydown', this.preventEscape); // Remove Escape key listener
//     document.removeEventListener('fullscreenchange', this.onFullscreenChange); // Clean up fullscreen change listener
//     window.removeEventListener('beforeunload', this.handleBeforeUnload); // Clean up beforeunload event listener
//     document.removeEventListener('visibilitychange', this.handleVisibilityChange); // Clean up visibilitychange event listener
//   }

//   // Automatically enter fullscreen after a slight delay
//   enterFullscreen(): void {
//     const element = document.documentElement; // Fullscreen the entire document
//     if (element.requestFullscreen) {
//       element.requestFullscreen();
//     } else if ((<any>element).webkitRequestFullscreen) {
//       (<any>element).webkitRequestFullscreen(); // For Safari
//     } else if ((<any>element).msRequestFullscreen) {
//       (<any>element).msRequestFullscreen(); // For IE/Edge
//     }
//   }

//   // Prevent Escape key from exiting fullscreen
//   preventEscape = (event: KeyboardEvent): void => {
//     if (event.key === 'Escape') {
//       event.preventDefault(); // Prevent default Escape key behavior
//       alert('You cannot exit fullscreen during the quiz. Please stay in fullscreen mode.');
//       this.enterFullscreen(); // Optionally re-enter fullscreen
//     }
//   };

//   // Handle fullscreen change
//   onFullscreenChange = (): void => {
//     if (!document.fullscreenElement) {
//       // If exiting fullscreen, alert the user
//       alert('You have exited fullscreen mode. Please re-enter fullscreen to continue the quiz.');
//       this.enterFullscreen(); // Optionally re-enter fullscreen
//     }
//   };

//   // Handle tab switch or minimizing
//   handleVisibilityChange = (): void => {
//     if (document.visibilityState === 'hidden') {
//       alert('Warning: Do not switch tabs during the quiz. Please stay on the quiz page!');
//     }
//   };

//   // Handle page reload or closing
//   handleBeforeUnload = (event: BeforeUnloadEvent): void => {
//     event.preventDefault();
//     event.returnValue = 'Are you sure you want to leave the quiz? Your progress may be lost.'; // Show default browser alert
//     alert('Warning: Reloading or leaving the page will cause you to lose your progress!'); // Custom alert
//   };

//   // Timer logic
//   startTimer(secs: number): void {
//     this.timeInSecs = secs;
//     this.ticker = setInterval(() => this.tick(), 1000); // Update every second
//   }

//   tick(): void {
//     if (this.timeInSecs > 0) {
//       this.timeInSecs--; // Decrease time by one second
//     } else {
//       clearInterval(this.ticker); // Stop timer when time reaches 0
//       this.onSubmit(); // Automatically submit the quiz when time runs out
//     }
//     this.countdownDisplay = this.formatTime(this.timeInSecs); // Update the time display
//   }

//   // Format the time to MM:SS format
//   formatTime(secs: number): string {
//     const mins = Math.floor(secs / 60);
//     secs %= 60;
//     return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   }

//   // Fetch questions from the service
//   fetchQuestions(): void {
//     this.questionService.getQuestions().subscribe(
//       (data) => {
//         this.questions = data;
//         this.loading = false;

//         // Initialize answers for each question
//         this.questions.forEach((question) => {
//           this.userAnswers[question.id] = null;
//         });
//       },
//       (error) => {
//         console.error('Error fetching questions:', error);
//         this.loading = false;
//       }
//     );
//   }

//   // Handle option selection (deselect if same option clicked)
//   onOptionClick(questionId: number, selectedOption: string): void {
//     if (this.userAnswers[questionId] === selectedOption) {
//       this.userAnswers[questionId] = null;
//     } else {
//       this.userAnswers[questionId] = selectedOption;
//     }
//   }

//   // Submit the quiz
//   onSubmit(): void {
//     this.score = 0; // Reset score
//     this.attemptedQuestions = 0; // Reset attempted questions count

//     // Evaluate answers
//     this.questions.forEach((question) => {
//       const selectedAnswer = this.userAnswers[question.id];
//       if (selectedAnswer) {
//         this.attemptedQuestions++;
//         if (selectedAnswer === question.correctAnswer) {
//           this.score++;
//         }
//       }
//     });

//     const userData = JSON.parse(localStorage.getItem('studentData') || '{}');
//     const quizResult: any = {
//       name: userData.name?.trim(),
//       email: userData.emailId,
//       contactNo: userData.mono?.trim(),
//       correctAnswers: this.score,
//       attemptQuestions: this.attemptedQuestions,
//       domain: userData.interestDomain,
//       totalQuestions: this.questions.length,
//     };

//     // Submit result to the UserScoreService
//     this.UserScoreService.createUserScore(quizResult).subscribe(
//       () => {
//         this.showResult = true;
//         this.router.navigate(['/successpage']); // Navigate to success page
//       },
//       (error) => {
//         console.error('Error submitting quiz result:', error);
//         alert('Something went wrong while submitting the quiz.');
//       }
//     );
//   }
// }



// ?===========  try prevw  ///=======================
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from './../../service/question.service';
import { UserScoreService } from './../../service/user-score.service';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.css'],
})
export class QuizTestComponent implements OnInit, OnDestroy, AfterViewInit {
  timeInSecs: number;
  ticker: any;
  countdownDisplay: string;
  questions: any[] = [];
  userAnswers: { [questionId: number]: string | null } = {}; // Track user answers
  loading: boolean = true;
  score: number = 0;
  attemptedQuestions: number = 0;
  showResult: boolean = false;

  constructor(
    private questionService: QuestionService,
    private UserScoreService: UserScoreService,
    private router: Router
  ) {
    this.timeInSecs = 1 * 60; // 1 minute in seconds
    this.countdownDisplay = this.formatTime(this.timeInSecs);
  }

  ngOnInit(): void {
    this.startTimer(this.timeInSecs);
    this.fetchQuestions();

    // Add event listener for Escape key prevention
    document.addEventListener('keydown', this.preventEscape);
    document.addEventListener('fullscreenchange', this.onFullscreenChange); // Listen for fullscreen change

    // Add event listener for page reload or closing
    window.addEventListener('beforeunload', this.handleBeforeUnload);

    // Add visibility change event listener for tab switch
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // Add event listener for back navigation
    window.addEventListener('popstate', this.handleBackNavigation);

    // Prevent default back navigation
    history.pushState(null, '', location.href);
  }

  ngAfterViewInit(): void {
    // Call fullscreen after a short delay
    setTimeout(() => {
      this.enterFullscreen();
    }, 100); // 100ms delay to ensure fullscreen request is within allowed action
  }

  ngOnDestroy(): void {
    clearInterval(this.ticker); // Clear interval when component is destroyed
    document.removeEventListener('keydown', this.preventEscape); // Remove Escape key listener
    document.removeEventListener('fullscreenchange', this.onFullscreenChange); // Clean up fullscreen change listener
    window.removeEventListener('beforeunload', this.handleBeforeUnload); // Clean up beforeunload event listener
    document.removeEventListener('visibilitychange', this.handleVisibilityChange); // Clean up visibilitychange event listener
    window.removeEventListener('popstate', this.handleBackNavigation); // Clean up back navigation listener
  }

  // Automatically enter fullscreen after a slight delay
  enterFullscreen(): void {
    const element = document.documentElement; // Fullscreen the entire document
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((<any>element).webkitRequestFullscreen) {
      (<any>element).webkitRequestFullscreen(); // For Safari
    } else if ((<any>element).msRequestFullscreen) {
      (<any>element).msRequestFullscreen(); // For IE/Edge
    }
  }

  // Prevent Escape key from exiting fullscreen
  preventEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      event.preventDefault(); // Prevent default Escape key behavior
      alert('You cannot exit fullscreen during the quiz. Please stay in fullscreen mode.');
      this.enterFullscreen(); // Optionally re-enter fullscreen
    }
  };

  // Handle fullscreen change
  onFullscreenChange = (): void => {
    if (!document.fullscreenElement) {
      // If exiting fullscreen, alert the user
      alert('You have exited fullscreen mode. Please re-enter fullscreen to continue the quiz.');
      this.enterFullscreen(); // Optionally re-enter fullscreen
    }
  };

  // Handle tab switch or minimizing
  handleVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      alert('Warning: Do not switch tabs during the quiz. Please stay on the quiz page!');
    }
  };

  // Handle page reload or closing
  handleBeforeUnload = (event: BeforeUnloadEvent): void => {
    event.preventDefault();
    event.returnValue = 'Are you sure you want to leave the quiz? Your progress may be lost.'; // Show default browser alert
    alert('Warning: Reloading or leaving the page will cause you to lose your progress!'); // Custom alert
  };

  // Handle back navigation
  handleBackNavigation = (event: PopStateEvent): void => {
    const confirmation = confirm('Warning: Going back will cause you to lose your progress. Do you really want to go back?');
    if (!confirmation) {
      history.pushState(null, '', location.href); // Push current state back to prevent navigation
    }
  };

  // Timer logic
  startTimer(secs: number): void {
    this.timeInSecs = secs;
    this.ticker = setInterval(() => this.tick(), 1000); // Update every second
  }

  tick(): void {
    if (this.timeInSecs > 0) {
      this.timeInSecs--; // Decrease time by one second
    } else {
      clearInterval(this.ticker); // Stop timer when time reaches 0
      this.onSubmit(); // Automatically submit the quiz when time runs out
    }
    this.countdownDisplay = this.formatTime(this.timeInSecs); // Update the time display
  }

  // Format the time to MM:SS format
  formatTime(secs: number): string {
    const mins = Math.floor(secs / 60);
    secs %= 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Fetch questions from the service
  fetchQuestions(): void {
    this.questionService.getQuestions().subscribe(
      (data) => {
        this.questions = data;
        this.loading = false;

        // Initialize answers for each question
        this.questions.forEach((question) => {
          this.userAnswers[question.id] = null;
        });
      },
      (error) => {
        console.error('Error fetching questions:', error);
        this.loading = false;
      }
    );
  }

  // Handle option selection (deselect if same option clicked)
  onOptionClick(questionId: number, selectedOption: string): void {
    if (this.userAnswers[questionId] === selectedOption) {
      this.userAnswers[questionId] = null;
    } else {
      this.userAnswers[questionId] = selectedOption;
    }
  }

  // Submit the quiz
  onSubmit(): void {
    this.score = 0; // Reset score
    this.attemptedQuestions = 0; // Reset attempted questions count

    // Evaluate answers
    this.questions.forEach((question) => {
      const selectedAnswer = this.userAnswers[question.id];
      if (selectedAnswer) {
        this.attemptedQuestions++;
        if (selectedAnswer === question.correctAnswer) {
          this.score++;
        }
      }
    });

    const userData = JSON.parse(localStorage.getItem('studentData') || '{}');
    const quizResult: any = {
      name: userData.name?.trim(),
      email: userData.emailId,
      contactNo: userData.mono?.trim(),
      correctAnswers: this.score,
      attemptQuestions: this.attemptedQuestions,
      domain: userData.interestDomain,
      totalQuestions: this.questions.length,
    };

    // Submit result to the UserScoreService
    this.UserScoreService.createUserScore(quizResult).subscribe(
      () => {
        this.showResult = true;
        this.router.navigate(['/successpage']); // Navigate to success page
      },
      (error) => {
        console.error('Error submitting quiz result:', error);
        alert('Something went wrong while submitting the quiz.');
      }
    );
  }
}

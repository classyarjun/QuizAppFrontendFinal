import { Component, OnInit, OnDestroy,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from './../../service/question.service';
import { UserScoreService } from './../../service/user-score.service';


@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.css'],
})
export class QuizTestComponent implements OnInit, OnDestroy {
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
    this.timeInSecs = 55 * 60; // 55 minutes in seconds
    this.countdownDisplay = this.formatTime(this.timeInSecs);
  }

  ngOnInit(): void {
    this.startTimer(this.timeInSecs);
    this.fetchQuestions();

    // Listen to visibilitychange event to detect tab switching or minimization
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // Prevent page refresh or closing
    // window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  ngOnDestroy(): void {
    clearInterval(this.ticker); // Clear interval when component is destroyed
    document.removeEventListener('visibilitychange', this.handleVisibilityChange); // Clean up visibilitychange event listener
    window.removeEventListener('beforeunload', this.handleBeforeUnload); // Clean up beforeunload event listener
  }

  // This function handles tab switch or minimizing
  handleVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      alert('Warning: Do not switch tabs during the quiz. Please stay on the quiz page!');
    }
  };

  // Handle page refresh or closing
  handleBeforeUnload = (event: BeforeUnloadEvent): void => {
    event.preventDefault();
    event.returnValue = 'Are you sure you want to leave the quiz? Your progress may be lost.';
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













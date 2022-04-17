import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Author } from 'src/app/interfaces/Author';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input() show: boolean = false;

  bookForm!: FormGroup;
  loading: boolean = false;
  authors: Author[] = [];

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit() {
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      publisher: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      extension: new FormControl(''),
      publishedYear: new FormControl('', [Validators.required]),
      summary: new FormControl('', [Validators.required]),
    });

    this.loading = true;

    const res = await this.dashboardService.getAuthors();
    if (res) {
      setTimeout(() => {
        this.loading = false;
        this.authors = res.data;
      }, 500);
    } else {
      this.loading = false;
    }
  }

  get title() {
    return this.bookForm.get('title')!;
  }
  get publisher() {
    return this.bookForm.get('publisher')!;
  }
  get author() {
    return this.bookForm.get('author')!;
  }
  get type() {
    return this.bookForm.get('type')!;
  }
  get publishedYear() {
    return this.bookForm.get('publishedYear')!;
  }
  get summary() {
    return this.bookForm.get('summary')!;
  }

  async submit() {
    if (this.bookForm.invalid) return;
    this.loading = true;
    const res = await this.dashboardService.createBook(this.bookForm.value);

    //fake loading hehe
    setTimeout(() => {
      this.loading = false;
      this.handleClose();
      this.bookForm.reset();
    }, 500);
  }

  handleClose() {
    this.close.emit();
  }
}

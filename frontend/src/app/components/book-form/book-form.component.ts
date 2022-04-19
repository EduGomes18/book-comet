import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DashboardService } from "src/app/services/dashboard.service";
import { Author } from "src/app/interfaces/Author";
import { Books } from "src/app/interfaces/Books";
@Component({
  selector: "app-book-form",
  templateUrl: "./book-form.component.html",
  styleUrls: ["./book-form.component.css"],
})
export class BookFormComponent implements OnInit, OnChanges {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input() show: boolean = false;
  @Input() selectedBook = {} as Books;

  bookForm!: FormGroup;
  loading: boolean = false;
  showDelete: boolean = false;
  authors: Author[] = [];
  firstQuantity = 0;

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit() {
    this.bookForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      publisher: new FormControl("", [Validators.required]),
      author: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      extension: new FormControl(""),
      publishedYear: new FormControl("", [Validators.required]),
      summary: new FormControl("", [Validators.required]),
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

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["show"] &&
      changes["show"]?.previousValue != changes["show"]?.currentValue
    ) {
      // Do Something triggered by the parent button.
      this.getAuthors();
    }
  }

  async getAuthors() {
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
    return this.bookForm.get("title")!;
  }
  get publisher() {
    return this.bookForm.get("publisher")!;
  }
  get author() {
    return this.bookForm.get("author")!;
  }
  get type() {
    return this.bookForm.get("type")!;
  }
  get publishedYear() {
    return this.bookForm.get("publishedYear")!;
  }
  get summary() {
    return this.bookForm.get("summary")!;
  }

  async submit() {
    if (this.bookForm.invalid) return;
    this.loading = true;

    if (this.selectedBook && this.selectedBook.id) {
      await this.dashboardService.updateBook(
        this.selectedBook.id,
        this.bookForm.value,
        this.selectedBook.inventory
          ? this.selectedBook.inventory
          : this.firstQuantity
      );
    } else {
      await this.dashboardService.createBook(
        this.bookForm.value,
        this.firstQuantity
      );
    }

    //fake loading hehe
    setTimeout(() => {
      this.loading = false;
      this.handleClose();
    }, 500);
  }

  increment() {
    if (this.selectedBook && this.selectedBook.inventory) {
      const quantity = this.selectedBook.inventory.quantity;

      this.selectedBook = {
        ...this.selectedBook,
        inventory: {
          ...this.selectedBook.inventory,
          quantity: quantity + 1,
        },
      };
    } else {
      this.firstQuantity = this.firstQuantity + 1;
    }
  }

  decrement() {
    if (this.selectedBook?.id && this.selectedBook.inventory) {
      const quantity = this.selectedBook.inventory.quantity;

      this.selectedBook = {
        ...this.selectedBook,
        inventory: {
          ...this.selectedBook.inventory,
          quantity: quantity - 1 <= 0 ? 0 : quantity - 1,
        },
      };
    } else {
      console.log(this.firstQuantity);
      this.firstQuantity =
        this.firstQuantity - 1 <= 0 ? 0 : this.firstQuantity - 1;
    }
  }

  handleClose() {
    this.bookForm.reset();
    this.firstQuantity = 0;
    this.selectedBook = {} as Books;
    this.showDelete = false;
    this.close.emit();
  }

  confirmDelete() {
    this.showDelete = !this.showDelete;
  }

  async handleDelete() {
    this.loading = true;
    await this.dashboardService.deleteBook(this.selectedBook.id);
    this.loading = false;
    this.handleClose();
  }
}

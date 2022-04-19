import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DashboardService } from "src/app/services/dashboard.service";
import { Author } from "src/app/interfaces/Author";
@Component({
  selector: "app-author-form",
  templateUrl: "./author-form.component.html",
  styleUrls: ["./author-form.component.css"],
})
export class AuthorFormComponent implements OnInit {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input() show: boolean = false;

  authorForm!: FormGroup;
  loading: boolean = false;

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit() {
    this.authorForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      surname: new FormControl("", [Validators.required]),
    });
    console.log(this.loading);
  }

  get name() {
    return this.authorForm.get("name")!;
  }
  get surname() {
    return this.authorForm.get("surname")!;
  }

  async submit() {
    if (this.authorForm.invalid) return;
    this.loading = true;

    await this.dashboardService.createAuthor(this.authorForm.value);

    //fake loading hehe
    setTimeout(() => {
      this.loading = false;
      this.handleClose();
    }, 500);
  }

  handleClose() {
    this.authorForm.reset();
    this.close.emit();
  }
}

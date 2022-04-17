import { Component, OnInit } from '@angular/core';
import { Books } from '../../../interfaces/Books';
import { User } from '../../../interfaces/User';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  show: boolean = false;
  books: Books[] = [];
  searchInput = '';
  loading: boolean = false;
  pages = 1;
  total = 0;
  type = '';
  user = {} as User;

  pagination = {
    limit: 10,
    page: 1,
  };

  constructor(
    private dashboardService: DashboardService,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    if (this.loginService.userInfo()) {
      console.log(this.loginService.userInfo());
      this.user = this.loginService.userInfo();
    }
    this.loading = true;
    const res = await this.dashboardService.getBooks(
      this.pagination,
      this.searchInput
    );
    if (res) {
      setTimeout(() => {
        this.loading = false;
        this.books = res.data;
      }, 500);
      this.pages = Math.ceil(res.total / this.pagination.limit);
      this.total = res.total;
      this.pagination = {
        ...this.pagination,
      };
    } else {
      this.loading = false;
    }
  }

  setType(type: string) {
    this.type = type;
    this.handleData();
  }

  async handleData() {
    this.loading = true;

    const page = {
      ...this.pagination,
      page:
        this.type === 'next'
          ? this.pagination.page + 1
          : this.type === 'prev'
          ? this.pagination.page - 1
          : 1,
    };

    const res = await this.dashboardService.getBooks(page, this.searchInput);

    if (res) {
      setTimeout(() => {
        this.loading = false;
        this.books = res.data;
      }, 500);
      this.pages = Math.ceil(res.total / this.pagination.limit);
      this.total = res.total;
      this.pagination = {
        ...page,
      };
    } else {
      this.loading = false;
    }
  }

  handleShow() {
    this.show = true;
  }

  onClose() {
    this.show = false;
    this.handleData();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { Books } from '../interfaces/Books';
import { Author } from '../interfaces/Author';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseApiUrl = environment.baseUrl;
  private apiUrl = `${this.baseApiUrl}`;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  async getBooks(pagination: { limit: number; page: number }, search: string) {
    const response = await this.http
      .get<Response<Books[]>>(
        `${this.apiUrl}book?${
          search?.length > 0 ? `search=${search}&` : ''
        }page=${pagination.page}&limit=${pagination.limit}`
      )
      .toPromise()
      .catch((err) => {
        console.log(err);
        if (err?.error?.message) this.toastr.error(err.error.message);
        else this.toastr.error('Error conecting with server, try again later.');
      });
    return response;
  }

  async getAuthors() {
    console.log('Opa');
    const response = await this.http
      .get<Response<Author[]>>(`${this.apiUrl}author?page=1&limit=100`)
      .toPromise()
      .catch((err) => {
        console.log(err);
        if (err?.error?.message) this.toastr.error(err.error.message);
        else this.toastr.error('Error conecting with server, try again later.');
      });

    console.log(response);
    return response;
  }

  async createBook(book: Books) {
    const response = await this.http
      .post<Response<Books>>(`${this.apiUrl}book`, book)
      .toPromise()
      .catch((err) => {
        console.log(err);
        if (err?.error?.message) this.toastr.error(err.error.message);
        if (err?.error?.error) this.toastr.error(err.error.error);
        else this.toastr.error('Error conecting with server, try again later.');
      });

    return response;
  }
}

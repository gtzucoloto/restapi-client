import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = 'http://localhost:8080/api/products'
  formData: Product = new Product();
  list: Product[];

  getAll() {
    this.http.get(this.baseUrl)
      .toPromise()
      .then(resp => this.list = resp as Product[]);
  }

  post() {
    return this.http.post(this.baseUrl, this.formData);
  }

  put() {
    return this.http.put(`${this.baseUrl}/${this.formData.id}`, this.formData);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

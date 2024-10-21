import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class ProductApi {
  http = inject(HttpClient);
  private baseUrl = 'https://wizard-world-api.herokuapp.com/';
  path = {
    getAll: `${this.baseUrl}`,
    getById: `${this.baseUrl}`,
  };


  get(request: any){
    return this.http.get(this.path.getById);
  }

  getAll() {
    return this.http.get(this.path.getAll)
  }
}

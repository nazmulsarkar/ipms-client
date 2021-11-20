import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel, UserSignup } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { AuthModel } from '../models/auth.model';

const API_AUTH_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthModel>(`${API_AUTH_URL}/login`, {
      email,
      password,
    });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserSignup): Observable<UserModel> {
    return this.http.post<UserModel>(`${API_AUTH_URL}/signup`, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_AUTH_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${API_AUTH_URL}/me`, {
      headers: httpHeaders,
    });
  }
}

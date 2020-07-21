import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curtain } from '../_models/curtain';

@Injectable({
  providedIn: 'root'
})
export class CurtainService {

  baseUrl = environment.apiUrl + 'curtains';

constructor(private http: HttpClient) { }

   GetCurtains(): Observable<Curtain[]>{
     return this.http.get<Curtain[]>(this.baseUrl);
   }

   GetCurtain(id: number): Observable<Curtain> {
     return this.http.get<Curtain>(this.baseUrl + '/' + id);
   }

   CreateCurtain(curtain: Curtain) {
     return this.http.post(this.baseUrl, curtain);
   }

   UpdateCurtain(id: number, curtain: Curtain) {
     return this.http.put(this.baseUrl + '/' + id, curtain);
   }

   DeleteCurtain(id: number) {
     return this.http.delete(this.baseUrl + '/' + id);
   }

}

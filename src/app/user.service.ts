import { HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  results=[];
  isAdmin:boolean=false;
  constructor(private http: HttpClient) {
  }

     getSpace(oneUrl): Observable<any> {
     
    return this.http
      .get<any>(oneUrl);
  }





}

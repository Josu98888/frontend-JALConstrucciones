import { Injectable } from "@angular/core";                                                          //para definir servicios que pueden ser inyectados en otros componentes o servicios.         
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";                   //para las solicitudes Http
import { catchError, Observable, throwError } from "rxjs";                                           //para las respuestas de las solicitudes
import { environment } from "../../environments/environment.development";                            //la url del backend
  
@Injectable({
    providedIn: 'root'                                                                               // ✅ Esto hace que Angular lo pueda inyectar sin providers extras
  })
export class UserService {
    public identity:any;                                                                             // para guardar la identidad del usuario
    public url:string;                                                                               // para guardar la url del backend
    public token:any;                                                                                // para guardar el token del usuario

    constructor(
        private _http:HttpClient
    ) {
        this.url = environment.url;
    }

    login(user: any, getToken: any = null): Observable<any> { 
        if (getToken != null) { 
            user.getToken = 'true';                                                            // Si se solicita getToken, se agrega la propiedad al usuario
        }
        let json = JSON.stringify(user);                                                       // convierto en string JSON el objeto user
        let params = 'json=' + json;                                                           // formateo el JSON para enviarlo como parámetro en la petición
        
        let headers = new HttpHeaders().set(                                                   // creo los headers de la petición
            'Content-type',
            'application/x-www-form-urlencoded'                                                // tipo de contenido que espera el backend
        );
    
        return this._http.post(this.url + 'login', params, { headers: headers }).pipe(         // realizo la petición POST al endpoint /login
            catchError((error: HttpErrorResponse) => {                                         // manejo de errores con catchError
                return throwError(() => error);                                                // reenvío el error para manejarlo en el componente
            })
        );
    }

    saveSession(identity: any, token: any): void {
        this.identity = identity;
        this.token = token;
        localStorage.setItem('identity', JSON.stringify(identity));
        localStorage.setItem('token', token);
    }

    getIdentity(): Observable<any> {
        let identity = JSON.parse(localStorage.getItem('identity') || '{}');
        if (identity && identity != 'undefined') {
          this.identity = identity;
        } else {
          this.identity = null;
        }
        return this.identity;
      }
    
}
import { Injectable } from "@angular/core";                                                   //para definir servicios que pueden ser inyectados en otros componentes o servicios.
import { HttpClient, HttpHeaders } from "@angular/common/http";                               //para hacer peticiones HTTP
import { Observable } from "rxjs";                                                            // Para recibir el Observable cuando se hace una petición HTTP  con HttpClient
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root',
})                                                                                 //decorador pára no instaciar la clase donde se la cree
export class CategoryService {
    public url:string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = environment.url;
    }

    getCategories(): Observable<any> {
        let headers = new HttpHeaders();

        return this._http.get(this.url + 'category', {headers: headers});
    }

    create(token:any, data:any):Observable<any> {
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.post(this.url + 'category', data, {headers:headers});
    }

    delete(token:any, id:any):Observable<any> {
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.delete(this.url + 'category/' + id, {headers: headers});
    }
}


import { Injectable } from "@angular/core";                                   //para definir servicios que pueden ser inyectados en otros componentes o servicios.         
import { HttpClient, HttpHeaders } from "@angular/common/http";               //para las solicitudes Http
import { Observable } from "rxjs";                                            //para las respuestas de las solicitudes
import { environment } from "../../environments/environment.development";     //la url del backend

@Injectable({
    providedIn: 'root',
})
export class Service {
    public url:string;

    constructor(
        private _http:HttpClient
    ) {
        this.url = environment.url;
    }

    getOutstanding(): Observable<any> {
        let headers = new HttpHeaders();

        return this._http.get(this.url + 'services/outstanding', {headers: headers});
    }

    getServicesByCategory(id:any):Observable<any> {
        let headers = new HttpHeaders();

        return this._http.get(this.url + 'services/getServicesByCategory/' + id, {headers: headers});
    }

    getService(id:any):Observable <any> {
        let headers = new HttpHeaders();

        return this._http.get(this.url + 'service/' + id, {headers: headers});
    }
}

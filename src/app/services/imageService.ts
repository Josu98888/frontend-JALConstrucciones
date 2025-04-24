import { Injectable } from "@angular/core";                                   //para definir servicios que pueden ser inyectados en otros componentes o servicios.         
import { HttpClient, HttpHeaders } from "@angular/common/http";               //para las solicitudes Http
import { Observable } from "rxjs";                                            //para las respuestas de las solicitudes
import { environment } from "../../environments/environment.development";     //la url del backend

@Injectable({
    providedIn: 'root',
})
export class Image {
    public url:string;

    constructor(
        private _hhtp: HttpClient
    ) {
        this.url = environment.url;
    }

    createImage(token:any, data:any):Observable<any> {
        let headers = new HttpHeaders().set('Authorization', token);

        return this._hhtp.post(this.url + 'image/store', data, {headers: headers});
    }
}
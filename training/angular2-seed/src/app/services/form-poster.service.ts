import { Injectable } from '@angular/core';
import  { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class FormPoster {

    constructor(private http: Http) {
    }

    private extractData(res: Response) {
        //console.log('typeof res',typeof res);
        //console.log('res',res);
        // return le body comme un oject josn
        let body = res.json();
        //console.log('typeof body',typeof body);
        //console.log('body',body);
        return body.fields || { };
    }

    private handleError(error: any) {
        console.error('post error: ', error); 
        return Observable.throw(error.statusText);
    }

    getLanguages() : Observable<any> {
        return this.http.get('http://localhost:3100/getlanguages')
                        //delay(5000)
                        .map(this.extractLanguages)
                        .catch(this.handleError);
    }


    private extractLanguages(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    postEmployeeForm(employee: Employee):Observable<any> {
        let body = JSON.stringify(employee);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:3100/postemployee', body, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
}
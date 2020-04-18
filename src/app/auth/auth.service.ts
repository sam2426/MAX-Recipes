import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { environment } from '../../environments/environment';

export interface AuthResponseDataFormat{
    idToken	: string,
    email : string,
    refreshToken : string,
    expiresIn : string,
    localId : string,
    registered?:boolean
}

@Injectable({providedIn:'root'})

export class AuthService{

    user=new BehaviorSubject<User>(null);
    tokenExpirationTimer:any=null;

    constructor(private http:HttpClient, private router:Router){}

    signup(userId:string, userPassword:string){
        return this.http.post<AuthResponseDataFormat>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseAPIKey,
            {
                email:userId,
                password:userPassword,
                returnSecureToken:true
            }
        ).pipe(
            catchError(this.errorRepo),
            tap(resData=>{
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn)
            })
        )
    }

    signin(userId:string, userPassword:string){
        return this.http.post<AuthResponseDataFormat>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseAPIKey,
            {
                email:userId,
                password:userPassword,
                returnSecureToken:true
            }
        ).pipe(
            catchError(this.errorRepo),
            tap(resData=>{
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn)
            })
        )
    }

    private handleAuthentication(email:string, id:string, token:string, expiry:string){
        const tokenExpiry=new Date(new Date().getTime()+ +expiry * 1000)
        const user = new User(email,id,token,tokenExpiry)
        this.user.next(user);
        this.autoLogout((+expiry)*1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }

    private errorRepo(errRes:HttpErrorResponse){
        let errMsg="An unknown error occured!!"

        if(!errRes.error || !errRes.error.error){
            return throwError(errMsg);
        }

        switch(errRes.error.error.message){
            case 'EMAIL_EXISTS':
                errMsg="The given E-mail already exists!!";
                break;
            case 'INVALID_PASSWORD':
                errMsg="Password Mismatch!!";
                break;
            case 'EMAIL_NOT_FOUND':
                errMsg="Email not found!!"
        }

        return throwError(errMsg);
    }

    autoLogin(){
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        }=JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }

        const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    public logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }

    autoLogout(expirationDuration:number){
        this.tokenExpirationTimer=setTimeout(()=>{
            this.logout();
        },expirationDuration);
    }
}

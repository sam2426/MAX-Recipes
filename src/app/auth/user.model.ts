export class User{

    constructor(
        public email:string,
        public id:string,
        public _token :string,
        public _tokenExpirationDate:Date
    ){}

    get token(){
        if(!this._tokenExpirationDate||this._tokenExpirationDate<new Date()){
            return null;
        }
        return this._token;
    }

    /**
     * here token is given to the calling function only if the expiration date is available or before the expiry time set manually.
     * here the time was set in authService.handleAuthentication() as (current time + _tokenExpirationDate) i.e 1 hour
     * from the time of login.
     */

}
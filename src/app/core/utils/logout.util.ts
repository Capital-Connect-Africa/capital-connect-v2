import { inject, Injectable } from "@angular/core";
import { AuthStore } from "../../features/auth/store/auth.store";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class LogoutUtil{

    private _router =inject(Router);
    private _store =inject(AuthStore);

    logOut(){
        this._store.clear();
        this._router.navigateByUrl('/auth')
    }
    
}

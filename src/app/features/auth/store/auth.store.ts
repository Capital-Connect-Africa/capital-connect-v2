import { inject } from "@angular/core";
import { AuthState } from "../interfaces/auth.state.interface";
import { patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import { AuthService } from "../services/auth.service";
import { SignInDto } from "../interfaces/signin.dto.interface";
import { ToastService } from "../../../core/services/toast.service";
import { jwtDecode } from "jwt-decode";
import { AccessTokenPayload } from "../interfaces/access.token.payload.interface";

const initialState:AuthState ={
    isLoggedIn: false,
    user: null,
    accessToken: null,
    isLoading: false,
}

export const AuthStore =signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store, authservice =inject(AuthService), toast =inject(ToastService)) =>({

        async signIn(credentials: SignInDto){
            patchState(store, { isLoading: true })
            try {
                const { access_token } =await authservice.signIn(credentials);
                const { firstName } =this.decodeAccessToken(access_token);

                toast.show({
                    summary: 'Signin Success',
                    details: `Login successful. Welcome back ${firstName}`,
                    severity: 'success',
                    position: 'bottom-right'
                })

            } catch (error:any) {
                toast.show({
                    summary: 'Signin Error',
                    details: error.message,
                    severity: 'error',
                    position: 'bottom-right'
                })
            }finally{
                patchState(store, {
                    isLoading: false
                })
            }
        },

        decodeAccessToken(accessToken:string){
            return jwtDecode(accessToken) as AccessTokenPayload;
        },
    }))
)
import { inject } from "@angular/core";
import { AuthState } from "../interfaces/auth.state.interface";
import { patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import { AuthService } from "../services/auth.service";
import { SignInDto } from "../interfaces/signin.dto.interface";
import { ToastService } from "../../../core/services/toast.service";
import { jwtDecode } from "jwt-decode";
import { AccessTokenPayload } from "../interfaces/access.token.payload.interface";
import { SignUpDto } from "../interfaces/signup.dto.interface";
import { User } from "../../users/interfaces/user.interface";
import { UsersStore } from "../../users/store/users.store";
import { ResendEmailVerificationDto } from "../interfaces/resend.verification.email.dto.interface";

const initialState:AuthState ={
    isLoggedIn: false,
    user: null,
    accessToken: null,
    isLoading: false,
}

export const AuthStore =signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store, authservice =inject(AuthService), toast =inject(ToastService), userStore =inject(UsersStore)) =>({

        async signIn(credentials: SignInDto){
            patchState(store, { isLoading: true })
            try {
                const { access_token } =await authservice.signIn(credentials);
                const { firstName } =this.decodeAccessToken(access_token);
                patchState(store, { isLoading: false  });
                toast.show({
                    summary: 'Login',
                    details: `Login successful. Welcome back ${firstName}`,
                    severity: 'success',
                    position: 'bottom-right'
                })
            } catch (error:any) {
                patchState(store, {  isLoading: false  })
            }
        },

        decodeAccessToken(accessToken:string){
            return jwtDecode(accessToken) as AccessTokenPayload;
        },

        getAccessToken(){
            return (store.accessToken() ?? localStorage.getItem('accessToken')) ?? ''
        },

        async signUp(payload: SignUpDto){
            patchState(store, { isLoading: true })
            try {
                const user:User =await authservice.signUp(payload);
                patchState(store, { isLoading: false })
                userStore.setCurrentUser(user);
                userStore.setVerificationEmail(user.username);
                toast.show({
                    summary: 'Register',
                    details: `Signup successful. Thank you for choosing Capital Connect Africa.`,
                    severity: 'success',
                    position: 'bottom-right'
                })

            } catch (error:any) {
                patchState(store, {
                    isLoading: false
                })
            }
        },

        async resendEmailVerificationToken(payload: ResendEmailVerificationDto){
            patchState(store, { isLoading: true });
            try {
                const { message } =await authservice.resendEmailVerificationToken(payload);
                patchState(store, { isLoading: false })
                toast.show({
                    summary: 'Delivery Report',
                    details: message,
                    severity: 'success',
                    position: 'bottom-right'
                })

            } catch (error) {
                patchState(store, { isLoading: false })
            }
        }
    }))
)
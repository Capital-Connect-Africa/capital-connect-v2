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
import { Session } from "../interfaces/session.interface";
import { ErrorStore } from "../../../core/store/http.errors.store";
import { objTostr } from "../../../core/utils/object.to.string.util";
import { USER_ROLES } from "../../users/enums/user.roles.enum";
import { Router } from "@angular/router";

const initialState:AuthState ={
    session: null,
    isLoading: false,
}

export const AuthStore =signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store,
        _router = inject(Router),
         authservice =inject(AuthService), errorStore =inject(ErrorStore), toast =inject(ToastService), userStore =inject(UsersStore)) =>{
        return {
            async signIn(credentials: SignInDto){
                try {
                    patchState(store, { isLoading: true });
                    const { access_token } =await authservice.signIn(credentials);
                    const accessTokenPayload =this.decodeAccessToken(access_token);
                    this.setSession({accessTokenPayload, accessToken: access_token});
                    toast.show({
                        summary: 'Login',
                        details: `Login successful. Welcome back ${accessTokenPayload.firstName}`,
                        severity: 'success',
                        position: 'bottom-right'
                    })
                    const profile = await authservice.getUserProfile()

                    switch (profile.roles as USER_ROLES) {
                        case USER_ROLES.USER:
                            _router.navigateByUrl('/onboarding/business/organization-setup');                            
                            break
                        case USER_ROLES.INVESTOR:
                            _router.navigateByUrl('/investor-onboarding');                            
                            break                          
                        case USER_ROLES.CONTACT_PERSON:
                            _router.navigateByUrl('/advisor/profile');
                            break
                        case USER_ROLES.ADVISOR:
                            _router.navigateByUrl('/advisor/profile');
                            break
                        case USER_ROLES.PARTNER:
                            _router.navigateByUrl('/partner');
                            break
                        case USER_ROLES.STAFF:
                            _router.navigateByUrl('/staff');
                            break
                        case USER_ROLES.ADMIN:
                            _router.navigateByUrl('/dashboard');
                            break
                      }










                } catch (e:any) {
                    const err =errorStore.error();
                    toast.show({
                        summary: `${err? 'Login': ''}`,
                        details: objTostr(err?.message ?? e.message),
                        severity: 'error',
                        position: 'bottom-right'
                    })
                }finally{
                    patchState(store, {  isLoading: false  })
                }
            },

            decodeAccessToken(accessToken:string){
                return jwtDecode(accessToken) as AccessTokenPayload;
            },

            getSession():Session | null{
                const session =store.session() ?? JSON.parse(sessionStorage.getItem('session') || '{}') as Session;
                userStore.setCurrentUser(session.user as User)
                userStore.setVerificationEmail(session.user?.username?? '');
                return session;
            },

            setSession(session: Session){
                patchState(store, state =>({ session: {  ...state.session, ...session }}))
                sessionStorage.setItem('session', JSON.stringify(store.session()));
            },

            getAccessToken(){
                return this.getSession()?.accessToken
            },

            clear(){
                userStore.clear()
                patchState(store, {session: null});
                sessionStorage.removeItem('session');
            },

            async signUp(payload: SignUpDto){
                patchState(store, { isLoading: true })
                try {
                    const user:User =await authservice.signUp(payload);
                    userStore.setCurrentUser(user);
                    userStore.setVerificationEmail(user.username);
                    toast.show({
                        summary: 'Register',
                        details: `Signup successful. Thank you for choosing Capital Connect Africa.`,
                        severity: 'success',
                        position: 'bottom-right'
                    })

                } catch (e:any) {
                    const err =errorStore.error()
                    toast.show({
                        summary: `${err? 'Login': ''}`,
                        details: objTostr(err?.message ?? e.message),
                        severity: 'error',
                        position: 'bottom-right'
                    })
                    
                }finally{
                    patchState(store, { isLoading: false  })
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
            },
            signOut(){
                this.clear()
                userStore.clear()
            }
        }


    })
)
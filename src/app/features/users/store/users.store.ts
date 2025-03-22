import { inject } from "@angular/core";
import { UserState } from "../interfaces/users.state";
import { UserService } from "../services/users.service";
import { ToastService } from "../../../core/services/toast.service";
import { patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import { User } from "../interfaces/user.interface";

const initialState:UserState ={
    isLoading: false,
    verificationEmail: undefined,
    currentUser: undefined,
}

export const UsersStore =signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store, userService =inject(UserService), toast =inject(ToastService)) =>({

        setCurrentUser(user: User){
            patchState(store, {currentUser: user})
        },

        setVerificationEmail(email: string){
            patchState(store, {verificationEmail: email})
        },

        async verifyUserEmailToken(token:string){
            patchState(store, { isLoading: true })
            try {
                await userService.verifyEmailToken(token);
                toast.show({
                    summary: 'Email Verification',
                    details: `Thank you for verifying your email. Proceed to Login`,
                    severity: 'success',
                    position: 'bottom-right'
                })
                patchState(store, { isLoading: false })

            } catch (error:any) {
                patchState(store, { isLoading: false })
            }
        },

        
    }))

)
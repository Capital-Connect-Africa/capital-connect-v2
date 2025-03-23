import { inject } from "@angular/core";
import { UserState } from "../interfaces/users.state";
import { UserService } from "../services/users.service";
import { ToastService } from "../../../core/services/toast.service";
import { patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import { User } from "../interfaces/user.interface";
import { ErrorStore } from "../../../core/store/http.errors.store";
import { objTostr } from "../../../core/utils/object.to.string.util";

const initialState:UserState ={
    isLoading: false,
    verificationEmail: undefined,
    currentUser: undefined,
}

export const UsersStore =signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store, userService =inject(UserService), errorStore =inject(ErrorStore), toast =inject(ToastService)) =>({

        setCurrentUser(user: User | undefined){
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

            } catch (e:any) {
                const err =errorStore.error()
                toast.show({
                    summary: `${err? 'Verification': ''}`,
                    details: objTostr(err?.message ?? e.message),
                    severity: 'error',
                    position: 'bottom-right'
                })
            }finally{
                patchState(store, { isLoading: false })
            }
        },

        clear(){
            patchState(store, {
                currentUser: undefined,
                verificationEmail: undefined,
            })
        }
    }))

)
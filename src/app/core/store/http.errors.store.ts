import { inject } from "@angular/core";
import { CustomHttpResponseError, ErrorState } from "../interfaces/http.error.interface";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { ToastService } from "../services/toast.service";
import { objTostr } from "../utils/object.to.string.util";



const initialState:ErrorState ={
    error: undefined,
    showToast: false
}

export const ErrorStore =signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store, toast =inject(ToastService)) =>({
        setShowToast(showToast: boolean){
            patchState(store, {showToast})
        },

       setError(error:CustomHttpResponseError | undefined){
            patchState(store, {error});
            if(store.showToast() && error) {
                toast.show({
                    summary: error?.statusText,
                    details: objTostr(error.message),
                    severity: 'error',
                    position: 'bottom-right'
                })
            }
       }
       
    }))
)
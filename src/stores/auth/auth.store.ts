import { StateCreator } from "zustand";
import type { AuthStatus, User } from "../../interfaces";


export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User
}


const storeApi: StateCreator<AuthState> = (set) => ({
    status: 'unauthorized',

    token: undefined,
    user: undefined,
})
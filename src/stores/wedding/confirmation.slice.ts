import { StateCreator } from "zustand";

export interface ConfirmationSlice {
	isConfirmed: boolean;

	setIsConfirmed: (value: boolean) => void;
}


export const createIsConfirmedSlice: StateCreator<ConfirmationSlice> = (set, get) => ({

    isConfirmed: false,

    setIsConfirmed: (value: boolean) => set({isConfirmed: value})

}); 
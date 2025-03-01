import { StateCreator } from "zustand";


// This is our interface of our slice 
export interface GuestSlice {
	guestsCount: number;
    setGuestCount: (guestsCount: number) => void;

}

// This is how you create a slice
export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
    // Here I'm declaring the initial value of this slice
    guestsCount: 0,

    setGuestCount: (guestsCount: number) => set({ guestsCount: guestsCount > 0 ? guestsCount : 0})
})

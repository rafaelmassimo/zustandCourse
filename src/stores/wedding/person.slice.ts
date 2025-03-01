import { StateCreator } from "zustand";

// This is our interface of our slice 
export interface PersonSlice {
    firstName: string;
    lastName: string;

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
}

// This is how you create a slice
export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
    firstName: '',
    lastName: '',

    setFirstName: (firstName: string) => set({firstName}),
    setLastName: (lastName: string) => set({lastName}),

})
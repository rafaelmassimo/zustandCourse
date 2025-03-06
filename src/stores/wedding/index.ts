import { create } from 'zustand';
import { createPersonSlice, PersonSlice } from './person.slice';
import { devtools } from 'zustand/middleware';
import { createGuestSlice, GuestSlice } from './guests.slice';
import { createDateSlice, DateSlice } from './date.slice';

// Create the STORE
// Every time I'm adding a new Slice I also need to add its properties inside the Store below
type ShareState = PersonSlice & GuestSlice & DateSlice;

export const useWeddingBoundStore = create<ShareState>()(
    // The devTools helps you to check the state changing on the chrome's component 'redux' 
    devtools(

        //This (...a) is the operator rest which has (set, get, storeAPI) all together 
        (...a) => ({
            ...createPersonSlice(...a), 
            ...createGuestSlice(...a),
            ...createDateSlice(...a)
        })
    )
)
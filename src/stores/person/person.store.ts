import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { firebaseStorage } from '../storages/firebase.storage';
import { useWeddingBoundStore } from '../wedding';

interface PersonState {
	firstName: string;
	lastName: string;
}

interface Actions {
	setFirstName: (value: string) => void;
	setLastName: (value: string) => void;
}

//The store contains the key inside my state object like 'first name and last name' and the methods that comes from the interface initially created
const storeAPI: StateCreator<PersonState & Actions, [['zustand/devtools', never]]> = (set) => ({
	firstName: '',
	lastName: '',

	setFirstName: (value: string) => set({ firstName: value }, false, 'setFirstName'),
	setLastName: (value: string) => set({ lastName: value }, false, 'setLastName'),
});

// In this store we are applying the middleware Persist note that we have remove the store from inside the create block and put outside to increase the readability
export const userPersonStore = create<PersonState & Actions>()(
	//*Devtools helps you to add the feature to use the devtool extension on chrome
	devtools(
		//To save the state on the local storage
		persist(storeAPI, {
			name: 'person-storage',
			// storage: firebaseStorage,
		}),
	),
);


//Here I'm changing the state inside the wedding state
userPersonStore.subscribe((nextState, previouState) => {
	const { firstName, lastName } = nextState;

	useWeddingBoundStore.getState().setFirstName(firstName);
	useWeddingBoundStore.getState().setLastName(lastName);
	useWeddingBoundStore.getState() //if I check after the . it'll show up all set state available inside this useWedding...
});

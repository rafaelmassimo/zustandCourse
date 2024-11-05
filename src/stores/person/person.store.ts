import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { customSessionStorage } from '../storages/session.storage';
import { firebaseStorage } from '../storages/firebase.storage';

interface PersonState {
	firstName: String;
	lastName: String;
}

interface Actions {
	setFirstName: (value: string) => void;
	setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState & Actions> = (set) => ({
	firstName: '',
	lastName: '',

	setFirstName: (value: string) => set((state) => ({ firstName: value })),
	setLastName: (value: string) => set((state) => ({ lastName: value })),
});

// In this store we are applying the middleware Persist note that we have remove the store from inside the create block and put outside to increase the readability
export const userPersonStore = create<PersonState & Actions>()(
	persist(storeAPI, {
		name: 'person-storage',
		storage: firebaseStorage,
	}),
);

import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

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

const sessionStorage: StateStorage = {
	getItem: function (name: string): string | null | Promise<string | null> {
		console.log('get Item', name);

		return null;
	},
	setItem: function (name: string, value: string): void | Promise<void> {
		console.log('setItem', name, value);
	},
	removeItem: function (name: string): void | Promise<void> {
		console.log('removeItem', name);
	},
};

// In this store we are applying the middleware Persist note that we have remove the store from inside the create block and put outside to increase the readability
export const userPersonStore = create<PersonState & Actions>()(
	persist(storeAPI, {
		name: 'person-storage',
		storage: createJSONStorage(() => sessionStorage),
	}),
);

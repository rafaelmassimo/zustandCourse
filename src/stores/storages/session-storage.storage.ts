import { StateStorage } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';

//This object will be called inside the create middleware block
const storageAPI: StateStorage = {
	getItem: function (name: string): string | null | Promise<string | null> {
		const data = sessionStorage.getItem(name);

		return data;
	},
	setItem: function (name: string, value: string): void | Promise<void> {
		sessionStorage.setItem(name, value);
	},
	removeItem: function (name: string): void | Promise<void> {
		console.log('removeItem', name);
	},
};

//This will be the object that it will contain the data that I can work with 
export const customSessionStorage = createJSONStorage(() => storageAPI);

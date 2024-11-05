import { StateStorage } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LoginPage } from '../../pages';

const firebaseURL = 'https://zustand-storage-b3aa3-default-rtdb.firebaseio.com/zustand';

//This object will be called inside the create middleware block
const firebaseAPI: StateStorage = {
	getItem: async function (name: string): Promise<string | null> {
		try {
			const data = await fetch(`${firebaseURL}/${name}.json`).then((res) => res.json());

			console.log(data);
			return JSON.stringify(data);
		} catch (error) {
			throw new Error(String(error));
			
		}
	},
	setItem: async function (name: string, value: string): Promise<void> {
		try {
			const data = await fetch(`${firebaseURL}/${name}.json`, {
				method: 'PUT',
				body: value
			}).then((res) => res.json());

			console.log(data);
			

			return;
		} catch (error) {
			
		}
	},
	removeItem: function (name: string): void | Promise<void> {
		console.log('removeItem', name);
	},
};

//This will be the object that it will contain the data that I can work with
export const firebaseStorage = createJSONStorage(() => firebaseAPI);

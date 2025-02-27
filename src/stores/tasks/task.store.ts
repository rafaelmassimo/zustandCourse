import { create, StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '../../interfaces';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';
import { immer } from 'zustand/middleware/immer';

interface TaskState {
	draggingTaskId?: string;
	tasks: Record<string, Task>; //{[key: string]: Task}
	getTasksByStatus: (status: TaskStatus) => Task[];
	addTask: (title: string, status: TaskStatus) => void;
	setDraggingTaskId: (taskId: string) => void;
	removeDraggingTaskId: () => void;
	changeTaskStatus: (taskId: string, status: TaskStatus) => void;
	onTaskDrop: (newStatus: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState,[["zustand/immer", never]]> = (set, get) => ({
	draggingTaskId: undefined,
	tasks: {
		//'ABC-1' is the key that is why I can access it by using: [taskId]
		'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'in-progress' },
		'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'open' },
		'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'in-progress' },
		'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
	},

	// Where I'm filtering all the tasks that has the tasks status that I'm passing on the JiraPage.tsx when I call this function
	getTasksByStatus: (status: TaskStatus) => {
		const tasks = get().tasks;
		return Object.values(tasks).filter((task) => task.status === status);
	},

	addTask: (title: string, status: TaskStatus) => {
		// Here I'm creating a new object that it will be saved taking the spot of the previous one, so updating the array of objects
		const newTask = { id: uuidv4(), title, status };

		set(state => {
			state.tasks[newTask.id] = newTask
		});


	
		//? It requited to run npm i immer to make produce work
		//Here I'm using 'produce' to add a new task, which is working fine if I test it
		// set(produce((state: TaskState) => {
		// 	state.tasks[newTask.id] = newTask;
		// })
		// );

		//? Native way to use zustand
		// set((state) => ({
		// 	tasks: {
		// 		...state.tasks,
		// 		//Here I'm adding a new object where the key is the newTask.id and the rest of the object as above
		// 		[newTask.id]: newTask,
		// 	},
		// }));
	},

	//Here I'm setting the state with the TasksID
	setDraggingTaskId: (taskId: string) => {
		set({ draggingTaskId: taskId });
	},
	//After finishing dropped the element, I need to clean the draggingTaskId, because I'll have just one for all tasks, because I can move just one/time
	removeDraggingTaskId: () => {
		set({ draggingTaskId: undefined });
	},

	changeTaskStatus: (taskId: string, status: TaskStatus) => {
		// const task = {...get().tasks[taskId]};
		//>> This creates a shallow copy of the task object. The spread operator (...) is used to copy all properties of the task object into a new object.
		// task.status = status; // Is the new status that I'm setting when I'm ending the drag


		set(state => {
			state.tasks[taskId] = {
				...state.tasks[taskId],
				status
			};
		})

		//? This is the native way to change the status with zustand
		//This set State means I can touch everything that is inside this Store, in this case all tasks,
		// set((state) => ({
		// 	tasks: {
		// 		...state.tasks,
		// 		[taskId]: task,
		// 	},
		// }));
	},

	//This method is combination between some other methods above, to simplify the code once I'll call it on JiraTasks.tsx
	onTaskDrop: (newStatus: TaskStatus) => {
		const taskId = get().draggingTaskId;
		if (!taskId) return null;

		//This is how you can call other method inside a method
		get().changeTaskStatus(taskId, newStatus);
		get().removeDraggingTaskId();
	},
});

//Here you can create the store but first is better to setup this store inside the storeApi
export const useTaskStore = create<TaskState>()(devtools(
	// The persist is going to save it inside the local storage
	persist(
		immer(storeApi), {
			name: "task-store"
		}

	)

));

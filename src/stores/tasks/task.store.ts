import { create, StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '../../interfaces';
import { devtools } from 'zustand/middleware';

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

const storeApi: StateCreator<TaskState, [['zustand/devtools', never]]> = (set, get) => ({
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
		const newTask = { id: uuidv4(), title, status };
		set((state) => ({
			tasks: {
				...state.tasks,
				//Here I'm adding a new object where the key is the newTask.id and the rest of the object as above
				[newTask.id]: newTask,
			},
		}));
	},

	//Where I'm setting the state with the TasksID
	setDraggingTaskId: (taskId: string) => {
		set({ draggingTaskId: taskId }, false, 'setDraggingId');
	},
	//After finishing dropped the element, I need to clean the draggingTaskId, because I'll have just one for all tasks, because I can move just one/time
	removeDraggingTaskId: () => {
		set({ draggingTaskId: undefined });
	},

	changeTaskStatus: (taskId: string, status: TaskStatus) => {
		const task = get().tasks[taskId];
		task.status = status; // Is the new status that I'm setting when I'm ending the drag

		//This set State means I can touch everything which is inside this Store, in this case all the tasks,
		set((state) => ({
			tasks: {
				...state.tasks,
				[taskId]: task,
			},
		}));
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
export const useTaskStore = create<TaskState>()(devtools(storeApi));

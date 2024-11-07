
import { create, StateCreator } from 'zustand';
import { Task, TaskStatus } from '../../interfaces';

interface TaskState {
	tasks: Record<string, Task>; //{[key: string]: Task}
    getTasksByStatus: (status: TaskStatus) => Task[],
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
	tasks: {
		'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'in-progress' },
		'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'open' },
		'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'in-progress' },
		'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
	},

    getTasksByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values(tasks).filter(task => task.status === status )
    }
});

//Here you can create the store but first is better to setup this store inside the storeApi
export const useTaskStore = create<TaskState>()(storeApi)
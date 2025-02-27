import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";


interface Options {
    status: TaskStatus
}

export const useTasks = ({status}: Options) => {
        //This operator makes if the isdragging has some value like ID doesnt matter it will make it true and if is null because is empty is going to be false
        const isDragging = useTaskStore((state) => !!state.draggingTaskId);
    
        const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
        const addTask = useTaskStore((state) => state.addTask);
    
        //*I do not need these const anymore because I have a simpler function to do the same thing
        // const changeTaskStatus = useTaskStore((state)=> state.changeTaskStatus)
        // const draggingTaskId = useTaskStore((state)=> state.draggingTaskId)
    
        const [onDragOver, setOnDragOver] = useState(false);
    
        const handleAddTask = async () => {
            const { isConfirmed, value } = await Swal.fire({
                title: 'New Task',
                input: 'text',
                inputLabel: 'Name of the task',
                inputPlaceholder: 'Add the name of the new Task',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to add a title';
                    } 
                },
            });
            if (!isConfirmed) return;
            addTask(value, status);
        };
    
        //>>All the actions is going to be the same underneath, where is going to change is inside the div with the onActions
    
        //Moving the mouse over the element
        const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setOnDragOver(true);
            console.log('onDragOver');
        };
        //Moving OUT the mouse over the element
        const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setOnDragOver(false);
            console.log('handleDragLeave');
        };
        //When the drop has been released
        const handleDrop = (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setOnDragOver(false);
            onTaskDrop(status); // The value contains the new status
            // changeTaskStatus(draggingTaskId!,value)
            console.log('handleDrop', status);
        };

        return {
            //Properties
            isDragging,
            onDragOver,

            //Methods
            handleAddTask,
            handleDragOver,
            handleDragLeave,
            handleDrop,
        }
}
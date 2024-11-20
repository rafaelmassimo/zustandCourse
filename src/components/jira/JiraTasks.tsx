import { DragEvent, useState } from 'react';
import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import classNames from 'classnames';
import { Task, TaskStatus } from '../../interfaces';
import SingleTask from './SingleTask';
import { useTaskStore } from '../../stores';
import Swal from 'sweetalert2';

interface Props {
	title: string;
	status: TaskStatus;
	tasks: Task[];
}

export const JiraTasks = ({ title, status, tasks }: Props) => {
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

	return (
		<div
			//*When the mouse is over the div
			onDragOver={handleDragOver}
			//*When the mouse has left the div
			onDragLeave={handleDragLeave}
			//*When the element has been dropped inside the div
			onDrop={handleDrop}
			className={classNames(
				'!text-black relative border-4 flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]',
				{
					' border-blue-500 border-dotted': isDragging,
					' border-green-500 border-dotted': isDragging && onDragOver,
				},
			)}
		>
			{/* Task Header */}
			<div className="relative flex flex-row justify-between">
				<div className="flex items-center justify-center">
					<div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
						<span className="flex justify-center items-center h-6 w-6 text-brand-500">
							<IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
						</span>
					</div>

					<h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
				</div>

				<button onClick={handleAddTask}>
					<IoAddOutline />
				</button>
			</div>

			{/* Task Items */}
			<div className="h-full w-full">
				{tasks.map((task) => (
					<SingleTask key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};

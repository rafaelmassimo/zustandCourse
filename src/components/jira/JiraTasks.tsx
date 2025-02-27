import { DragEvent, useState } from 'react';
import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import classNames from 'classnames';
import { Task, TaskStatus } from '../../interfaces';
import SingleTask from './SingleTask';
import { useTaskStore } from '../../stores';
import Swal from 'sweetalert2';
import { useTasks } from '../../hooks/useTasks';

interface Props {
	title: string;
	status: TaskStatus;
	tasks: Task[];
}

export const JiraTasks = ({ title, status, tasks }: Props) => {
	// Here I'm calling the useTasks Custom Hook that I have created just to make the code cleaner, and I can reuse the drag, handle etc logic in multiple components
	const {
		handleAddTask, 
		handleDragLeave, 
		handleDragOver,
		handleDrop,
		isDragging,
		onDragOver
	} = useTasks({status})

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

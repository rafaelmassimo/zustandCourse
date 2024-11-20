import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';
import { logger } from '../../stores/middlewares/logger.middleware';

export const JiraPage = () => {
	const tasks = useTaskStore((state) => state.tasks);
	//Where I'm checking which tasks has the status as '...' and then pass as props to the JiraTasks Component
	const openTasks = useTaskStore((state) => state.getTasksByStatus('open'));
	const inProgressTasks = useTaskStore((state) => state.getTasksByStatus('in-progress'));
	const doneTasks = useTaskStore((state) => state.getTasksByStatus('done'));



	return (
		<>
			<h1>Tareas</h1>
			<p>Manejo de estado con objectos de Zustand</p>
			<hr />

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<JiraTasks tasks={openTasks} title="Pendientes" status="open" />

				<JiraTasks tasks={inProgressTasks}  title="Avanzando" status="in-progress" />

				<JiraTasks tasks={doneTasks}  title="Terminadas" status="done" />
			</div>
		</>
	);
};

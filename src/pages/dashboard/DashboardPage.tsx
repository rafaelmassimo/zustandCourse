import {
	IoAccessibilityOutline,
	IoHeartOutline,
	IoInformationOutline,
	IoListOutline,
	IoLockClosedOutline,
	IoPawOutline,
} from 'react-icons/io5';
import { WhiteCard } from '../../components';
import { useAuthStore, useBearStore, userPersonStore, useTaskStore } from '../../stores';
import RequestInfo from '../../components/shared/request-info/RequestInfo';

export const Dashboard = () => {
	const totalBears = useBearStore((state) => state.totalBears);
	const firstName = userPersonStore((state) => state.firstName);
	const lastName = userPersonStore((state) => state.lastName);
	const tasks = useTaskStore((state) => state.tasks);

	const tasksCount = Object.keys(tasks).length;

	return (
		<>
			<h1>Dashboard</h1>
			<p>Información colectiva de varios stores de Zustand</p>
			<hr />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				<WhiteCard centered>
					<IoPawOutline size={50} className="text-indigo-600" />
					<h2>Osos</h2>
					<p>{totalBears()}</p>
				</WhiteCard>

				<WhiteCard centered>
					<IoAccessibilityOutline size={50} className="text-indigo-600" />
					<h2>{firstName}</h2>
					<p>{lastName}</p>
				</WhiteCard>

				<WhiteCard centered>
					<IoListOutline size={50} className="text-indigo-600" />
					<h2>Tasks</h2>
					<p>{tasksCount}</p>
				</WhiteCard>

				<WhiteCard centered>
					<IoHeartOutline size={50} className="text-indigo-600" />
					<h2>Boda</h2>
					<p>Información</p>
				</WhiteCard>

				<WhiteCard centered className="col-span-3">
					<IoInformationOutline size={50} className="text-indigo-600" />
					<RequestInfo />
				</WhiteCard>
			</div>
		</>
	);
};

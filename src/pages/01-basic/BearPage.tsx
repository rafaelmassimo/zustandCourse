import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';

export const BearPage = () => {
	return (
		<>
			<h1>Contador de Osos</h1>
			<p>Manejo de estado simple de Zustand</p>
			<hr />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
				<BlackBear />

				<PolarBear />

				<PandaBear />
			</div>
		</>
	);
};
export default BearPage;

const BlackBear = () => {
	const blackBear = useBearStore((state) => state.blackBears);
	const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);
	return (
		<WhiteCard centered>
			<h2>Osos Negros</h2>

			<div className="flex flex-col md:flex-row">
				<button onClick={() => increaseBlackBears(1)}> +1</button>
				<span className="text-3xl mx-2 lg:mx-10"> {blackBear} </span>
				<button onClick={() => increaseBlackBears(-1)}>-1</button>
			</div>
		</WhiteCard>
	);
};


const PolarBear = () => {
	const polarBear = useBearStore((state) => state.polarBears);
	const increasePolarBears = useBearStore((state) => state.increasePolarBears);
	return (
		<WhiteCard centered>
			<h2>Osos Negros</h2>

			<div className="flex flex-col md:flex-row">
				<button onClick={() => increasePolarBears(1)}> +1</button>
				<span className="text-3xl mx-2 lg:mx-10"> {polarBear} </span>
				<button onClick={() => increasePolarBears(-1)}>-1</button>
			</div>
		</WhiteCard>
	);
};

const PandaBear = () => {
	const pandaBear = useBearStore((state) => state.pandaBears);
	const increasePolarBears = useBearStore((state) => state.increasePandaBears);
	return (
		<WhiteCard centered>
			<h2>Osos Negros</h2>

			<div className="flex flex-col md:flex-row">
				<button onClick={() => increasePolarBears(1)}> +1</button>
				<span className="text-3xl mx-2 lg:mx-10"> {pandaBear} </span>
				<button onClick={() => increasePolarBears(-1)}>-1</button>
			</div>
		</WhiteCard>
	);
};

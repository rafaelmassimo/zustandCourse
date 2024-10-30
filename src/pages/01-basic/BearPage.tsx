import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';
import { useShallow } from 'zustand/shallow';

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

				<BearsDisplay />
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

const BearsDisplay = () => {
	//*This useShallow avoid that this state has been re-render when I click the button with doNothing
	// const bears = useBearStore(useShallow ((state) => state.bears));
	// const doNothing = useBearStore((state) => state.doNothing);
	
	const bears = useBearStore((state) => state.bears);
	const addBear = useBearStore((state) =>  state.addBear);
	const clearBear = useBearStore((state) =>  state.clearBears);



	return (
		<WhiteCard>
			{/* <button onClick={doNothing}> </button> */}

			<h1>Osos</h1>
			<button onClick={addBear}>Add Bear</button>
			<button onClick={clearBear}>Clear Bear</button>

			<pre>{JSON.stringify(bears, null, 2)}</pre>
		</WhiteCard>
	);
};

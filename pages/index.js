import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { addPlantToUserArray, fetchAllPlants } from "../api/fetchPlants";

export const GroupCategory = ({ filterCategory, setFilterCategory }) => {
	return (
		<ul className="animate-fade-in mx-6 my-4 flex flex-row justify-between border-b-2 border-b-slate-300 text-slate-400 font-bold uppercase text-xs">
			<li className="relative flex flex-col items-center justify-center">
				<input
					type="radio"
					id="wateringVolume"
					onChange={(e) => setFilterCategory(e.target.value)}
					defaultChecked
					name="hosting"
					value="wateringVolume"
					className="peer/wateringVolume checked:w-1.5 checked:h-1.5 checked:animate-fade-in checked:delay-500 bg-slate-700 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
				/>
				<label
					htmlFor="wateringVolume"
					className="peer-checked/wateringVolume:text-slate-700 flex items-center justify-between w-full px-0 pt-3 pb-2 cursor-pointer"
				>
					<div className="block">
						<div className="w-full">Water</div>
					</div>
				</label>
				{filterCategory === "wateringVolume" ? (
					<motion.div
						layoutId={"dot"}
						className="w-1.5 h-1.5 bg-slate-700 -bottom-1 absolute rounded-full"
					></motion.div>
				) : null}
			</li>
			<li className="relative flex flex-col items-center justify-center">
				<input
					type="radio"
					id="size"
					name="hosting"
					onChange={(e) => setFilterCategory(e.target.value)}
					value="size"
					className="peer/size checked:w-1.5 checked:h-1.5 checked:animate-fade-in checked:delay-500 bg-slate-700 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
				/>
				<label
					htmlFor="size"
					className="peer-checked/size:text-slate-700 flex items-center justify-between w-full px-0 pt-3 pb-2 cursor-pointer"
				>
					<div className="block">
						<div className="w-full">Size</div>
					</div>
				</label>
				{filterCategory === "size" ? (
					<motion.div
						layoutId={"dot"}
						className="w-1.5 h-1.5 bg-slate-700 -bottom-1 absolute rounded-full"
					></motion.div>
				) : null}
			</li>
			<li className="relative flex flex-col items-center justify-center">
				<input
					type="radio"
					id="difficulty"
					name="hosting"
					onChange={(e) => setFilterCategory(e.target.value)}
					value="difficulty"
					className="peer/difficulty checked:w-1.5 checked:h-1.5 checked:animate-fade-in checked:delay-500 bg-slate-700 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
				/>
				<label
					htmlFor="difficulty"
					className="peer-checked/difficulty:text-slate-700 flex items-center justify-between w-full px-0 pt-3 pb-2 cursor-pointer"
				>
					<div className="block">
						<div className="w-full">Difficulty</div>
					</div>
				</label>
				{filterCategory === "difficulty" ? (
					<motion.div
						layoutId={"dot"}
						className="w-1.5 h-1.5 bg-slate-700 -bottom-1 absolute rounded-full"
					></motion.div>
				) : null}
			</li>
			<li className="relative flex flex-col items-center justify-center">
				<input
					type="radio"
					id="light"
					name="hosting"
					onChange={(e) => setFilterCategory(e.target.value)}
					value="light"
					className="peer/light checked:w-1.5 checked:h-1.5 checked:animate-fade-in checked:delay-500 bg-slate-700 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
				/>
				<label
					htmlFor="light"
					className="peer-checked/light:text-slate-700 flex items-center justify-between w-full px-0 pt-3 pb-2 cursor-pointer"
				>
					<div className="block">
						<div className="w-full">Light</div>
					</div>
				</label>
				{filterCategory === "light" ? (
					<motion.div
						layoutId={"dot"}
						className="w-1.5 h-1.5 bg-slate-700 -bottom-1 absolute rounded-full"
					></motion.div>
				) : null}
			</li>
		</ul>
	);
};
export const SearchFilter = ({ setSearchQuery }) => {
	const onSubmit = (e) => {
		e.preventDefault();
		e.target[0].blur();
	};
	return (
		<form className="flex items-center" onSubmit={onSubmit}>
			<label htmlFor="simple-search" className="sr-only">
				Search
			</label>
			<div className="relative w-full mt-8 mx-6">
				<div className="flex absolute inset-y-0 left-4 items-center pointer-events-none">
					<svg
						aria-hidden="true"
						className="w-5 h-5 text-gray-500"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clipRule="evenodd"
						></path>
					</svg>
				</div>
				<input
					type="text"
					id="simple-search"
					className="placeholder:text-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:outline-slate-500 block w-full pl-10 p-2.5 "
					placeholder="Search"
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
		</form>
	);
};

//Clunky return!
export const Feed = ({ groupedPlants, searchQuery, filterCategory }) => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		const username = JSON.parse(localStorage.getItem("username"));
		if (username) {
			setUsername(username);
		} else {
			localStorage.setItem("username", JSON.stringify("lalatest"));
			setUsername("lalatest");
		}
	}, []);

	const fitleredPlants = {};
	for (const category in groupedPlants) {
		fitleredPlants[category];
		const fiteredCategory = groupedPlants[category].filter((item) =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		if (fiteredCategory.length > 0) {
			fitleredPlants[category] = fiteredCategory;
		}
	}
	const grouped = [];
	for (const prop in fitleredPlants) {
		grouped.push(
			<motion.header
				animate={{
					opacity: 1,
					transition: { duration: 0.75 },
				}}
				initial={{ opacity: 0 }}
				key={grouped.length + filterCategory}
				className="flex flex-row justify-between items-baseline font-bold mx-6"
			>
				<h1 className="text-xl animate-fade-in ">
					{prop} {groupedPlants[prop][0][filterCategory + "Category"]}
				</h1>
				<p className="text-slate-300 text-xs uppercase">
					{fitleredPlants[prop].length} plant
					{fitleredPlants[prop].length !== 1 ? "s" : null}
				</p>
			</motion.header>
		);
		const groupPlants = fitleredPlants[prop].map((plant) => {
			return (
				<motion.li
					layout //TODO: execute initial only once, not on shuffle
					layoutId={plant.id}
					className=" min-h-[6rem] rounded-xl isolate aspect-square relative flex flex-col justify-between items-start  w-full pl-2 pr-4 py-2 text-white overflow-hidden bg-[#b0cde3]"
					key={plant.id}
				>
					<div className="absolute bottom-1 right-0 h-5/6 w-1/2">
						<Image
							src={`/p${plant.id}.png`}
							alt={"Drawing of " + plant.name}
							className="object-contain"
							fill="true"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>

					<div className="text-md font-bold leading-none mb-2 pr-6">
						{plant.name}
					</div>
					<motion.button
						whileTap={{ scale: 0.8 }}
						onClick={() => addPlantToUserArray(plant.id, username)}
						className="rounded-full bg-white/30 text-white w-8 h-8 flex justify-center items-center text-2xl pb-1"
					>
						+
					</motion.button>
				</motion.li>
			);
		});
		grouped.push(
			<motion.ul
				variants={container}
				initial="hidden"
				animate="show"
				layout
				key={grouped.length}
				className=" mx-6 pt-4 pb-10 gap-4 grid md:aspect-auto grid-cols-2 justify-items-center"
			>
				{groupPlants}
			</motion.ul>
		);
	}
	return grouped; //See? Clunky. Needs refactoring
};

const container = {
	show: {
		transition: {
			staggerChildren: 0.35,
		},
	},
};
const item = {
	show: {
		opacity: 1,
		transition: { duration: 0.5 },
	},
	hidden: { opacity: 0 },
};

export default function Home({ data }) {
	const [plants, setPlants] = useState(data);
	const [filterCategory, setFilterCategory] = useState("wateringVolume");
	const [searchQuery, setSearchQuery] = useState(""); //TODO Search w/ setTimeout from server

	const groupedPlants = plants?.reduce((accumPlant, currentPlant) => {
		if (!accumPlant[currentPlant[filterCategory]]) {
			accumPlant[currentPlant[filterCategory]] = [];
		}
		accumPlant[currentPlant[filterCategory]].push(currentPlant);
		return accumPlant;
	}, {});

	return (
		<>
			<Head>
				<title>Find & add a plants</title>
				<meta
					name="description"
					content="Add plants to your collection"
				/>
			</Head>

			<SearchFilter setSearchQuery={setSearchQuery} />

			<GroupCategory
				filterCategory={filterCategory}
				setFilterCategory={setFilterCategory}
			/>

			{groupedPlants ? (
				<Feed
					groupedPlants={groupedPlants}
					searchQuery={searchQuery}
					filterCategory={filterCategory}
				/>
			) : null}
		</>
	);
}

export async function getServerSideProps(context) {
	const data = await fetchAllPlants();
	return {
		props: { data }, // will be passed to the page component as props
	};
}

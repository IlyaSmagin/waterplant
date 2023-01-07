import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DropIcon from "./components/icons/drop";
import AddIcon from "./components/icons/add";
import PlantIcon from "./components/icons/plant";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/initSupabase";
const Filter = ({ filterCategory, setFilterCategory }) => {
  function onChangeValue(event) {
    setFilterCategory(event.target.value);
  }
  return (
    <ul className="animate-fade-in mx-6 my-4 flex flex-row justify-between border-b-2 border-b-slate-300 text-slate-400 font-bold uppercase text-xs">
      <li className="relative flex flex-col items-center justify-center">
        <input
          type="radio"
          id="wateringVolume"
          onChange={onChangeValue}
          checked={filterCategory === "wateringVolume"}
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
          onChange={onChangeValue}
          checked={filterCategory === "size"}
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
          onChange={onChangeValue}
          checked={filterCategory === "difficulty"}
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
          checked={filterCategory === "light"}
          onChange={onChangeValue}
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

export default function Home() {
  const [plants, setPlants] = useState([]);
  const [groupedPlants, setGroupedPlants] = useState();
  const [filterCategory, setFilterCategory] = useState("wateringVolume");
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);
  const addPlant = async (index) => {
    let { data: users } = await supabase
      .from("users")
      .select("*")
      .eq("username", searchValue);

    if (users.length < 1) {
      const newArray = [...users, index];
      const { data } = await supabase
        .from("users")
        .insert([{ username: searchValue, plantsarray: newArray }]);
    } else {
      const newArray = [...users[0].plantsarray, index];
      console.log(users);
      const { data } = await supabase
        .from("users")
        .update({ plantsarray: newArray })
        .eq("username", searchValue);
    }
  };

  const fetchPlants = async (sortParam) => {
    const { data: plants } = await supabase
      .from("plants")
      .select("*")
      .order(sortParam, true);
    setPlants(plants);
  };

  useState(() => {
    fetchPlants(filterCategory);
  }, [filterCategory]);

  useEffect(() => {
    const groupedPlants = plants.reduce((accumPlant, currentPlant) => {
      if (!accumPlant[currentPlant[filterCategory]]) {
        accumPlant[currentPlant[filterCategory]] = [];
      }
      accumPlant[currentPlant[filterCategory]].push(currentPlant);
      return accumPlant;
    }, {});
    setGroupedPlants(groupedPlants);
  }, [plants, filterCategory]);

  const grouped = [];
  for (const prop in groupedPlants) {
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
          {prop} {plants[0][filterCategory + "Category"]}
        </h1>
        <p className="text-slate-300 text-xs uppercase">
          {groupedPlants[prop].length} plant
          {groupedPlants[prop].length !== 1 ? "s" : null}
        </p>
      </motion.header>
    );
    const groupPlants = groupedPlants[prop].map((plant) => {
      return (
        <motion.li
          variants={item}
          layout //TODO: execute initial only once, not on shuffle
          layoutId={plant.id}
          className=" min-h-[6rem] rounded-xl isolate aspect-square relative flex flex-col justify-between items-start  w-full pl-2 pr-4 py-2 text-white overflow-hidden bg-[#b0cde3]"
          key={plant.id}
        >
          <div className="absolute bottom-1 right-0 h-5/6 w-1/2">
            <Image
              src={`/p${plant.id}.png`}
              alt=""
              className="object-contain"
              fill="true"
            />
          </div>

          <div className="text-md font-bold leading-none mb-2 pr-6">
            {plant.name}
          </div>
          <button
            onClick={() => addPlant(plant.id)}
            className="rounded-full bg-white/30 text-white w-8 h-8 flex justify-center items-center text-2xl pb-1"
          >
            +
          </button>
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
        className=" mx-6 pt-4 pb-10 gap-4 grid md:aspect-auto grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 justify-items-center"
      >
        {groupPlants.slice(0)}
      </motion.ul>
    );
  }
  return (
    <div className="">
      <Head>
        <title>Add a plant</title>
        <meta name="description" content="Add a plant to track watering" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mb-20">
        <form className="flex items-center">
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
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </form>

        <Filter
          array={plants}
          setGroupedArray={setGroupedPlants}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />

        {grouped}
      </main>
      <nav className="bg-[#f7f8f9] border-slate-200 fixed inset-x-0 bottom-0 p-6 pt-4 border-t">
        <ul className=" flex flex-row justify-around text-slate-500">
          <li className="text-slate-900 font-bold">
            <Link href="/">
              <AddIcon />
            </Link>
          </li>
          <li>
            <Link href="/water">
              <DropIcon />
            </Link>
          </li>
          <li>
            <Link href="/collection">
              <PlantIcon />
            </Link>
          </li>
        </ul>
      </nav>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}

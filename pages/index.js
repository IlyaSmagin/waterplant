import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";

export default function Home() {
  const [plants, setPlants] = useState([]);

  const fetchPlants = async () => {
    const { data: plants } = await supabase
      .from("plants")
      .select("*")
      .order("name", true);
    setPlants(plants);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <div className="">
      <Head>
        <title>Add a plant</title>
        <meta name="description" content="Add a plant to track watering" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <form class="flex items-center mt-8">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full mt-8 mx-6">
            <div class="flex absolute inset-y-0 left-4 items-center pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              class="placeholder:text-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:outline-slate-500 block w-full pl-10 p-2.5 "
              placeholder="Search"
            />
          </div>
        </form>

        <ul class="mx-6 my-4 flex flex-row justify-between border-b-2 border-b-slate-300 text-slate-400 font-bold uppercase text-xs">
          <li className="relative flex flex-col items-center justify-center">
            <input
              type="radio"
              id="water"
              name="hosting"
              value="water"
              className="peer/water checked:w-1.5 checked:h-1.5 bg-slate-700 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
            />
            <label
              for="water"
              className="peer-checked/water:text-slate-700 flex items-center justify-between w-full px-0 pt-3 pb-2 cursor-pointer"
            >
              <div class="block">
                <div class="w-full">Water</div>
              </div>
            </label>
          </li>
          <li className="relative flex flex-col items-center justify-center">
            <input
              type="radio"
              id="size"
              name="hosting"
              value="size"
              className="peer/size checked:w-1.5 checked:h-1.5 bg-slate-700 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
            />
            <label
              for="size"
              className="peer-checked/size:text-slate-700 flex items-center justify-between w-full px-0 pt-3 pb-2 cursor-pointer"
            >
              <div class="block">
                <div class="w-full">Size</div>
              </div>
            </label>
          </li>
          <li className="relative flex flex-col items-center justify-center">
            <input
              type="radio"
              id="difficulty"
              name="hosting"
              value="difficulty"
              className="peer/difficulty checked:w-1.5 checked:h-1.5 bg-slate-700 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
            />
            <label
              for="difficulty"
              className="peer-checked/difficulty:text-slate-700 flex items-center justify-between w-full px-0 pt-3 pb-2 cursor-pointer"
            >
              <div class="block">
                <div class="w-full">Difficulty</div>
              </div>
            </label>
          </li>
          <li className="relative flex flex-col items-center justify-center">
            <input
              type="radio"
              id="light"
              name="hosting"
              value="light"
              className="peer/light checked:w-1.5 checked:h-1.5 bg-slate-700 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
            />
            <label
              for="light"
              className="peer-checked/light:text-slate-700 flex items-center justify-between w-full px-0 pt-3 pb-2 cursor-pointer"
            >
              <div class="block">
                <div class="w-full">Light</div>
              </div>
            </label>
          </li>
        </ul>

        <header className="flex flex-row justify-between items-baseline font-bold mx-6 mt-8">
          <h1 className="text-xl">Small</h1>
          <p className="text-slate-300 text-xs uppercase">
            show all {plants.length}
          </p>
        </header>
        <ul className="mx-6 pt-4 pb-8 gap-4 grid aspect-square md:aspect-auto grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {plants.map((plant) => (
            <li
              className=" min-h-[6rem] rounded-xl md:aspect-square isolate relative flex flex-col justify-between items-start  w-full pl-2 pr-4 py-2 text-white overflow-hidden bg-[#b0cde3] last:bg-[#c1e0df] "
              key={plant.id}
            >
              <div className="absolute bottom-1 right-0 h-5/6 w-1/2">
                <Image
                  src="/../public/p2.png"
                  alt=""
                  objectFit="contain"
                  fill="true"
                />
              </div>

              <div className="text-md font-bold leading-none mb-2 pr-6">
                {plant.name}
              </div>
              <button className="rounded-full bg-white/30 text-white w-8 h-8 flex justify-center items-center text-2xl pb-1">
                +
              </button>
            </li>
          ))}
        </ul>
        <header className="flex flex-row justify-between items-baseline font-bold mx-6">
          <h1 className="text-xl">Medium</h1>
          <p className="text-slate-300 text-xs uppercase">
            show all {plants.length}
          </p>
        </header>
        <ul className="mx-6 pt-4 pb-10 gap-4 grid aspect-square md:aspect-auto grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {plants.map((plant) => (
            <li
              className=" min-h-[6rem] rounded-xl isolate md:aspect-square relative flex flex-col justify-between items-start  w-full pl-2 pr-4 py-2 text-white overflow-hidden bg-[#b0cde3] last:bg-[#c1e0df] "
              key={plant.id}
            >
              <div className="absolute bottom-1 right-0 h-5/6 w-1/2">
                <Image
                  src="/../public/p2.png"
                  alt=""
                  objectFit="contain"
                  fill="true"
                />
              </div>

              <div className="text-md font-bold leading-none mb-2 pr-6">
                {plant.name}
              </div>
              <button className="rounded-full bg-white/30 text-white w-8 h-8 flex justify-center items-center text-2xl pb-1">
                +
              </button>
            </li>
          ))}
        </ul>
        <header className="flex flex-row justify-between items-baseline font-bold mx-6">
          <h1 className="text-xl">Large</h1>
          <p className="text-slate-300 text-xs uppercase">
            show all {plants.length}
          </p>
        </header>
        <ul className="mx-6 pt-4 mb-16 pb-10 gap-4 grid aspect-square md:aspect-auto grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {plants.map((plant) => (
            <li
              className=" min-h-[6rem] rounded-xl isolate md:aspect-square relative flex flex-col justify-between items-start  w-full pl-2 pr-4 py-2 text-white overflow-hidden bg-[#b0cde3] last:bg-[#c1e0df] "
              key={plant.id}
            >
              <div className="absolute bottom-1 right-0 h-5/6 w-1/2">
                <Image
                  src="/../public/p2.png"
                  alt=""
                  objectFit="contain"
                  fill="true"
                />
              </div>

              <div className="text-md font-bold leading-none mb-2 pr-6">
                {plant.name}
              </div>
              <button className="rounded-full bg-white/30 text-white w-8 h-8 flex justify-center items-center text-2xl pb-1">
                +
              </button>
            </li>
          ))}
        </ul>
      </main>
      <nav className="bg-[#f7f8f9] border-slate-200 fixed inset-x-0 bottom-0 p-6 pt-4 border-t">
        <ul className=" flex flex-row justify-around">
          <li className="text-slate-700 font-bold">
            <Link href="/">Add</Link>
          </li>
          <li>
            <Link href="/water">Water</Link>
          </li>
          <li>
            <Link href="/collection">Collection</Link>
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

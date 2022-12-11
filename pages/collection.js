import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DropIcon from "./components/icons/drop";
import AddIcon from "./components/icons/add";
import SunIcon from "./components/icons/sun";
import PlantIcon from "./components/icons/plant";
import TempIcon from "./components/icons/temp";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";

export default function Collection() {
  const [plants, setPlants] = useState([]);

  const fetchPlants = async () => {
    const { data: plants } = await supabase
      .from("plants")
      .select("*")
      .order("id", true);
    setPlants(plants);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.75 },
    },
    hidden: { opacity: 0, x: 150 },
  };
  return (
    <div className="">
      <Head>
        <title>Collection</title>
        <meta name="description" content="Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <header className="flex flex-row justify-between items-baseline pt-8 px-6 font-bold">
          <h1 className="text-3xl">My plants</h1>
        </header>
        {plants.length > 0 ? (
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="p-6 gap-4 mb-24 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center overflow-hidden"
          >
            {plants.map((plant) => (
              <motion.li
                layout="position"
                variants={item}
                key={plant.id}
                className="rounded-xl border-slate-300 isolate relative flex flex-col justify-between w-full p-6 text-white overflow-hidden bg-[#8fbcc5] border"
              >
                <div className=" mb-16 text-2xl font-bold">{plant.name}</div>

                <div className="mb-4 leading-none flex flex-row justify-start items-start">
                  <DropIcon className="-ml-1.5 mr-1 w-6 h-6 opacity-50" />
                  <div className="">
                    <div className="font-bold uppercase opacity-50 ">water</div>
                    <div className=" font-normal">
                      {`1 / ${plant.wateringRegularity} hours`}
                    </div>
                  </div>
                </div>
                <div className="mb-4 leading-none flex flex-row justify-start">
                  <SunIcon className="-ml-1.5 mr-1 w-6 h-6 opacity-50" />
                  <div className="">
                    <div className="font-bold uppercase opacity-50 ">light</div>
                    <div className=" font-normal">{plant.light}</div>
                  </div>
                </div>
                <div className="leading-none flex flex-row justify-start">
                  <TempIcon className="-ml-1.5 mr-1 w-6 h-6 opacity-50" />
                  <div className="">
                    <div className="font-bold uppercase opacity-50 ">temp</div>
                    <div className=" font-normal">{plant.temperature}</div>
                  </div>
                </div>
                <div className="-z-10 absolute inset-y-0 -right-4 w-2/3 h-full">
                  <Image
                    src={`/../public/p${plant.id}.png`}
                    alt=""
                    className="object-contain"
                    fill="true"
                  />
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </main>
      <nav className="bg-[#f7f8f9] border-slate-200 fixed inset-x-0 bottom-0 p-6 pt-4 border-t">
        <ul className=" flex flex-row justify-around text-slate-500">
          <li>
            <Link href="/">
              <AddIcon />
            </Link>
          </li>
          <li>
            <Link href="/water">
              <DropIcon />
            </Link>
          </li>
          <li className="text-slate-900 font-bold">
            <Link href="/collection">
              <PlantIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

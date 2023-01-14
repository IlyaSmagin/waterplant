import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DropIcon from "./components/icons/drop";
import AddIcon from "./components/icons/add";
import SunIcon from "./components/icons/sun";
import BackIcon from "./components/icons/back";
import PlantIcon from "./components/icons/plant";
import TempIcon from "./components/icons/temp";
import CloseIcon from "./components/icons/close";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchPlants, removePlantFromUserArray } from "./api/fetchPlants";

export default function Collection() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants(setPlants);
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
      </Head>

      <main className="">
        <header className="flex flex-row justify-between items-baseline pt-8 px-6 font-bold">
          <h1 className="text-3xl">My plants</h1>
        </header>
        {plants?.length > 0 ? (
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
                className="w-full relative"
              >
                <motion.div
                  drag={"x"}
                  dragConstraints={{ left: -100, right: 0 }}
                  dragElastic={{ left: 0.05, right: 0 }}
                  dragMomentum={false}
                  onDragEnd={(event, info) =>
                    info.offset.x < -150 && info.delta.x == 0
                      ? removePlantFromUserArray(plant.id, plants, setPlants)
                      : ""
                  }
                  dragSnapToOrigin={true}
                  className="rounded-xl select-none border-slate-300 isolate relative flex flex-col justify-between p-6 text-white overflow-hidden bg-[#8fbcc5] border"
                >
                  <div className="mb-16 text-2xl font-bold">{plant.name}</div>

                  <div className="mb-4 leading-none flex flex-row justify-start items-start">
                    <DropIcon className="-ml-1.5 mr-1 w-6 h-6 opacity-50" />
                    <div className="">
                      <div className="font-bold uppercase opacity-50 ">
                        water
                      </div>
                      <div className=" font-normal">
                        {`1 / ${plant.wateringRegularity} hours`}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 leading-none flex flex-row justify-start">
                    <SunIcon className="-ml-1.5 mr-1 w-6 h-6 opacity-50" />
                    <div className="">
                      <div className="font-bold uppercase opacity-50 ">
                        light
                      </div>
                      <div className=" font-normal">{plant.light}</div>
                    </div>
                  </div>
                  <div className="leading-none flex flex-row justify-start">
                    <TempIcon className="-ml-1.5 mr-1 w-6 h-6 opacity-50" />
                    <div className="">
                      <div className="font-bold uppercase opacity-50 ">
                        temp
                      </div>
                      <div className=" font-normal">{plant.temperature}</div>
                    </div>
                  </div>
                  <div className="-z-10 absolute inset-y-2 right-0 w-2/3">
                    <Image
                      src={`/p${plant.id}.png`}
                      alt={"Drawing of " + plant.name}
                      className="object-contain"
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </motion.div>
                <div className="w-full h-full absolute inset-0 bg-red-500 rounded-xl -z-10 flex justify-end items-center">
                  <CloseIcon className=" w-20 h-20 mr-4 opacity-50" />
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

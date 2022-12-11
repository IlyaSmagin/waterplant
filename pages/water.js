import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DropIcon from "./components/icons/drop";
import AddIcon from "./components/icons/add";
import PlantIcon from "./components/icons/plant";
import VolumeIcon from "./components/icons/volume";
import CheckIcon from "./components/icons/check";
import { motion } from "framer-motion";
import WaterItem from "./water/waterItem";
import WaterAbout from "./water/waterAbout";
import { calculateNextWatering } from "./water/waterItem";
import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";

export default function Collection() {
  const [plants, setPlants] = useState([]);
  const [whichIsOpen, setWhichIsOpen] = useState(-1);

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
  const cancelWatering = (e, index) => {
    const now = new Date();
    const newItems = plants.map((item, itemIndex) => {
      if (itemIndex == index) {
        return {
          ...item,
          lastWateringTime:
            now.toISOString() - item.wateringRegularity * (1000 * 60 * 60),
        };
      }
      return item;
    });
    setPlants(newItems);
  };
  const handleWatering = (e, index) => {
    const now = new Date();
    const newItems = plants.map((item, itemIndex) => {
      if (itemIndex == index) {
        return { ...item, lastWateringTime: now.toISOString() };
      }
      return item;
    });
    setPlants(newItems);
  };
  const plantsLeftToWater = () => {
    return plants.reduce((accumulator, currentPlant) => {
      if (
        calculateNextWatering(
          currentPlant.lastWateringTime,
          currentPlant.wateringRegularity
        ) < 23
      ) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
  };

  const container = {
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    hidden: { opacity: 0 },
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
          <h1 className="text-3xl">Water today</h1>
          <p className="text-slate-300 text-xs uppercase">
            {plantsLeftToWater()} plants
          </p>
        </header>
        {plants.length > 0 ? (
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="p-6 gap-4 mb-24 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center overflow-hidden"
          >
            {plants.map((plant, index) => (
              <motion.li
                layout="position"
                variants={item}
                key={plant.id}
                className="w-full"
              >
                <WaterItem
                  setWhichIsOpen={setWhichIsOpen}
                  plant={plant}
                  handleWatering={handleWatering}
                  index={index}
                  cancelWatering={cancelWatering}
                />
                {/* pass plant */}
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
        {whichIsOpen !== -1 ? (
          <WaterAbout
            plant={plants[whichIsOpen]}
            handleWatering={handleWatering}
            index={whichIsOpen}
            cancelWatering={cancelWatering}
            setWhichIsOpen={setWhichIsOpen}
          />
        ) : null}
      </main>
      <nav className="bg-[#f7f8f9] border-slate-200 fixed inset-x-0 bottom-0 p-6 pt-4 border-t">
        <ul className=" flex flex-row justify-around text-slate-500">
          <li>
            <Link href="/">
              <AddIcon />
            </Link>
          </li>
          <li className="text-slate-900 font-bold">
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
    </div>
  );
}

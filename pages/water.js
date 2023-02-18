import Head from "next/head";
import Link from "next/link";
import SettingsIcon from "../components/icons/settings";
import { motion } from "framer-motion";
import WaterItem from "../components/water/waterItem";
import WaterAbout from "../components/water/waterAbout";
import calculateNextWatering from "../components/water/calculateNextWatering";
import { useEffect, useState } from "react";
import { fetchPlants } from "../api/fetchPlants";

export default function Water() {
  const [plants, setPlants] = useState([]);
  const [whichIsOpen, setWhichIsOpen] = useState(-1);

  useEffect(() => {
    fetchPlants(setPlants);
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
        <title>Watering</title>
        <meta
          name="description"
          content="See which of your plants need water"
        />
      </Head>

      <div className="w-full flex justify-end p-6 pb-0">
        <Link href="/settings">
          <SettingsIcon className=" w-7 h-7 text-slate-400" />
        </Link>
      </div>
      <header className="flex flex-row justify-between items-baseline px-6 font-bold">
        <h1 className="text-3xl">Water today</h1>
        <p className="text-slate-400 text-xs uppercase">
          {plantsLeftToWater()} plants
        </p>
      </header>
      {plants.length > 0 ? (
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="p-6 gap-4 mb-24 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 justify-items-center overflow-hidden"
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
      {whichIsOpen !== -1 && plants.length > 0 ? (
        <WaterAbout
          plant={plants[whichIsOpen]}
          handleWatering={handleWatering}
          index={whichIsOpen}
          cancelWatering={cancelWatering}
          setWhichIsOpen={setWhichIsOpen}
        />
      ) : null}
    </div>
  );
}

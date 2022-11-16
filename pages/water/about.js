import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DropIcon from "../components/icons/drop";
import AddIcon from "../components/icons/add";
import PlantIcon from "../components/icons/plant";
import VolumeIcon from "../components/icons/volume";
import CheckIcon from "../components/icons/check";
import { useEffect, useState } from "react";

export default function waterAbout({ plant }) {
  const [plant, setPlant] = useState(plant);

  const handleWatering = (e, index) => {
    const now = new Date();
    /* 
    let newPlant = plant;
    Object.assign(newPlant, { lastWateringTime: Date() });
    setPlants((prev) => [...prev, newPlant]); */
    const newItems = plants.map((item, itemIndex) => {
      if (itemIndex == index) {
        return { ...item, lastWateringTime: now.toISOString() };
      }
      return item;
    });
    setPlants(newItems);
  };

  const calculateNextWatering = (lastWateringTime, wateringRegularity) => {
    //calculates num of hours passed from imput timestamp
    const date = new Date(lastWateringTime);
    const now = new Date();
    const timePassed = now - date;
    const time = wateringRegularity - Math.floor(timePassed / (1000 * 60 * 60));
    /* if (time > 0) {
      return `Next watering in ${time} hours.`;
    } else {
      return `You have to water the plant!`;
    } */
    return time;
  };

  return (
    <div className="">
      <Head>
        <title>{plant?.name || "Plant"}</title>
        <meta name="description" content="Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <header className="flex flex-row justify-between items-baseline pt-8 px-6 font-bold">
          <h1 className="text-3xl">{plant.name}</h1>
        </header>
        <ul className="p-6 gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          <li
            className={
              " min-h-[6rem] rounded-xl isolate relative flex flex-row justify-between items-center w-full pl-0 pr-4 py-4 text-white overflow-hidden " +
              (calculateNextWatering(
                plant.lastWateringTime,
                plant.wateringRegularity
              ) > 23
                ? "bg-[#b0cde3]"
                : "bg-[#e5e9ea]")
            }
            key={plant.id}
          >
            <div className=" flex-none relative h-full w-1/4">
              <Image
                className="object-contain"
                src="/../public/p2.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            </div>

            <div className="mb-2 flex-1 self-start">
              <div className="text-lg font-bold leading-none"></div>
              <div className=" mt-3 text-slate-500 flex flex-row flex-nowrap">
                <div className=" flex justify-center items-baseline">
                  <VolumeIcon className="w-6 h-6" />
                </div>
                <div className=" font-normal">~ {plant.wateringVolume} ml</div>
              </div>
            </div>
            <button
              className="flex-none flex justify-center items-center rounded-full bg-white/30 text-white w-12 h-12"
              onClick={(e) => handleWatering(e, index)}
            >
              {calculateNextWatering(
                plant.lastWateringTime,
                plant.wateringRegularity
              ) > 23 ? (
                <CheckIcon className="h-7 w-7" />
              ) : (
                <DropIcon className="h-7 w-7" />
              )}
            </button>
          </li>
        </ul>
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

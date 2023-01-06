import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import calculateNextWatering from "./calculateNextWatering";
import DropIcon from "../components/icons/drop";
import VolumeIcon from "../components/icons/volume";
import CheckIcon from "../components/icons/check";
import { useRef, useState, useEffect } from "react";
import BackIcon from "../components/icons/back";

export default function WaterAbout({
  plant = {
    id: 1,
    name: "Hedgehog Aloe",
    description: "Plant",
    wateringRegularity: 96,
    lastWateringTime: "2022-11-24T20:29:30.851719+00:00",
    wateringVolume: 200,
  },
  handleWatering,
  cancelWatering,
  index,
  setWhichIsOpen,
}) {
  const [counter, setCounter] = useState(100);
  const intervalRef = useRef(null);
  useEffect(() => {
    return () => stopCounter();
  }, []);
  const startCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 10);
  };

  const stopCounter = (e, index) => {
    const now = new Date();
    if (counter > 300) {
      cancelWatering(e, index);
    }
    setCounter(100);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div
      className={
        "z-20 p-6 inset-0 fixed flex justify-center flex-col items-center h-screen w-screen text-black bg-slate-50"
      }
    >
      <button
        className="-ml-1 mb-2 rounded-full self-start"
        onClick={() => setWhichIsOpen(-1)}
      >
        <BackIcon className="text-slate-400 h-8 w-8" />
      </button>
      <div className="self-start text-lg font-bold leading-none">
        {plant.name}
      </div>
      <div className=" h-[50vh] w-full relative">
        <Image
          className="object-contain"
          src={`/../public/p${plant.id}.png`}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>
      <div className=" mt-3 flex flex-row flex-nowrap w-fit p-1.5 justify-center ">
        <div className=" font-normal">{plant.description}</div>
      </div>
      <div className=" mt-3 flex flex-row flex-nowrap w-fit p-1.5 justify-center rounded bg-slate-300">
        <div className="text-slate-500  flex justify-center items-baseline">
          <VolumeIcon className="w-6 h-6" />
        </div>
        <div className=" font-normal">~ {plant.wateringVolume} ml</div>
      </div>
      <button
        className="mt-6 flex-none flex justify-center items-center rounded-full bg-slate-800/70 text-white w-12 h-12"
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
      <label className="mx-auto text-xs uppercase">water plant</label>
    </div>
  );
}

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
        "z-20 px-8 py-12 inset-0 fixed flex justify-between flex-col items-center h-screen w-screen text-black bg-slate-50"
      }
    >
      <div className="w-full h-fit">
        <button
          className="-ml-1 mb-3 rounded-full self-start"
          onClick={() => setWhichIsOpen(-1)}
        >
          <BackIcon className="text-slate-400 h-9 w-9" />
        </button>
        <div className="self-start text-3xl font-bold leading-none -mt-1">
          {plant.name}
        </div>
      </div>
      <div className="flex flex-col justify-start items-center w-full h-full">
        <div className="max-h-[35vh] h-full w-full relative">
          <Image
            className="object-contain"
            src={`/p${plant.id}.png`}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
        <div className="flex flex-row flex-nowrap w-fit justify-center mt-4">
          <div className="text-slate-700 text-sm font-semibold">
            {plant.description}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center">
        <div className="mt-3 mb-4 flex flex-row flex-nowrap w-fit p-2 px-3 justify-center items-center rounded bg-slate-100">
          <div className="text-slate-400 flex justify-center items-baseline">
            <VolumeIcon className="w-9 h-9 mr-1" />
          </div>
          <div className="font-semibold text-slate-500">
            ~ <span className="text-lg">{plant.wateringVolume}</span> ml
          </div>
        </div>
        <button //TODO add initial animation
          className="mt-6 mb-3 flex-none flex justify-center items-center rounded-full bg-slate-800/70 text-white w-14 h-14"
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
        <label className="mx-auto mb-6 text-xs font-bold tracking-wider uppercase text-slate-400">
          water plant
        </label>
      </div>
    </div>
  );
}

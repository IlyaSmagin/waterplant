import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import DropIcon from "../components/icons/drop";
import VolumeIcon from "../components/icons/volume";
import calculateNextWatering from "./calculateNextWatering";
import CheckIcon from "../components/icons/check";
import { useRef, useState, useEffect } from "react";

export default function WaterItem({
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
  const [touch, setTouch] = useState(false);

  const startCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) =>
        prevCounter <= 200 ? prevCounter + 1 : prevCounter
      );
    }, 10);
  };

  const stopCounter = (e, index) => {
    if (counter >= 200) {
      cancelWatering(e, index);
    }
    setCounter(100);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  useEffect(() => {
    return stopCounter();
  }, []);
  return (
    <motion.div
      animate={{ scale: touch ? 0.97 : 1 }}
      className={
        "cursor-pointer pr-4  pl-0 py-4  min-h-[6rem] rounded-xl w-full text-white overflow-hidden h-full flex flex-row justify-between items-center " +
        (calculateNextWatering(
          plant.lastWateringTime,
          plant.wateringRegularity
        ) > 23
          ? "bg-[#b0cde3]"
          : "bg-[#e5e9ea]")
      }
    >
      <div
        className="flex flex-row justify-between items-center w-full h-full"
        onMouseDown={() => setTouch(true)}
        onPointerUp={() => setTouch(false)}
        onMouseLeave={() => setTouch(false)}
        onClick={() => setWhichIsOpen(index)}
      >
        <div className=" flex-none relative h-full w-1/4">
          <Image
            className="object-contain"
            src={`/p${plant.id}.png`}
            alt={"Drawing of " + plant.name}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>

        <div className="mb-2 flex-1 self-start">
          <div className="text-lg font-bold leading-none">{plant.name}</div>
          <div className=" mt-3 text-slate-500 flex flex-row flex-nowrap">
            <div className="flex justify-center items-baseline">
              <VolumeIcon className="w-6 h-6" />
            </div>
            <div className=" font-normal">~ {plant.wateringVolume} ml</div>
          </div>
        </div>
      </div>
      <motion.button //TODO create watering button component to pass into waterAbout and waterItem
        whileTap={{ scale: 0.8 }}
        style={{
          backgroundColor:
            calculateNextWatering(
              plant.lastWateringTime,
              plant.wateringRegularity
            ) > 23
              ? counter > 100
                ? `hsla(0, 100%, ${150 - counter / 2}%, ${counter / 250})`
                : ""
              : "",
        }}
        className="flex-none flex justify-center items-center rounded-full bg-white/30 text-white w-12 h-12 ml-4"
        onClick={(e) => {
          e.stopPropagation();
          handleWatering(e, index);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          startCounter(e);
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          stopCounter(e, index);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          stopCounter(e, index);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          startCounter(e, index);
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          stopCounter(e, index);
        }}
      >
        {calculateNextWatering(
          plant.lastWateringTime,
          plant.wateringRegularity
        ) > 23 ? (
          <CheckIcon className="h-7 w-7" />
        ) : (
          <DropIcon className="h-7 w-7" />
        )}
      </motion.button>
    </motion.div>
  );
}

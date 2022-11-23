import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import DropIcon from "../components/icons/drop";
import VolumeIcon from "../components/icons/volume";
import CheckIcon from "../components/icons/check";
import { useRef, useState, useEffect } from "react";

export default function waterItem({
  plant,
  handleWatering,
  cancelWatering,
  index,
}) {
  const [counter, setCounter] = useState(100);
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <LayoutGroup>
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              layout
              transition={{
                layout: {
                  duration: 1.5,
                },
              }}
              className={
                " pr-4 inset-0 z-20 pl-0 py-4 isolate fixed min-h-screen rounded-none w-screen text-white overflow-hidden flex flex-col justify-between items-center " +
                (calculateNextWatering(
                  plant.lastWateringTime,
                  plant.wateringRegularity
                ) > 23
                  ? "bg-[#b0cde3]"
                  : "bg-[#e5e9ea]")
              }
            >
              <div className="mb-2 flex-1 self-start">
                <motion.div
                  className="text-lg font-bold leading-none"
                  layoutId={`card-name-${index}`}
                  layout
                  transition={{
                    layout: {
                      duration: 1.5,
                    },
                  }}
                >
                  {plant.name}
                </motion.div>
                <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
                  Close
                </button>
                <div className=" mt-3 text-slate-500 flex flex-row flex-nowrap">
                  <div className=" flex justify-center items-baseline">
                    <VolumeIcon className="w-6 h-6" />
                  </div>
                  <div className=" font-normal">
                    ~ {plant.wateringVolume} ml
                  </div>
                </div>
              </div>
              <div className=" flex-none relative h-full w-1/4">
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
            </motion.div>
          ) : (
            <motion.div
              layout
              transition={{
                layout: {
                  duration: 1.5,
                },
              }}
              className={
                " pr-4  pl-0 py-4 isolate relative  min-h-[6rem] rounded-xl w-full text-white overflow-hidden h-full flex flex-row justify-between items-center " +
                (calculateNextWatering(
                  plant.lastWateringTime,
                  plant.wateringRegularity
                ) > 23
                  ? "bg-[#b0cde3]"
                  : "bg-[#e5e9ea]")
              }
            >
              <div className=" flex-none relative h-full w-1/4">
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

              <div
                className="mb-2 flex-1 self-start"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              >
                <motion.div
                  className="text-lg font-bold leading-none"
                  layoutId={`card-name-${index}`}
                  layout
                  transition={{
                    layout: {
                      duration: 1.5,
                    },
                  }}
                >
                  {plant.name}
                </motion.div>
                <div className=" mt-3 text-slate-500 flex flex-row flex-nowrap">
                  <div className=" flex justify-center items-baseline">
                    <VolumeIcon className="w-6 h-6" />
                  </div>
                  <div className=" font-normal">
                    ~ {plant.wateringVolume} ml
                  </div>
                </div>
              </div>
              <button
                className="flex-none flex justify-center items-center rounded-full bg-white/30 text-white w-12 h-12"
                onClick={(e) => handleWatering(e, index)}
                onMouseDown={startCounter}
                onMouseUp={(e) => stopCounter(e, index)}
                onMouseLeave={(e) => stopCounter(e, index)}
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
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </>
  );
}

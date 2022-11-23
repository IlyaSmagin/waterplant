import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DropIcon from "./components/icons/drop";
import AddIcon from "./components/icons/add";
import PlantIcon from "./components/icons/plant";
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

  const calculateNextWatering = (lastWateringTime, wateringRegularity) => {
    //calculates num of hours passed from imput timestamp
    const date = new Date(lastWateringTime);
    const now = new Date();
    const timePassed = now - date;
    const time = wateringRegularity - Math.floor(timePassed / (1000 * 60 * 60));
    if (time > 0) {
      return `Next watering in ${time} hours.`;
    } else {
      return `You have to water the plant!`;
    }
  };

  return (
    <div className="">
      <Head>
        <title>Collection</title>
        <meta name="description" content="Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <header>
          <h1 className="p-8 text-3xl">My plants</h1>
        </header>
        <ul className="p-6 gap-4 mb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {plants.map((plant) => (
            <li
              className="rounded-xl border-slate-300 isolate relative flex flex-col justify-between w-full p-8 text-white overflow-hidden bg-[#8fbcc5] border"
              key={plant.id}
            >
              <div className=" mb-12 text-2xl font-bold">{plant.name}</div>

              <div className="mb-2 leading-none flex flex-row">
                <DropIcon className=" opacity-50" />
                <div className="">
                  <div className="font-bold uppercase opacity-50 ">water</div>
                  <div className=" font-normal">
                    {calculateNextWatering(
                      plant.lastWateringTime,
                      plant.wateringRegularity
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-2 leading-none">
                <div className="font-bold uppercase opacity-50 ">light</div>
                <div className=" font-normal">{plant.light}</div>
              </div>
              <div className="mb-2 leading-none">
                <div className="font-bold uppercase opacity-50 ">temp</div>
                <div className=" font-normal">{plant.temperature}</div>
              </div>
              <div className="-z-10 absolute inset-y-0 -right-4 w-2/3 h-full">
                <Image
                  src={`/../public/p${plant.id}.png`}
                  alt=""
                  className="object-contain"
                  fill="true"
                />
              </div>
            </li>
          ))}
        </ul>
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

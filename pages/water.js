import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";

export default function Collection() {
  const [plants, setPlants] = useState([]);

  const fetchPlants = async () => {
    const { data: plants } = await supabase
      .from("plants")
      .select("*")
      .order("name", true);
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
        <header className="flex flex-row justify-between items-baseline pt-8 px-6 font-bold">
          <h1 className="text-3xl">Water today</h1>
          <p className="text-slate-300 text-xs uppercase">
            {plants.length} plants
          </p>
        </header>
        <ul className="p-6 gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {plants.map((plant) => (
            <li
              className=" min-h-[6rem] rounded-xl isolate relative flex flex-row justify-between items-center w-full pl-0 pr-4 py-4 text-white overflow-hidden first:bg-[#b0cde3] bg-[#e5e9ea] "
              key={plant.id}
            >
              <div className=" flex-none relative h-full w-1/4">
                <Image
                  src="/../public/p2.png"
                  alt=""
                  objectFit="contain"
                  fill="true"
                />
              </div>

              <div className="mb-2 flex-1 self-start">
                <div className="text-lg font-bold leading-none">
                  {plant.name}
                </div>
                <div className="flex flex-row flex-nowrap">
                  <div className="font-bold uppercase opacity-60  mr-2">
                    water
                  </div>
                  <div className=" font-normal">
                    ~ {plant.wateringVolume} ml
                  </div>
                </div>
              </div>
              <button className="flex-none rounded-full bg-white/30 text-white w-14 h-14">
                check
              </button>
            </li>
          ))}
        </ul>
      </main>
      <nav className="bg-[#f7f8f9] border-slate-200 fixed inset-x-0 bottom-0 p-6 pt-4 border-t">
        <ul className=" flex flex-row justify-around">
          <li>
            <Link href="/">Add</Link>
          </li>
          <li className="text-slate-700 font-bold">
            <Link href="/water">Water</Link>
          </li>
          <li>
            <Link href="/collection">Collection</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

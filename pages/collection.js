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
        <ul className="p-6 space-y-4">
          {plants.map((plant) => (
            <li
              className="rounded-xl border-slate-300 isolate relative flex flex-col justify-between w-full p-8 overflow-hidden bg-gray-200 border"
              key={plant.id}
            >
              <div className=" mb-12 text-2xl font-bold">{plant.name}</div>

              <div className="font-bold uppercase opacity-50">water</div>
              <div className="font-bold uppercase opacity-50">light</div>
              <div className="font-bold uppercase opacity-50">temp</div>
              <div className="-z-10 absolute inset-y-0 right-0 w-2/3 h-full">
                <Image
                  src={plant.image}
                  alt=""
                  objectFit="contain"
                  fill="true"
                />
              </div>
            </li>
          ))}
        </ul>
      </main>
      <nav className="bg-slate-200 border-slate-300 fixed inset-x-0 bottom-0 p-8 border-t">
        <ul className=" flex flex-row justify-around">
          <li>
            <Link href="/">Add</Link>
          </li>
          <li>
            <Link href="/water">Water</Link>
          </li>
          <li className="text-slate-700 font-bold">
            <Link href="/collection">Collection</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

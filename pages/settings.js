import Head from "next/head";
import Link from "next/link";
import BackIcon from "./components/icons/back";
import DropIcon from "./components/icons/drop";
import AddIcon from "./components/icons/add";
import PlantIcon from "./components/icons/plant";
import { motion } from "framer-motion";
import SettingsItem from "./settings/settingsItem";
import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";

export default function Collection() {
  const [week, setWeek] = useState([
    { day: "Mon", isSet: true },
    { day: "Tue", isSet: false },
    { day: "Wen", isSet: false },
    { day: "Thu", isSet: false },
    { day: "Fri", isSet: true },
    { day: "Sat", isSet: false },
    { day: "Sun", isSet: false },
  ]);
  const [settingsOptions, setSettingsOptions] = useState([
    { name: "set reminders", state: false, type: "radio" },
    {
      name: "username",
      state: "",
      type: "text",
    },
    { name: "time", state: "09:20", type: "time" },
    { name: "water spraying", state: true, type: "radio" },
    { name: "plant food", state: false, type: "radio" },
    { name: "leaves cleaning", state: false, type: "radio" },
    { name: "plant age", state: true, type: "radio" },
  ]);
  const initUser = async () => {
    if (typeof window !== "undefined") {
      const initU = localStorage.getItem("username");
      const user = await JSON.parse(initU);
      console.log(user, "init");
      setSettingsOptions(
        settingsOptions.map((day) => {
          if ("username" == day.name) {
            day.state = user;
            return day;
          } else {
            return day;
          }
        })
      );
    }
  };

  useEffect(() => {
    initUser();
  }, []);
  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(settingsOptions[1].state));
    console.log(settingsOptions[1].state, "sync");
  }, [settingsOptions]);
  const onItemChange = (itemName, newValue) => {
    setSettingsOptions(
      settingsOptions.map((day) => {
        if (itemName == day.name) {
          day.state = newValue;
          return day;
        } else {
          return day;
        }
      })
    );
  };
  const toggleDay = (index) => {
    setWeek(
      week.map((day, currentDayIndex) => {
        if (currentDayIndex == index) {
          day.isSet = !day.isSet;
          return day;
        } else {
          return day;
        }
      })
    );
  };
  return (
    <div className="">
      <Head>
        <title>Collection</title>
        <meta name="description" content="Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="w-full flex justify-start p-6 pb-0">
          <Link href="/water">
            <BackIcon className="w-8 h-8 text-slate-400" />
          </Link>
        </div>
        <header className="flex flex-row justify-between items-baseline pt-2 px-6 font-bold">
          <h1 className="text-3xl">Settings</h1>
        </header>

        <ul className="p-6 pt-8 divide-y mb-24 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-start overflow-hidden">
          <div className="w-screen mr-8 -ml-6">
            <h4 className="uppercase ml-6 text-sm tracking-wider text-slate-400 font-bold ">
              Water days
            </h4>
            <ul className="flex flex-row my-4 tracking-wider overflow-x-scroll pb-2">
              {week.map((day, index) => (
                <li
                  key={index + "day"}
                  onClick={() => toggleDay(index)}
                  className={`px-5 py-3 rounded-lg uppercase text-xs font-bold mr-6 flex justify-center items-center first:ml-6 transition-colors ${
                    day.isSet
                      ? "bg-slate-700 text-slate-200"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {day.day}
                </li>
              ))}
            </ul>
          </div>
          {settingsOptions.map((option) => (
            <SettingsItem
              key={option.name}
              state={option.state}
              type={option.type}
              onChange={onItemChange}
            >
              {option.name}
            </SettingsItem>
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

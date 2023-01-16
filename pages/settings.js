import Head from "next/head";
import Link from "next/link";
import BackIcon from "./components/icons/back";
import DropIcon from "./components/icons/drop";
import AddIcon from "./components/icons/add";
import PlantIcon from "./components/icons/plant";
import { motion } from "framer-motion";
import SettingsItem from "./settings/settingsItem";
import { useEffect, useState } from "react";
import { addNewUser } from "./api/fetchPlants";

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
    { name: "username", state: "lalatest", type: "text" },
    { name: "time", state: "09:20", type: "time" },
    { name: "water spraying", state: true, type: "radio" },
    { name: "plant food", state: false, type: "radio" },
    { name: "leaves cleaning", state: false, type: "radio" },
    { name: "plant age", state: true, type: "radio" },
  ]);

  const initUser = () => {
    if (typeof window !== "undefined") {
      const initU = localStorage.getItem("username");
      const user = JSON.parse(initU);
      onItemChange("username", user);
    }
  };

  useEffect(() => {
    initUser();
    return () => {
      addNewUser(settingsOptions[1].state);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(settingsOptions[1].state));
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
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Settings" />
        <meta name="theme-color" content="#92bf80" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#79a367" />
        <link rel="apple-touch-icon" href="/favicon-touch.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon.png" />
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
    </>
  );
}

import Head from "next/head";
import Link from "next/link";
import BackIcon from "../components/icons/back";
import SettingsItem from "../components/settings/settingsItem";
import { useEffect, useState } from "react";
import { addNewUser } from "../api/fetchPlants";

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
      </Head>

      <div className="w-full flex justify-start p-6 pb-0">
        <Link href="/water">
          <BackIcon className="w-8 h-8 text-slate-400" />
        </Link>
      </div>
      <header className="flex flex-row justify-between items-baseline pt-2 px-6 font-bold">
        <h1 className="text-3xl">Settings</h1>
        {
          //TODO compare to original design
        }
      </header>

      <ul className="p-6 pt-8 divide-y grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-1 md:gap-x-8 lg:gap-x-0  justify-items-start overflow-hidden">
        <div className="w-screen lg:w-[375px] mr-8 -ml-6 md:col-span-2 lg:col-span-1 md:mb-4">
          <h4 className="uppercase ml-6 text-sm tracking-wider text-slate-400 font-bold ">
            Water days
          </h4>
          <ul className="scroll-thin flex flex-row my-4 tracking-wider overflow-x-auto pb-2">
            {week.map((day, index) => (
              <li
                key={index + "day"}
                onClick={() => toggleDay(index)}
                className={`px-5 py-3 rounded-lg uppercase text-xs font-bold mr-6 flex justify-center items-center first:ml-6 transition-colors ${
                  day.isSet
                    ? "bg-slate-600 text-slate-200"
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
    </>
  );
}

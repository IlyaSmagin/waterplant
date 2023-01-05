import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import CheckIcon from "../components/icons/check";
import { useState } from "react";

export default function SettingsItem({
  type = "radio",
  checked = false,
  children,
}) {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <li
      className={
        "pr-4 pl-0 py-4 w-full overflow-hidden h-full flex flex-row justify-between items-center"
      }
    >
      <div className="uppercase text-sm text-slate-400 font-bold flex-none relative">
        {children}
      </div>

      <button className="flex-none flex justify-center items-center rounded-full bg-white/30 text-white">
        {type == "radio" ? (
          <label
            for={children + "toggle"}
            class="flex cursor-pointer select-none items-center"
          >
            <div class="relative">
              <input
                type="checkbox"
                id={children + "toggle"}
                class="sr-only peer"
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
              />
              <div class="block h-8 w-14 rounded-full bg-slate-300 peer-checked:bg-slate-700 transition-colors"></div>
              <div class="peer-checked:translate-x-full absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"></div>
            </div>
          </label>
        ) : (
          <div className="text-slate-500">09:20</div>
        )}
      </button>
    </li>
  );
}

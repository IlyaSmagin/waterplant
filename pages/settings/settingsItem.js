export default function SettingsItem({
  type = "radio",
  state = false,
  onChange,
  children,
}) {
  return (
    <li
      className={
        "pr-4 pl-0 py-4 w-full overflow-hidden h-full flex flex-row justify-between items-center"
      }
    >
      <div className="uppercase text-sm text-slate-400 font-bold flex-none relative tracking-wider">
        {children}
      </div>

      <button className="flex-none flex justify-center items-center rounded-full bg-white/30 text-white">
        {type == "radio" ? (
          <label
            htmlFor={children + "toggle"}
            className="flex cursor-pointer select-none items-center"
          >
            <div className="relative">
              <input
                type="checkbox"
                id={children + "toggle"}
                className="sr-only peer"
                checked={state}
                onChange={() => onChange(children, !state)}
              />
              <div className="block h-8 w-14 rounded-full bg-slate-300 peer-checked:bg-slate-700 transition-colors"></div>
              <div className="peer-checked:translate-x-full absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"></div>
            </div>
          </label>
        ) : type == "time" ? (
          <input
            className="text-slate-500 text-right"
            type={type}
            id={children + "time"}
            onChange={(e) => onChange(children, e.target.value)}
          />
        ) : (
          <input
            className="text-slate-500 text-right" //TODO remove focus outline and add bottom gray border
            type={type}
            id={children + "text"}
            onChange={(e) => onChange(children, e.target.value)}
            placeholder={state}
          />
        )}
      </button>
    </li>
  );
}

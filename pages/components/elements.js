// https://play.tailwindcss.com/hxdhRBdHHO

export default function Elements() {
  return (
    <>
      {/* Toggle */}
      <label
        for="default-toggle"
        class="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          value=""
          id="default-toggle"
          class="sr-only peer"
        />
        <div class="w-11 h-6 bg-[#e5e9ea] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-[] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#485256]"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Toggle me {2 + 2}
        </span>
      </label>
      <br />
      {/* Add */}
      <button class="w-11 h-11 rounded-full bg-[#485256] ">
        {/* plus svg */}
      </button>
      <br />
      {/* filter */}
      <ul class="w-full flex flex-row justify-around border-b-2 border-b-slate-300">
        <li className="relative flex flex-col items-center justify-center">
          <input
            type="radio"
            id="water"
            name="hosting"
            value="water"
            className="peer/water checked:w-1.5 checked:h-1.5 bg-slate-600 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
          />
          <label
            for="water"
            className="peer-checked/water:text-slate-600 peer-checked/water:font-bold text-slate-500 flex items-center justify-between w-full p-3 cursor-pointer"
          >
            <div class="block">
              <div class="w-full">Water</div>
            </div>
          </label>
        </li>
        <li className="relative flex flex-col items-center justify-center">
          <input
            type="radio"
            id="size"
            name="hosting"
            value="size"
            className="peer/size checked:w-1.5 checked:h-1.5 bg-slate-600 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
          />
          <label
            for="size"
            className="peer-checked/size:text-slate-600 peer-checked/size:font-bold text-slate-500 flex items-center justify-between w-full p-3 cursor-pointer"
          >
            <div class="block">
              <div class="w-full">Size</div>
            </div>
          </label>
        </li>
        <li className="relative flex flex-col items-center justify-center">
          <input
            type="radio"
            id="difficulty"
            name="hosting"
            value="difficulty"
            className="peer/difficulty checked:w-1.5 checked:h-1.5 bg-slate-600 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
          />
          <label
            for="difficulty"
            className="peer-checked/difficulty:text-slate-600 peer-checked/difficulty:font-bold text-slate-500 flex items-center justify-between w-full p-3 cursor-pointer"
          >
            <div class="block">
              <div class="w-full">Difficulty</div>
            </div>
          </label>
        </li>
        <li className="relative flex flex-col items-center justify-center">
          <input
            type="radio"
            id="light"
            name="hosting"
            value="light"
            className="peer/light checked:w-1.5 checked:h-1.5 bg-slate-600 -bottom-1 absolute w-0 h-0 rounded-full appearance-none"
          />
          <label
            for="light"
            className="peer-checked/light:text-slate-600 peer-checked/light:font-bold text-slate-500 flex items-center justify-between w-full p-3 cursor-pointer"
          >
            <div class="block">
              <div class="w-full">Light</div>
            </div>
          </label>
        </li>
      </ul>
      <br />
      {/* Search */}
      <form class="flex items-center ">
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="relative w-full">
          <div class="flex absolute inset-y-0 left-4 items-center pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            class="placeholder:text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:outline-slate-500 block w-full pl-10 p-2.5 "
            placeholder="Search"
          />
        </div>
      </form>
      {/*  */}

      <br />
    </>
  );
}

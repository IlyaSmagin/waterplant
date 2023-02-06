import Link from "next/link";
import Head from "next/head";
import DropIcon from "./components/icons/drop";
import AddIcon from "./components/icons/add";
import PlantIcon from "./components/icons/plant";
import "../styles/globals.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="theme-color" content="#bdd5e8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#79a367" />
        <link rel="apple-touch-icon" href="/favicon-touch.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon.png" />
      </Head>
      <aside className="hidden lg:grid w-screen h-screen absolute -z-10 grid-cols-4 grid-rows-6 gap-12">
        {" "}
        <h1 className="col-start-3 row-start-2 font-bold text-5xl text-slate-600">
          plants
          <br />
          need
          <br /> water
        </h1>{" "}
        <section className="col-start-3 row-start-4 col-span-2 font-semibold text-3xl text-slate-600">
          <h2 className="mb-4">Colors</h2>
          <div className="flex flex-row gap-4 flex-start items-center text-sm font-bold">
            <div className="group w-20 h-20 rounded-3xl border-[5px] border-slate-600 bg-[#79a367] select-all">
              <div className="duration-300 w-full h-full opacity-0 flex justify-center items-center group-hover:opacity-100 transition-opacity">
                #79a367
              </div>
            </div>
            <div className="group w-20 h-20 rounded-3xl border-[5px] border-slate-600 bg-[#8fbcc5] select-all">
              <div className="duration-300 w-full h-full opacity-0 flex justify-center items-center group-hover:opacity-100 transition-opacity">
                #8fbcc5
              </div>
            </div>
            <div className="group w-20 h-20 rounded-3xl border-[5px] border-slate-600 bg-[#b0cde3] select-all">
              <div className="duration-300 w-full h-full opacity-0 flex justify-center items-center group-hover:opacity-100 transition-opacity">
                #b0cde3
              </div>
            </div>
            <div className="group w-20 h-20 rounded-3xl border-[5px] border-slate-600 bg-[#e5e9ea] select-all">
              <div className="duration-300 w-full h-full opacity-0 flex justify-center items-center group-hover:opacity-100 transition-opacity">
                #e5e9ea
              </div>
            </div>
          </div>
        </section>
      </aside>
      <div className="w-full h-full lg:w-auto lg:h-auto lg:aspect-[375/812] lg:max-w-[375px] lg:max-h-[812px] absolute isolate lg:left-[14vw] lg:inset-y-8 lg:my-auto bg-white lg:ring-8 lg:ring-slate-600 lg:rounded-3xl lg:overflow-hidden">
        <main className="pb-20 h-screen lg:h-full overflow-y-auto relative scroll-thin">
          <Component {...pageProps} />
        </main>
        <nav className="bg-[#f7f8f9] border-slate-200 fixed lg:absolute inset-x-0 bottom-0 p-6 pt-4 border-t">
          <ul className=" flex flex-row justify-around text-slate-500">
            <li
              className={
                router.pathname == "/" ? "text-slate-900 font-bold" : ""
              }
            >
              <Link href="/">
                <AddIcon />
              </Link>
            </li>
            <li
              className={
                router.pathname == "/water" ? "text-slate-900 font-bold" : ""
              }
            >
              <Link href="/water">
                <DropIcon />
              </Link>
            </li>
            <li
              className={
                router.pathname == "/collection"
                  ? "text-slate-900 font-bold"
                  : ""
              }
            >
              <Link href="/collection">
                <PlantIcon />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default MyApp;

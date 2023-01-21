import Link from "next/link";
import Head from "next/head";
import DropIcon from "./components/icons/drop";
import AddIcon from "./components/icons/add";
import PlantIcon from "./components/icons/plant";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
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
        <h1 className="col-start-3 row-start-2 font-bold text-5xl">
          plants
          <br />
          need
          <br /> water
        </h1>{" "}
      </aside>
      <div className="w-full h-full lg:w-[375px] lg:h-[812px] absolute isolate lg:left-[10vw] lg:inset-y-0 lg:my-auto bg-white lg:border-4 lg:rounded-3xl lg:overflow-hidden">
        <main className="pb-20 h-screen lg:h-full overflow-y-auto relative scroll-thin">
          <Component {...pageProps} />
        </main>
        <nav className="bg-[#f7f8f9] border-slate-200 fixed lg:absolute inset-x-0 bottom-0 p-6 pt-4 border-t">
          <ul className=" flex flex-row justify-around text-slate-500">
            <li
              className={
                Component.name == "Home" ? "text-slate-900 font-bold" : ""
              }
            >
              <Link href="/">
                <AddIcon />
              </Link>
            </li>
            <li
              className={
                Component.name == "Water" ? "text-slate-900 font-bold" : ""
              }
            >
              <Link href="/water">
                <DropIcon />
              </Link>
            </li>
            <li
              className={
                Component.name == "Collection" ? "text-slate-900 font-bold" : ""
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

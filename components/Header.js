import Image from "next/image";
import text from "../images/text.svg";
import logo from "../images/logo.svg";
import msg from "../images/messenger.svg";
import comp from "../images/compass.svg";
import {
  HeartIcon,
  MenuIcon,
  PlusCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  //   const [colour, setColour] = useState("bg-white");
  return (
    <div className=" shadow-sm border-b bg-white sticky top-0 h-[70px] z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image src={text} layout="fill" objectFit="contain" />
        </div>
        <div
          onClick={() => router.push("/")}
          className=" relative w-10 h-10 mt-3 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image src={logo} layout="fill" objectFit="contain" />
        </div>
        {/* middle (search) */}
        <div className="hidden md:inline-block relative mt-1 p-3 rounded-sm ">
          <div className=" absolute inset-y-0 pl-3 flex items-center pointer-events-none ">
            <SearchIcon className="h-3 w-3 text-gray-500 " />
          </div>
          <input
            className="bg-gray-50 block w-full pl-8 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-sm"
            type="text"
            placeholder="Search"
          />
        </div>
        {/* right */}
        <div className="flex justify-end space-x-4 items-center">
          <div className={`${!session && "mt-[12px] md:mt-0"}`}>
            <HomeIcon onClick={() => router.push("/")} className="navBtn" />
          </div>
          {session ? (
            <>
              <div className="relative navBtn mt-10">
                <div className="relative h-5 w-5 -mt-[18px] md:inline-flex cursor-pointer">
                  <Image src={msg} layout="fill" objectFit="contain" />
                </div>
                <div
                  className="absolute -top-6 -right-1.5 text-xs w-5 h-5 bg-red-500 rounded-full flex  justify-center
         text-white"
                >
                  <p className="mt-[2px]">3</p>
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <div className="relative font-bold h-5 w-5  md:inline-flex cursor-pointer">
                <Image src={comp} layout="fill" objectFit="contain" />
              </div>
              <HeartIcon className="navBtn" />

              <img
                onClick={signOut}
                src={session?.user?.image}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt=""
              />
            </>
          ) : (
            <button className="mt-3 md:mt-0" onClick={signIn}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

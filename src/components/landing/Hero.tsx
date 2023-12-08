import React, { useEffect, useState } from "react";

import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
// import { UserAuth } from "@/context/authContext";

function Hero() {
  // const { user, googleSignIn } = UserAuth();
  const [loading, setLoading] = useState(true);

  // const handleSignIn = async () => {
  //   try {
  //     await googleSignIn();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 50));
  //     setLoading(false);
  //   };
  //   checkAuthentication();
  // }, [user]);

  return (
    <div className="flex m-16 mt-20 -mb-6 mx-24 gap-8 items-center">
      <div className="flex flex-col flex-1 gap-6 ">
        <p className="w-[35rem] text-[3.2rem] font-extrabold leading-normal text-zinc-200 ">
          Automation tooling for Web3 with Pipechain!
        </p>
        <p className=" w-[90%] text-xl font-medium leading-relaxed text-neutral-400 tracking-wide">
          Integrate your cruicial work apps into workflows, reclaim your time,
          and focus on impactful work.
        </p>
        {/* <button
          className="text-white my-4 flex items-center text-xl font-bold py-4 rounded-3xl px-28 w-fit
          bg-gradient-to-r from-blue-500 to-purple-500
         transform 
                 shadow-xl           transition duration-500 hover:scale-110 cursor-pointer"
        >
          <span className="flex w-full bg-gray-900 text-white rounded p-2">
            Launch App
          </span>

          <img
            width={30}
            height={30}
            className="ml-4 rotate-[23deg] animate-waving-hand "
            src={"/finger.png"}
            alt={"launch app"}
          />
        </button> */}
        <Link to={'/app'}>
        <button className="bg-gradient-to-r from-teal-400  to-blue-800 text-white rounded-3xl  font-semibold p-1 w-fit ">
          <span className="flex items-center text-center justify-center w-fit bg-slate-950 text-white text-xl font-bold rounded-3xl  p-3 px-28">
            Launch App
            <img
            width={30}
            height={30}
            className="ml-4 rotate-[23deg] animate-waving-hand "
            src={"/finger.png"}
            alt={"launch app"}
          />
          </span>
          
        </button>
        </Link>
        {/* {loading ? null : !user ?  (
          <button
            onClick={handleSignIn}
            className="text-white my-4 flex items-center text-xl font-bold py-4 rounded-3xl px-28 bg-teal-400 transform 
                   shadow-xl transition duration-500 hover:scale-110 cursor-pointer w-fit"
          >
            Login
            <Image
              width={30}
              height={30}
              className="ml-4 rotate-[23deg] animate-waving-hand "
              src={"/finger.png"}
              alt={"launch app"}
            />
          </button>
        ):
        <Link href={"/home"}>
        <button
          className="text-white my-4 flex items-center text-xl font-bold py-4 rounded-3xl px-28 bg-teal-400 transform 
                 shadow-xl           transition duration-500 hover:scale-110 cursor-pointer"
        >
          Launch App
          <Image
            width={30}
            height={30}
            className="ml-4 rotate-[23deg] animate-waving-hand "
            src={"/finger.png"}
            alt={"launch app"}
          />
        </button>
      </Link>
        } */}
      </div>
      <div className="flex w-[50rem] -mt-10 h-[40rem] justify-end">
        <img src="/hero.png" alt={"hero"} />
      </div>
    </div>
  );
}

export default Hero;

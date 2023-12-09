import React, { useState } from "react";
import { Link } from "react-router-dom";

function Features2() {
  return (
    <div className=" ">
      <div className="flex flex-col my-16 mx-16 gap-16 items-center ">
        <div>
          <p className="w-[35rem] mr-24 text-[3.2rem] text-center font-extrabold leading-normal tracking-wide text-zinc-200">
            The Power of{" "}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              ZK{" "} 
            </span>
            And
          </p>
          <p className="w-[41rem] ml-40 text-[3.2rem] text-center font-extrabold leading-normal text-zinc-200">
        
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Cross-chain{" "}
            </span>{" "}
            Together
          </p>
        </div>
        <img
          src="/automation.gif"
          alt={"automation"}
          width="1500"
          height="200"
        />
      </div>
    </div>
  );
}

export default Features2;

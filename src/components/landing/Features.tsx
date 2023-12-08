import React, { useState } from "react";
import { Link } from "react-router-dom";

function Features() {
  return (
    <div className="mt-24 
    bg-gradient-to-r from-teal-500/20 to-blue-500/20
      ">
    <div className="flex m-16 mx-40 my-40 gap-10 items-center justify-center text-white">
      <div
        className="flex flex-col items-center gap-4 bg-blue-900 p-8 shadow-xl transform 
                                transition duration-500 hover:scale-110"
      >
        <img src="/feature1.png" alt={"hero"} width="220" height="200" />
        <div className="flex flex-col items-center gap-1">
          <span className="whitespace-nowrap text-xl font-bold">Easy Automation</span>
          <span className="text-md font-medium text-center">
            Easy usage and ux
          </span>
        </div>
      </div>
      <div
        className="flex flex-col items-center gap-4 bg-teal-500 p-8 transform shadow-xl
                                transition duration-500 hover:scale-110"
      >
        <img src="/feature2.png" alt={"hero"} width="200" height="200" />
        <div className="flex flex-col items-center justify-center gap-1">
          <span className=" whitespace-nowrap text-xl font-bold">Custom Workflow</span>
          <span className="text-md font-medium text-center">
            Automate the busy work
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 bg-yellow-500 p-8 transform shadow-xl
                                transition duration-500 hover:scale-110">
              <div className=" w-fit h-fit flex items-center justify-center overflow-hidden">
        <img src="/feature3.png" alt={"hero"} width="110" height="150"/>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className=" whitespace-nowrap text-xl font-bold">Connect apps</span>
          <span className="text-md font-medium text-center">
            Support of a wide range of apps
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 bg-orange-500 p-8 transform shadow-xl
                                transition duration-500 hover:scale-110">
        <img src="/feature4.png" alt={"hero"} width="160" height="200" />
        <div className="flex flex-col items-center gap-1">
          <span className="whitespace-nowrap text-xl font-bold">Transparent and Safe</span>
          <span className="text-md font-medium text-center">
            On- chain trust and safety
          </span>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Features;

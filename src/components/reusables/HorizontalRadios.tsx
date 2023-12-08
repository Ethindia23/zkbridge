import React, { useState, ReactNode } from "react";

interface RadioProps {
  label: string;
}

const HorizontalRadios: React.FC<{ radioValues: RadioProps[] }> = ({
  radioValues,
}) => {
  return (
    <div className="flex items-center relative w-full justify-between ">
      <div className="absolute inset-0 flex items-center bottom-6 left-0 w-full ">
        <div className="w-full border-b-4 border-teal-500"></div>
      </div>{" "}
      {/* <div className="flex absolute top-4"> */}
      {radioValues?.map((value) => (
        <Radio label={value.label} />
      ))}
      {/* </div> */}
    </div>
  );
};

const Radio: React.FC<RadioProps> = ({ label }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="bg-black dark:bg-black rounded-full w-6 h-6 flex flex-shrink-0 justify-center items-center relative">
        <input
          aria-labelledby="label1"
          checked
          type="radio"
          name="radio"
          className="checkbox appearance-none focus:opacity-100 focus:ring-2
           focus:bg-teal-500 focus:ring-offset-black focus:ring-offset-2 focus:ring-teal-500 focus:outline-none border-2 
           rounded-full border-teal-500
           absolute cursor-pointer w-full h-full checked:border-none"
        />
        <div className="check-icon hidden border-4 border-teal-500 rounded-full w-full h-full z-1"></div>
      </div>
      <label
        id="label1"
        className="ml-2 text-sm leading-4 font-[700] text-zinc-200 dark:text-gray-100"
      >
        {label}
      </label>
    </div>
  );
};

export { HorizontalRadios };

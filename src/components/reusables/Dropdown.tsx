import React, { useState } from "react";

export interface DropdownValues {
  id: number;
  value: number | string;
  title: string;
  icon?: any;
  function?: () => void;
}

export function Dropdown({dropdownValues}:{dropdownValues: DropdownValues[]}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {dropdownValues?.map((value: DropdownValues) => (
        <div className="flex gap-2 rounded-md hover:bg-slate-300/40 w-full p-1 cursor-pointer"
        onClick={value?.function}
        >
          {!!value?.icon && (
            <img src={value?.icon} alt={"hero"} />
          )}
            {!!value?.title && (
           <span className="text-base font-[700]">{value?.title}</span>
          )}
        </div>
      ))}
    </div>
  );
}

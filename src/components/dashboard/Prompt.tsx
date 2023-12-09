import React, { useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

export interface PromptValue {
  note: string;
  onSubmit:()=>void;
  onCancel:()=>void;
}

export function Prompt({ note,onSubmit,onCancel }: PromptValue) {
  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] backdrop-blur-sm bg-black/20">
    <div className="flex flex-col gap-4 absolute z-50  top-[30%] left-[28%]  w-[40rem] p-6 py-6
    
    shadow-3xl bg-slate-900
              text-zinc-200 ">
      <span className="text-lg text-zinc-200 font-semibold underline underline-offset-4">Your private note</span>
      <span onClick={()=>onCancel()} className="absolute right-3 top-3 cursor-pointer"><RxCross2 color="gray" size={22}/></span>
      <span className="text-base font-[500] text-zinc-200">
        Please keep a note of your private key. You will need it later to
        withdraw your deposit back. Treat your note as a private key- never
        share with anyone.
      </span>
      <span className="text-base font-[500] text-teal-500 flex gap-2 items-center cursor-pointer">{note}
      <span   onClick={() => {
            navigator.clipboard.writeText(note || "");
          }}><BiCopyAlt color="rgb(20 184 166)" size={20} /></span>
      </span>
      <button onClick={()=>onSubmit()} className="flex items-center justify-center text-white text-lg rounded-md w-full py-4 bg-teal-600 font-semibold p-1  ">
       Send Deposit
        {/* <Spinner/> */}
      </button>
    </div>
     </div>
  );
}

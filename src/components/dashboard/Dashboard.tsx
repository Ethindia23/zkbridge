import React, { useState } from "react";
// import EthereumSvg from "/ethereum.svg";
// import PolygonSvg from "/polygon.svg";
import { Dropdown, DropdownValues } from "../reusables/Dropdown";
import { IoMdArrowDropdown } from "react-icons/io";
import { HorizontalRadios, Tab, Tabs } from "../reusables";
import { TbInfoSquareFilled } from "react-icons/tb";

export function Dashboard() {
  const handleChainChange = (index: number, value: number) => {
    let newArray = [...toFromChain];
    newArray[index].value = value;
    handleChainDropdownChange(index);
    setToFromChain(newArray);
  };

  
  const dropdownTokenValues: DropdownValues[] = [
    {
      id: 0,
      value: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
      title: "Ether",
      icon: "ethereum.svg",
      function: () => {
        setSelectedTokenId(0);
        setShowTokenDropdown(!showTokenDropdown);
      },
    },
    {
      id: 1,
      value: "0x0000000000000000000000000000000000001010",
      title: "Matic",
      icon: "polygon.svg",
      function: () => {
        setSelectedTokenId(1);
        setShowTokenDropdown(!showTokenDropdown);
      },
    },
  ];
 

  const dropdownChainsFromValues: DropdownValues[] = [
    {
      id: 0,
      value: 11155111,
      title: "Ethereum",
      icon: "ethereum.svg",
      function: () => handleChainChange(0, 0),
    },
    {
      id: 1,
      value: 80001,
      title: "Polygon",
      icon: "polygon.svg",
      function: () => handleChainChange(0, 1),
    },
  ];

  const dropdownChainsToValues: DropdownValues[] = [
    {
      id: 0,
      value: 11155111,
      title: "Ethereum",
      icon: "ethereum.svg",
      function: () => handleChainChange(1, 0),
    },
    {
      id: 1,
      value: 80001,
      title: "Polygon",
      icon: "polygon.svg",
      function: () => handleChainChange(1, 1),
    },
  ];
  const [showTokenDropdown, setShowTokenDropdown] = useState<boolean>(false);
  const [selectedTokenId, setSelectedTokenId] = useState<number>(0);
  const [toFromChain, setToFromChain] = useState([
    { value: 0, showDropdown: false, dropdownValues: dropdownChainsFromValues },

    { value: 0, showDropdown: false, dropdownValues: dropdownChainsToValues },
  ]);

  const amountValues = [

    {label:`10 ${dropdownTokenValues[selectedTokenId].title}`},
    {label:`100 ${dropdownTokenValues[selectedTokenId].title}`},
    {label:`1000 ${dropdownTokenValues[selectedTokenId].title}`},
    {label:`10000 ${dropdownTokenValues[selectedTokenId].title}`}
  ];

  const handleChainDropdownChange = (index: number) => {
    let newArray = [...toFromChain];
    newArray[index].showDropdown = !newArray[index].showDropdown;
    setToFromChain(newArray);
  };
  return (
    <div className="flex flex-col z-10 relative h-[87vh]   self-center w-1/2 mx-auto  my-8 items-center  justify-start  ">
      <Tabs>
        <Tab label="Deposit">
          <div
            className="flex flex-col gap-8 items-start w-full
         
            p-8 shadow-xl backdrop-blur-md backdrop-opacity-90
             justify-start bg-gradient-to-r from-teal-500/20  to-blue-500/20"
          >
            {/* <p className="text-2xl font-bold  text-zinc-200 ">Bidge</p> */}

            <div className="flex gap-3 items-center justify-start w-full self-stretch">
              <div className="flex flex-col gap-1 w-1/2  relative">
                <label className="text-zinc-300 text-base  font-[600]">
                  From
                </label>
                <div
                  className={` ${
                    !!toFromChain[0].showDropdown
                      ? "border-teal-500 outline-none "
                      : null
                  }bg-transparent border flex justify-between w-full items-center cursor-pointer
             border-zinc-500 text-zinc-200 rounded-md p-4 py-3 h-[3.2rem]`}
                  onClick={() => handleChainDropdownChange(0)}
                >
                  <span>
                    {toFromChain[0].dropdownValues[toFromChain[0].value].title}
                  </span>
                  <span className=" flex  ">
                    <IoMdArrowDropdown />
                  </span>
                </div>

                {!!toFromChain[0].showDropdown && (
                  <div
                    className="backdrop-blur-3xl backdrop-opacity-100 justify-start bg-gradient-to-r from-teal-500 
               to-blue-500 z-10
               p-3  h-[6.3rem] flex absolute top-[5.2rem]  w-full rounded-md"
                  >
                    <Dropdown dropdownValues={toFromChain[0].dropdownValues} />
                  </div>
                )}
              </div>
              <div className=" flex self-end mb-2 px-2  bg-transparent border border-zinc-500 text-white rounded-md h-fit">
                &rarr;
              </div>
              <div className="flex flex-col gap-1 w-1/2  relative">
                <label className="text-zinc-300 text-base font-[600]">To</label>
                <div
                  className={` ${
                    !!toFromChain[1].showDropdown
                      ? "border-teal-500 outline-none "
                      : null
                  }bg-transparent border flex justify-between w-full items-center cursor-pointer
             border-zinc-500 text-zinc-200 rounded-md p-4 py-3 h-[3.2rem]`}
                  onClick={() => handleChainDropdownChange(1)}
                >
                  <span>
                    {toFromChain[1].dropdownValues[toFromChain[1].value].title}
                  </span>
                  <span className=" flex  ">
                    <IoMdArrowDropdown />
                  </span>
                </div>

                {!!toFromChain[1].showDropdown && (
                  <div
                    className="backdrop-blur-3xl z-10 backdrop-opacity-100 justify-start bg-gradient-to-r from-teal-500 
               to-blue-500
               p-3  h-[6.3rem] flex absolute top-[5.2rem]  w-full rounded-md"
                  >
                    <Dropdown dropdownValues={toFromChain[1].dropdownValues} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full relative ">
              <label className="text-zinc-300 text-base font-[600]">
                Token
              </label>
              <div
                className={` ${
                  !!showTokenDropdown ? "border-teal-500 outline-none " : null
                } bg-transparent border flex justify-between w-full items-center
             border-zinc-500 text-zinc-200 rounded-md p-4 py-3 h-[3.2rem] cursor-pointer`}
                onClick={() => setShowTokenDropdown(!showTokenDropdown)}
              >
                <span>{dropdownTokenValues[selectedTokenId].title}</span>
                <span className=" flex  ">
                  <IoMdArrowDropdown />
                </span>
              </div>{" "}
              {!!showTokenDropdown && (
                <div
                  className="backdrop-blur-3xl backdrop-opacity-100 justify-start bg-gradient-to-r from-teal-500 
               to-blue-500
               p-3  h-[6.3rem] flex absolute top-[5.2rem] z-10  w-full rounded-md"
                >
                  <Dropdown dropdownValues={dropdownTokenValues} />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className=" flex gap-2 items-center text-zinc-300 text-base font-[600   ">
                Amount <TbInfoSquareFilled color="rgb(20 184 166)" size={20} />
              </label>
              <HorizontalRadios radioValues={amountValues}/>
              {/* <input
                type="number"
                className="w-full bg-transparent border py-4 border-zinc-500 focus:border-teal-500 focus:outline-none  text-zinc-200 rounded-md p-4"
              ></input> */}
            </div>
            <button className=" text-white rounded-md w-full py-4 bg-slate-600 font-semibold p-1  ">
              Send
            </button>
          </div>
        </Tab>
        <Tab label="Withdraw">
          <div
            className="flex flex-col gap-8 items-start w-full
         
            p-8 shadow-xl backdrop-blur-md backdrop-opacity-90
             justify-start bg-gradient-to-r from-teal-500/20  to-blue-500/20"
          >
            {/* <p className="text-2xl font-bold  text-zinc-200 ">Bidge</p> */}

            <div className="flex flex-col gap-1 w-full">
              <label className="flex gap-2 items-center text-zinc-300 text-base font-[600   ">
                Note <TbInfoSquareFilled color="rgb(20 184 166)" size={20} />
              </label>
              <input className="w-full bg-transparent border py-4 border-zinc-500 focus:border-teal-500 focus:outline-none  text-zinc-200 rounded-md p-4"></input>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="  text-zinc-300 text-base font-[600   ">
                Recipient Address
              </label>
              <input className="w-full bg-transparent border py-4 border-zinc-500 focus:border-teal-500 focus:outline-none  text-zinc-200 rounded-md p-4"></input>
            </div>
            <button className=" text-white rounded-md w-full py-4 bg-slate-600 font-semibold p-1  ">
              Send
            </button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

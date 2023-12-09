import React, { useEffect, useState } from "react";
// import EthereumSvg from "/ethereum.svg";
// import PolygonSvg from "/polygon.svg";
import wc from "../../witness_calculator";
import { Dropdown, DropdownValues } from "../reusables/Dropdown";
import { IoMdArrowDropdown } from "react-icons/io";
import { HorizontalRadios, Spinner, Tab, Tabs } from "../reusables";
import { TbInfoSquareFilled } from "react-icons/tb";
import { Prompt } from "./Prompt";
import Tooltip from "../reusables/Tooltip";
import {
  useAccount,
  usePrepareContractWrite,
  useNetwork,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { contractabi, multiChainConfig } from "../../config";
import zkSnark from "snarkjs";
import { ethers } from "ethers";
import { getLogs } from "../../config/contractScript";

const BNToBinary = (n: any) => {
  let r = BigInt(n).toString();
  let prePadding = "";
  let paddingAmount = 256 - r.length;
  for (let i = 0; i < paddingAmount; i++) {
    prePadding += "0";
  }
  return prePadding + r;
};

const randomNo = () => {
  return Math.floor(Math.random() * 9000000000) + 1;

};
export function Dashboard() {
  const handleChainChange = (index: number, value: number) => {
    let newArray = [...toFromChain];
    newArray[index].value = value;
    handleChainDropdownChange(index);
    setToFromChain(newArray);
  };

  const type = {
    11155111: { relayer: true, ccip: true },
    80001: { relayer: true, ccip: true },
    84531: { relayer: true, ccip: false },
    421614: { relayer: true, ccip: false },
    534353: { relayer: true, ccip: false },
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
    {
      id: 2,
      value: "0x0000000000000000000000000000000000001010",
      title: "Base",
      icon: "base.webp",
      function: () => {
        setSelectedTokenId(2);
        setShowTokenDropdown(!showTokenDropdown);
      },
    },
    {
      id: 3,
      value: "0x0000000000000000000000000000000000001010",
      title: "Arbitrum ETH",
      icon: "arbitrum.png",
      function: () => {
        setSelectedTokenId(3);
        setShowTokenDropdown(!showTokenDropdown);
      },
    },
    {
      id: 4,
      value: "0x0000000000000000000000000000000000001010",
      title: "Scroll ETH",
      icon: "scroll.png",
      function: () => {
        setSelectedTokenId(4);
        setShowTokenDropdown(!showTokenDropdown);
      },
    },
  ];

  const dropdownChainsFromValues: DropdownValues[] = [
    {
      id: 0,
      value: 11155111,
      title: "Ethereum Sepolia",
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
    {
      id: 2,
      value: 84531,
      title: "Base Goreli",
      icon: "base.webp",
      function: () => handleChainChange(0, 2),
    },
    {
      id: 3,
      value: 421614,
      title: "Arbitrum Sepolia",
      icon: "arbitrum.png",
      function: () => handleChainChange(0, 3),
    },
    {
      id: 4,
      value: 534353,
      title: "Scroll Alpha Testnet",
      icon: "scroll.png",
      function: () => handleChainChange(0, 4),
    },
  ];

  const dropdownChainsToValues: DropdownValues[] = [
    {
      id: 0,
      value: 11155111,
      title: "Ethereum Sepolia",
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
    {
      id: 2,
      value: 84531,
      title: "Base Goreli",
      icon: "base.webp",
      function: () => handleChainChange(1, 2),
    },
    {
      id: 3,
      value: 421614,
      title: "Arbitrum Sepolia",
      icon: "arbitrum.png",
      function: () => handleChainChange(1, 3),
    },
    {
      id: 4,
      value: 534353,
      title: "Scroll Alpha Testnet",
      icon: "scroll.png",
      function: () => handleChainChange(1, 4),
    },
  ];
  const tooltipContent = {
    amount: "The amount you want to transfer",
    note: "The secret note you got after deposit",
  };
  const [showNotePrompt, setShowNotePrompt] = useState<boolean>(false);
  const [showTokenDropdown, setShowTokenDropdown] = useState<boolean>(false);
  const [showTooltipContent, setShowTooltipContent] = useState<string>("");
  const [commitmentData, setCommitmentData] = useState<BigInt>(BigInt(0));

  //   const [depositDisable, setDepositDisable] = useState<boolean>(true);
  //   const [withdrawDisable, setWithdrawDisable] = useState<boolean>(true);
  const [selectedTokenId, setSelectedTokenId] = useState<number>(0);
  const [note, setNote] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>("");

  const [toFromChain, setToFromChain] = useState([
    { value: 0, showDropdown: false, dropdownValues: dropdownChainsFromValues },

    { value: 0, showDropdown: false, dropdownValues: dropdownChainsToValues },
  ]);

  const amountValues = [
    {
      label: `0.0001 ${dropdownTokenValues[selectedTokenId].title}`,
      value: 0.0001,
      checked: false,
    },
    {
      label: `0.001 ${dropdownTokenValues[selectedTokenId].title}`,
      value: 0.001,
      checked: false,
    },
    {
      label: `0.01 ${dropdownTokenValues[selectedTokenId].title}`,
      value: 0.01,
      checked: false,
    },
    {
      label: `0.1 ${dropdownTokenValues[selectedTokenId].title}`,
      value: 0.1,
      checked: false,
    },
  ];

  console.log(selectedType);
  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();

  const from = toFromChain[0].dropdownValues[toFromChain[0].value].value;
  const to = toFromChain[1].dropdownValues[toFromChain[1].value].value;

  const { config, error } = usePrepareContractWrite({
    address: multiChainConfig[
      (chain?.id || 11155111) as keyof typeof multiChainConfig
    ].address as `0x${string}`,
    abi: contractabi,
    functionName: "deposit",
    args: [
      commitmentData,
      to,
      from,
      from == to,
      selectedType == "ccip",
      selectedType == "relayer",
    ],
  });

  const { write, data: transaction } = useContractWrite(config);
  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: transaction?.hash,
  });
  // write?.();

  /* @ts-ignore */

  useEffect(() => {
    (async ()=>{
      console.log(isSuccess);

      console.log(transaction);
      if(isSuccess){
        setShowNotePrompt(true);
        const interval = setInterval(async function () {
          // method to be executed;
          const logData = await getLogs(transaction?.hash as string,chain?.id || 1115511);
          console.log(logData)
          if(logData?.length)
          clearInterval(interval);

        }, 5000);
       
      
       
      }
     
    })();
   
  }, [isSuccess]);
  const generateProof = async (): Promise<any> => {
    // console.log(`Generating vote proof with inputs: ${input0}, ${input1}`);
    try {
      let signals = {
        secret: BNToBinary(BigInt(randomNo())).split(""),
        nullifier: BNToBinary(BigInt(randomNo())).split(""),
      };
      console.log(signals)
      const buffer = await fetch("/circuits/build/deposit.wasm");
      console.log(buffer);
      const depositWC = await wc(await buffer.arrayBuffer());
      const r = await depositWC.calculateWitness(signals, 0);
      const commitment = r[1];
      const nullifierHash = r[2];
      setCommitmentData(commitment);
      console.log(commitment);
      console.log(nullifierHash);
     

      write?.();

    

      // console.log(response);
    } catch (e) {
      console.log(e);
    }
    // localStorage.setItem('nullifierHash',nullifierHash.toString());
    // localStorage.setItem('commitment',commitment.toString());
    // localStorage.setItem('secret',signals.secret.toString());
    // localStorage.setItem('nullfier',signals.nullifier.toString());

    // console.log(signals);
    // let output = [signals["a"] * signals["b"]];

    // try {
    //   // Generate a proof of the circuit and create a structure for the output signals

    //   // const { proof, publicSignals } = await window.snarkjs.groth16.fullProve(
    //   //   signals,
    //   //   "http://localhost:3000/circuits/build/deposit.wasm",
    //   //   "http://localhost:3000/circuits/build/deposit_0000.zkey"
    //   // );
    //   // // const {  } = await window.snarkjs.wtns.calculate()

    //   // console.log(JSON.stringify(proof, null, 1));
    //   // console.log(publicSignals)

    //   // // Convert the data into Solidity calldata that can be sent as a transaction
    //   // const calldataBlob = await window.snarkjs.groth16.exportSolidityCallData(
    //   //   proof,
    //   //   publicSignals
    //   // );
    //   // const calldata = calldataBlob.split(",");

    //   // console.log(calldata[0]);
    //   // console.log(calldata[1]);
    //   // console.log(parseInt(calldata[1],16))
    //   // // return {
    //   // //   proof: calldata[0],
    //   // //   publicSignals: JSON.parse(calldata[1]),
    //   // // };
    // } catch (err) {
    //   console.log(`Error:`, err);
    //   return {
    //     proof: "",
    //     publicSignals: [],
    //   };
    // }
  };
  const handleChainDropdownChange = (index: number) => {
    let newArray = [...toFromChain];
    newArray[index].showDropdown = !newArray[index].showDropdown;
    setToFromChain(newArray);
  };

  const handleDeposit = () => {
    generateProof();
  };
  return (
    <div
      className={`flex flex-col z-10  h-[87vh]  relative
      self-center w-1/2 mx-auto  my-8 items-center  justify-start   `}
    >
      <Tabs>
        <Tab label="Deposit">
          <div
            className="flex flex-col gap-8 items-start w-full relative
         
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
               p-3  h-[15.5rem] flex absolute top-[5.2rem]  w-full rounded-md"
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
               p-3   h-[15.5rem] flex absolute top-[5.2rem]  w-full rounded-md"
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
               p-3  h-[15.5rem] flex absolute top-[5.2rem] z-10  w-full rounded-md"
                >
                  <Dropdown dropdownValues={dropdownTokenValues} />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full relative">
              <label className=" flex gap-2 items-center text-zinc-300 font-[600] text-base font-[600   ">
                Type
              </label>
              <div className="flex w-1/2">
                <button
                  onClick={() => setSelectedType("relayer")}
                  disabled={
                    !type[
                      toFromChain[0].dropdownValues[toFromChain[0].value]
                        .value as keyof typeof type
                    ].relayer
                  }
                  className={`${
                    selectedType == "relayer" ? "bg-teal-500" : null
                  }
                  ${
                    type[
                      toFromChain[0].dropdownValues[toFromChain[0].value]
                        .value as keyof typeof type
                    ].relayer
                      ? "hover:bg-teal-500"
                      : "bg-slate-600"
                  }
                   flex flex-1 rounded-md rounded-r-none font-semibold justify-center
                 text-zinc-200 p-2 border-2 border-r-0 border-teal-500`}
                >
                  RELAYER
                </button>
                <button
                  onClick={() => setSelectedType("ccip")}
                  disabled={
                    !type[
                      toFromChain[0].dropdownValues[toFromChain[0].value]
                        .value as keyof typeof type
                    ].ccip
                  }
                  className={`${selectedType == "ccip" ? "bg-teal-500" : null} 
                  ${
                    type[
                      toFromChain[0].dropdownValues[toFromChain[0].value]
                        .value as keyof typeof type
                    ].ccip
                      ? "  hover:bg-teal-500  border-teal-500"
                      : "bg-slate-600 border-slate-600"
                  }
                  flex flex-1 border-2   rounded-md rounded-l-none font-semibold justify-center
                 text-zinc-200 p-2 `}
                >
                  CCIP
                </button>
              </div>
              {/* <HorizontalRadios
                radioValues={typeValues}
                onChange={(value: any) => {
                  setSelectedType(value);
                }}
              /> */}
            </div>
            <div className="flex flex-col gap-1 w-full relative">
              <label
                data-tooltip-target="tooltip-hover"
                data-tooltip-trigger="hover"
                className=" flex gap-2 items-center font-[600] text-zinc-300 text-base font-[600   "
              >
                Amount
                <Tooltip message={"Select any predefined value of amount."}>
                  <span
                    className="cursor-pointer"
                    // onMouseLeave={()=>setShowTooltipContent('')}
                    // onMouseEnter={()=>setShowTooltipContent(tooltipContent.amount)}
                  >
                    <TbInfoSquareFilled color="rgb(20 184 166)" size={20} />
                  </span>
                </Tooltip>
              </label>

              <HorizontalRadios
                radioValues={amountValues}
                onChange={(value: any) => {
                  setSelectedAmount(value);
                }}
              />
              {/* <input
                type="number"
                className="w-full bg-transparent border py-4 border-zinc-500 focus:border-teal-500 focus:outline-none  text-zinc-200 rounded-md p-4"
              ></input> */}
            </div>
            <button
              onClick={handleDeposit}
              className="flex items-center justify-center text-white 
            text-lg rounded-md w-full py-4 bg-teal-600 font-semibold p-1  "
            >
             {isLoading?<Spinner/>: 'Deposit'}
              {/* <Spinner/> */}
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
                Note
                <Tooltip
                  message={"This the secret note received during fund deposit"}
                >
                  <TbInfoSquareFilled color="rgb(20 184 166)" size={20} />
                </Tooltip>
              </label>
              <input
                placeholder="Enter the secret note"
                value={note}
                className="w-full bg-transparent border py-4 border-zinc-500
               focus:border-teal-500 focus:outline-none  text-zinc-200 rounded-md p-4"
                onChange={(e) => setNote(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="  text-zinc-300 text-base font-[600   ">
                Recipient Address
              </label>
              <input
                placeholder="Enter the Recipient's address"
                value={recipient}
                className="w-full bg-transparent border py-4
               border-zinc-500 focus:border-teal-500 focus:outline-none 
                text-zinc-200 rounded-md p-4"
                onChange={(e) => setRecipient(e.target.value)}
              ></input>
            </div>
            <button className=" text-white text-lg rounded-md w-full py-4 bg-teal-600 font-semibold p-1  ">
              Withdraw
            </button>
          </div>
        </Tab>
      </Tabs>
      {showNotePrompt && (
        <Prompt
          note="hi its a note"
          onSubmit={() => {}}
          onCancel={() => setShowNotePrompt(false)}
        />
      )}
    </div>
  );
}

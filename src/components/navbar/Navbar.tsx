import React, { useEffect, useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';


import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);
  

  // const { address, isConnected } = useAccount();
  // const oktoConnector = new OktoConnector({
  //   chains: [mainnet],
  //   options: {
  //     projectId: "c63e42ee270545b423495ea9f1a230e6",
  //   },
  // });
  // const { connect } = useConnect({ connector: oktoConnector });

  // const { disconnect } = useDisconnect();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
  return (
    <div className="flex justify-between z-10 relative items-center w-screen px-16 py-4 bg-[#111] border-b-4  border-b-teal-500">
     <Link to={'./'}>
      <div className="flex gap-2 items-center">
        <img src="/logo.png" alt={"logo"} width="40" height="40" />
        <span className="text-sm font-extrabold tracking-wider text-zinc-200">
          ZkBRIDGE
        </span>
      </div>
      </Link>
      <div className="flex gap-8 text-lg font-medium text-neutral-300">
        <span className="cursor-pointer ">About</span>
        <Link to={"/home"}>
          <span className="cursor-pointer">Home</span>
        </Link>
        <span className="cursor-pointer">Contact</span>
        <ConnectButton accountStatus="avatar" />
      </div>
    </div>
  );
}

export default Navbar;

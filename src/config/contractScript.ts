import { ethers, WebSocketProvider } from "ethers";
import { multiChainConfig } from "./chainConfig";

import { contractabi } from "./abi";


const utils = {
    moveDecimalLeft: (str: string, count: number) => {
        let start = str.length - count;
        let prePadding = "";

        while(start < 0){
            prePadding += "0";
            start += 1;
        }

        str = prePadding + str;
        let result = str.slice(0, start) + "." + str.slice(start);
        if(result[0] == "."){
            result = "0" + result;
        }

        return result;
    },
    BN256ToBin: (str: string | number | bigint | boolean) => {
        let r = BigInt(str).toString(2);
        let prePadding = "";
        let paddingAmount = 256 - r.length;
        for(var i = 0; i < paddingAmount; i++){
            prePadding += "0";
        }
        return prePadding + r;
    },
    BN256ToHex: (n: string | number | bigint | boolean) => {
        let nstr = BigInt(n).toString(16);
        while(nstr.length < 64){ nstr = "0" + nstr; }
        nstr = `0x${nstr}`;
        return nstr;
    },
    BNToDecimal: (bn: any) => {
        return BigInt(bn).toString();
    },
    reverseCoordinate: (p: any[]) => {
        let r = [0, 0];
        r[0] = p[1];
        r[1] = p[0];
        return r;
    }
};
// const multiChainConfig = {
//     11155111: {
//         url:"wss://sepolia.infura.io/ws/v3/c80aee92018e439c89d8fc1034798344",
//         address: "0xE8D6a8bFbE3c0D868212E1776C5367e29F7f72f1",
//         name: "Ethereum Sepolia"
//     },
//     80001: {
//         url:"wss://polygon-mumbai.infura.io/ws/v3/c80aee92018e439c89d8fc1034798344",
//         address: "0x884E661c62000CeeE4fEC9FC4f09B9DE5924Dc65",
//         name: "Polygon Mumbai"
//     }
// }

// get transaction parsed events
export async function getLogs(txHash: string, chainId: number) {
    const provider = new ethers.WebSocketProvider(multiChainConfig[chainId as keyof typeof multiChainConfig].url);
    const txReceipt = await provider.getTransactionReceipt(txHash);
    const iFace = new ethers.Interface(contractabi);
    const logs = (txReceipt?.logs as any).map((log:any) => iFace.parseLog(log)).filter((log:any) => log.name === "InitiateDeposit")
    if (logs.length === 0) {
        console.log("No logs found for this transaction");
        return;
    }
    const log = logs[0];
    console.log(log);
    console.log("Key", log.args[0]);
    console.log("chainid", log.args[2]);

    const receiverProvider = new ethers.WebSocketProvider(multiChainConfig[log.args[2] as keyof typeof multiChainConfig].url);
    const receiverContract = new ethers.Contract(multiChainConfig[log.args[2] as keyof typeof multiChainConfig].address, contractabi, receiverProvider);
    const filter = await receiverContract.filters.SuccessfulDeposit(log.args[0]);
    const receiverLogs = await receiverContract.queryFilter(filter);
    console.log("Receiver logs", receiverLogs);
    return receiverLogs;
    
}
// getLogs(txHash, 11155111);


export const withdraw = async (proofString:string, address: any) => {


    try{
      
        const proofElements = JSON.parse(atob(proofString));

        // receipt = await window.ethereum.request({ method: "eth_getTransactionReceipt", params: [proofElements.txHash] });
        // if(!receipt){ throw "empty-receipt"; }

        // const log = receipt.logs[0];
        // const decodedData = tornadoInterface.decodeEventLog("Deposit", log.data, log.topics);
        console.log(proofElements)
        const logs = await getLogs(proofElements.txHash, proofElements.chainId) as any;
        const args = logs[0].args;

        const SnarkJS = window['snarkjs'];

        const proofInput = {
            "root": utils.BNToDecimal(args[2]),
            "nullifierHash": proofElements.nullifierHash,
            "recipient": utils.BNToDecimal(address),
            "secret": utils.BN256ToBin(proofElements.secret).split(""),
            "nullifier": utils.BN256ToBin(proofElements.nullifier).split(""),
            "hashPairings": args[3].map((n: any) => (utils.BNToDecimal(n))),
            "hashDirections": args[4]
        };

        console.log(proofInput, "proofInput");

        const { proof, publicSignals } = await SnarkJS.groth16.fullProve(proofInput, "http://localhost:3000/circuits/build/withdraw.wasm", "http://localhost:3000/circuits/build/wd_0001.zkey");

        const callInputs = [
            proof.pi_a.slice(0, 2).map(utils.BN256ToHex),
            proof.pi_b.slice(0, 2).map((row) => (utils.reverseCoordinate(row.map(utils.BN256ToHex)))),
            proof.pi_c.slice(0, 2).map(utils.BN256ToHex),
            publicSignals.slice(0, 2)
        ];
        return callInputs;

        // const callData = tornadoInterface.encodeFunctionData("withdraw", callInputs);
        // const tx = {
        //     to: tornadoAddress,
        //     from: account.address,
        //     data: callData
        // };
        // const txHash = await window.ethereum.request({ method: "eth_sendTransaction", params: [tx] });

        // var receipt;
        // while(!receipt){
        //     receipt = await window.ethereum.request({ method: "eth_getTransactionReceipt", params: [txHash] });
        //     await new Promise((resolve, reject) => { setTimeout(resolve, 1000); });
        // }

        // if(!!receipt){ updateWithdrawalSuccessful(true); 
    //}
    }catch(e){
        console.log(e);
    }

    // updateWithdrawButtonState(ButtonState.Normal);
};
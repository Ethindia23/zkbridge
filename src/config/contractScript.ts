import { ethers, WebSocketProvider } from "ethers";
import { multiChainConfig } from "./chainConfig";
import { contractabi } from "./abi";
// import abi from "./abi.json";

// FILL IT UP
const txHash = "0xa893c34b65d12eada6b62f63b7a5dad356dc4601155fce50ac225efef883c3c0"; 
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


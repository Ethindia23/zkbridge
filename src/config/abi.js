export const contractabi = 
    [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_commitment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint64",
                    "name": "_srcChainId",
                    "type": "uint64"
                },
                {
                    "internalType": "uint64",
                    "name": "_destChainId",
                    "type": "uint64"
                }
            ],
            "name": "_ccipDeposit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_commitment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint64",
                    "name": "_destChain",
                    "type": "uint64"
                }
            ],
            "name": "_relayerDeposit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_key",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_commitment",
                    "type": "uint256"
                }
            ],
            "name": "_selfDeposit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256[10]",
                    "name": "",
                    "type": "uint256[10]"
                },
                {
                    "internalType": "uint8[10]",
                    "name": "",
                    "type": "uint8[10]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "_chainId",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "_contractAddress",
                    "type": "address"
                }
            ],
            "name": "addCCIPContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "_chainId",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "_contractAddress",
                    "type": "address"
                }
            ],
            "name": "addContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes32",
                            "name": "messageId",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint64",
                            "name": "sourceChainSelector",
                            "type": "uint64"
                        },
                        {
                            "internalType": "bytes",
                            "name": "sender",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "token",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Client.EVMTokenAmount[]",
                            "name": "destTokenAmounts",
                            "type": "tuple[]"
                        }
                    ],
                    "internalType": "struct Client.Any2EVMMessage",
                    "name": "message",
                    "type": "tuple"
                }
            ],
            "name": "ccipReceive",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_commitment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint64",
                    "name": "_srcChain",
                    "type": "uint64"
                },
                {
                    "internalType": "uint64",
                    "name": "_destChain",
                    "type": "uint64"
                },
                {
                    "internalType": "bool",
                    "name": "_self",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "_viaCCIP",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "_viaRelayer",
                    "type": "bool"
                }
            ],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_hasher",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_verifier",
                    "type": "address"
                },
                {
                    "internalType": "uint64",
                    "name": "_chainId",
                    "type": "uint64"
                },
                {
                    "internalType": "uint64",
                    "name": "_ccipChainId",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "_send_router",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_receive_router",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_link",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "router",
                    "type": "address"
                }
            ],
            "name": "InvalidRouter",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "uniqueKey",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "dType",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "destinationChain",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "commitment",
                    "type": "uint256"
                }
            ],
            "name": "InitiateDeposit",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "uniqueKey",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "commitment",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "root",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[10]",
                    "name": "hashPairings",
                    "type": "uint256[10]"
                },
                {
                    "indexed": false,
                    "internalType": "uint8[10]",
                    "name": "pairDirection",
                    "type": "uint8[10]"
                }
            ],
            "name": "SuccessfulDeposit",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256[2]",
                    "name": "a",
                    "type": "uint256[2]"
                },
                {
                    "internalType": "uint256[2][2]",
                    "name": "b",
                    "type": "uint256[2][2]"
                },
                {
                    "internalType": "uint256[2]",
                    "name": "c",
                    "type": "uint256[2]"
                },
                {
                    "internalType": "uint256[2]",
                    "name": "input",
                    "type": "uint256[2]"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "nullifierHash",
                    "type": "uint256"
                }
            ],
            "name": "Withdrawal",
            "type": "event"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "",
                    "type": "uint64"
                }
            ],
            "name": "ccipChainIdToContractMapping",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "",
                    "type": "uint64"
                }
            ],
            "name": "chainIdToContractMapping",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "commitments",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "denomination",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "despositMapping",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "rrotHash",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "funcall",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getRouter",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextLeafIdx",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "nullifierHashes",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "roots",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "treeLevel",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
;
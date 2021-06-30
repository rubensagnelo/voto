var VotingContractInterface = [
    {
    "inputs": [
    {
    "internalType": "string",
    "name": "nomeCandidato",
    "type": "string"
    }
    ],
    "name": "addCandidato",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "address",
    "name": "to",
    "type": "address"
    }
    ],
    "name": "delegate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "finalizarEleicao",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "address",
    "name": "voter",
    "type": "address"
    },
    {
    "internalType": "string",
    "name": "nome",
    "type": "string"
    }
    ],
    "name": "giveRightToVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "iniciarEleicao",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
    },
    {
    "inputs": [
    {
    "internalType": "uint256",
    "name": "proposal",
    "type": "uint256"
    }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "chairperson",
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
    "name": "eleitores",
    "outputs": [
    {
    "internalType": "string",
    "name": "nome",
    "type": "string"
    },
    {
    "internalType": "address",
    "name": "endereco",
    "type": "address"
    },
    {
    "internalType": "uint256",
    "name": "weight",
    "type": "uint256"
    },
    {
    "internalType": "bool",
    "name": "voted",
    "type": "bool"
    },
    {
    "internalType": "address",
    "name": "delegate",
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
    "name": "index",
    "type": "uint256"
    }
    ],
    "name": "getProposal",
    "outputs": [
    {
    "internalType": "string",
    "name": "name",
    "type": "string"
    },
    {
    "internalType": "uint256",
    "name": "voteCount",
    "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "getProposalsCount",
    "outputs": [
    {
    "internalType": "uint256",
    "name": "count",
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
    "name": "index",
    "type": "uint256"
    }
    ],
    "name": "getVoters",
    "outputs": [
    {
    "internalType": "address",
    "name": "voter",
    "type": "address"
    },
    {
    "internalType": "string",
    "name": "nome",
    "type": "string"
    },
    {
    "internalType": "uint256",
    "name": "weight",
    "type": "uint256"
    },
    {
    "internalType": "bool",
    "name": "voted",
    "type": "bool"
    },
    {
    "internalType": "address",
    "name": "delegate",
    "type": "address"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "getVotersCount",
    "outputs": [
    {
    "internalType": "uint256",
    "name": "count",
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
    "name": "proposals",
    "outputs": [
    {
    "internalType": "string",
    "name": "name",
    "type": "string"
    },
    {
    "internalType": "uint256",
    "name": "voteCount",
    "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
    {
    "internalType": "string",
    "name": "source",
    "type": "string"
    }
    ],
    "name": "stringToBytes32",
    "outputs": [
    {
    "internalType": "bytes32",
    "name": "result",
    "type": "bytes32"
    }
    ],
    "stateMutability": "pure",
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
    "name": "voters",
    "outputs": [
    {
    "internalType": "uint256",
    "name": "weight",
    "type": "uint256"
    },
    {
    "internalType": "bool",
    "name": "voted",
    "type": "bool"
    },
    {
    "internalType": "address",
    "name": "delegate",
    "type": "address"
    },
    {
    "internalType": "uint256",
    "name": "vote",
    "type": "uint256"
    },
    {
    "internalType": "string",
    "name": "nome",
    "type": "string"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "winnerName",
    "outputs": [
    {
    "internalType": "string",
    "name": "winnerName_",
    "type": "string"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "winningProposal",
    "outputs": [
    {
    "internalType": "uint256",
    "name": "winningProposal_",
    "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    }
    ]
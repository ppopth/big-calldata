#!/usr/bin/env bash

SOLIDITY_DEPOSIT_CONTRACT_SOURCE=./contract/bytes_contract.sol

solc --bin --abi --overwrite -o build $SOLIDITY_DEPOSIT_CONTRACT_SOURCE

output=$(npm exec deploy-contract -- --endpoint ./local-testnet/data/node1/ethereum/geth.ipc)
address=$(echo "$output" | grep "address" | cut -d ' ' -f 2)

echo "$output"
echo "Deployed the contract at $address"

sleep 12
npm exec update -- --endpoint ./local-testnet/data/node1/ethereum/geth.ipc --address $address --length 2097152

echo "Updated the bytes"

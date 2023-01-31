#!/usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');
const net = require('net');
const Web3 = require('web3');

const argv = yargs
    .option('endpoint', {
        description: 'IPC endpoint of the node which you want to use to create a transaction',
        type: 'string',
        demandOption: true,
        requiresArg: true,
    })
    .option('address', {
        description: 'Contract address',
        type: 'string',
        demandOption: true,
        requiresArg: true,
    })
    .option('length', {
        description: 'Length of the random bytes',
        type: 'string',
        demandOption: true,
        requiresArg: true,
    })
    .help()
    .alias('help', 'h').argv;

(async function() {
    const web3 = new Web3(argv.endpoint, net);
    const accounts = await web3.eth.getAccounts();

    const abi = JSON.parse(fs.readFileSync('./build/BytesContract.abi'));
    const contract = new web3.eth.Contract(abi, argv.address);

    const data = web3.utils.randomHex(parseInt(argv.length));
    const transaction = contract.methods.update(data);
    const receipt = await transaction
        .send({
            from: accounts[0],
            gas: 100000000,
            gasPrice: '147000000000',
        })
        .once('transactionHash', hash => {
            console.log('transaction', hash);
        });
    console.log('block_number', receipt.blockNumber);
    console.log('status', receipt.status);

    process.exit();
})();

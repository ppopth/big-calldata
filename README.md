# Test Ethereum network with big calldata of 2MB

```bash
git clone https://github.com/ppopth/big-calldata-testnet.git
cd big-calldata-testnet
git submodule update --init --depth 1

# Build the customized geth
cd go-ethereum
make geth
cd ..

# Install node modules
npm install
```

Open a new terminal to run a local testnet.

```bash
cd local-testnet
GETH_CMD=../go-ethereum/build/bin/geth ./run.sh
```

Wait until the network fully transition to the Proof-of-Stake. Read https://github.com/ppopth/local-testnet#inspect-the-logs
on how to see if it has transitioned.

After that, open a new terminal and run a script to deploy the contract and send a transaction with a big calldata.

```
./run.sh
```

You should see something similat to the following as the output.

```
Compiler run successful. Artifact(s) can be found in directory "build".
transaction 0xffd5e0144a4f537add5667e724b9723c35c9131267fc8014cb6270bd33034560
block_number 147
address 0x769C72F44508B8F3F4D38492c9689BeB6Dc5Fa88
Deployed the contract at 0x769C72F44508B8F3F4D38492c9689BeB6Dc5Fa88
transaction 0x3c7021f5e82aadabb971a00cf3925d1070f04c92f93e308eb16c559b4948ac45
block_number 152
status true
Updated the bytes
```

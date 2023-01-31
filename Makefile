SOLIDITY_DEPOSIT_CONTRACT_SOURCE = ./contract/bytes_contract.sol

.PHONY: contract
contract:
	@solc --bin --abi --overwrite -o build $(SOLIDITY_DEPOSIT_CONTRACT_SOURCE)

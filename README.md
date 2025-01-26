# Blockchain Bridge Project

## Description

This project implements a bridge between the Sui and Ethereum blockchains, enabling seamless asset transfers and interactions between the two networks. It leverages smart contracts and various blockchain tools to provide a robust and efficient bridge solution.

## Technologies Used

### Backend
- **Sui Blockchain**
    - **Move Language**: For writing smart contracts.
    - **Move.lock**: Dependency management.
- **Ethereum Blockchain**
    - **Solidity**: Smart contract development.
    - **Foundry**: Ethereum development framework.
    - **Forge-Std**: Standard libraries for testing and contract interactions.

## Installation

### Prerequisites
- **Node.js**: Version 16 or higher.
- **npm**: Node package manager.
- **Rust**: Required for Sui and Move development.
- **Foundry**: Ethereum development toolkit.

### Backend Setup

1. **Clone the Repository**
     ```bash
     git clone https://github.com/Rafa2212/IBT.git
     ```

2. **Setup Ethereum Contracts**
     - Install Foundry and Anvil:
         ```bash
         curl -L https://foundry.paradigm.xyz | bash
         foundryup
         ```
     - Compile Contracts:
         ```bash
         forge build
         ```
     - Mint Tokens:
         ```bash
         forge create src/IBTToken.sol:IBTToken --rpc-url http://127.0.0.1:8545 --private-key <YOUR-PRIVATE-KEY> --broadcast --constructor-args 50000000000000000000
         ```

### Backend Services

1. **Navigate to Backend Directory**
     ```bash
     cd web/backend
     ```

2. **Install Dependencies**
     ```bash
     npm install
     ```

3. **Configure Environment Variables**
     - Create a `.env` file and set the necessary variables:
         ```env
         SUI_SEED_PHRASE=your_sui_seed_phrase
         SUI_PACKAGE_OBJECT_ID=your_sui_package_object_id
         SUI_TREASURYCAP_OBJECT_ID=your_sui_treasurycap_object_id
         SUI_DEPLOYER_ADDRESS=your_sui_deployer_address
         ETH_PRIVATE_KEY=your_eth_private_key
         ETH_CONTRACT_ADDRESS=your_eth_contract_address
         ```

4. **Start the Backend Server**
     ```bash
    node index.js
     ```

5. **Start the SUI Client**
     ```bash
     RUST_LOG="off,sui_node=info" sui start --with-faucet --force-regenesis
     sui client faucet
     ```
6. **Start the ETH Client**
     ```bash
    anvil
     ```
7. **Build the SUI Contract**
     ```bash
      sui move build
      sui client publish --gas-budget 100000000
     ```
## Usage

1. **Start Backend Services**
     - Ensure Sui full node and Ethereum node are running.

2. **Interact via Backend**
     - Use the backend services to mint and burn tokens on both Sui and Ethereum blockchains.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

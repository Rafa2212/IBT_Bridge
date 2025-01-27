# Blockchain Bridge Project

## Description

This project implements a bridge between the Sui and Ethereum blockchains, enabling seamless asset transfers and interactions between the two networks. It leverages smart contracts and various blockchain tools to provide a robust and efficient bridge solution with a modern React frontend.

## Technologies Used

### Backend
- **Sui Blockchain**
    - **Move Language**: For writing smart contracts.
    - **Move.lock**: Dependency management.
- **Ethereum Blockchain**
    - **Solidity**: Smart contract development.
    - **Foundry**: Ethereum development framework.
    - **Forge-Std**: Standard libraries for testing and contract interactions.
- **Node.js Backend**
    - **Express**: Web server framework
    - **@mysten/sui.js**: Sui blockchain interaction
    - **ethers.js**: Ethereum blockchain interaction

### Frontend
- **React + TypeScript**
- **Vite**: Build tool and development server
- **Ethers.js**: Ethereum wallet integration
- **Sui Wallet SDK**: Sui wallet integration
- **Axios**: API communication
- **Modern UI with CSS Variables**

## Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: Node package manager
- **Rust**: Required for Sui and Move development
- **Foundry**: Ethereum development toolkit
- **MetaMask**: Ethereum wallet browser extension
- **Sui Wallet**: Sui wallet browser extension

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Rafa2212/IBT.git
cd IBT
```

### 2. Setup Ethereum Contracts
```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Compile Contracts
cd eth
forge build

# Deploy Contract (local network)
forge create src/IBTToken.sol:IBTToken --rpc-url http://127.0.0.1:8545 --private-key <YOUR-PRIVATE-KEY> --broadcast --constructor-args 50000000000000000000
```

### 3. Setup Sui Contract
```bash
# Navigate to Sui directory
cd sui

# Build the contract
sui move build

# Publish the contract
sui client publish --gas-budget 100000000
```

### 4. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your values:
SUI_SEED_PHRASE=your_sui_seed_phrase
SUI_PACKAGE_OBJECT_ID=your_sui_package_object_id
SUI_TREASURYCAP_OBJECT_ID=your_sui_treasurycap_object_id
SUI_DEPLOYER_ADDRESS=your_sui_deployer_address
ETH_PRIVATE_KEY=your_eth_private_key
ETH_CONTRACT_ADDRESS=your_eth_contract_address

# Start the backend server
node index.js
```

### 5. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your values:
VITE_SUI_PACKAGE_ID=your_sui_package_id
VITE_ETH_CONTRACT_ADDRESS=your_eth_contract_address

# Start the development server
npm run dev
```

## Usage

1. **Start Local Blockchain Nodes**
```bash
# Start Anvil (Ethereum)
anvil

# Start Sui
sui client start
```

2. **Start Backend Server**
```bash
cd backend
node index.js
```

3. **Start Frontend Development Server**
```bash
cd frontend
npm run dev
```

4. **Access the Application**
- Open your browser and navigate to `http://localhost:5173`
- Connect your MetaMask and Sui wallets
- Enter the amount you want to bridge
- Choose the direction (ETH → SUI or SUI → ETH)
- Confirm the transactions in your wallets

## Features

- **Wallet Integration**: Seamless connection with MetaMask and Sui Wallet
- **Bidirectional Bridging**: Transfer tokens in both directions
- **Real-time Status Updates**: Transaction progress and confirmation displays
- **Error Handling**: Comprehensive error messages and status feedback
- **Modern UI**: Clean, responsive design with smooth animations
- **Type Safety**: Full TypeScript support throughout the application

## License

This project is licensed under the MIT License. See the LICENSE file for details.

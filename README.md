# Pet Adoption Platform DApp

This project is a decentralized pet adoption platform built using Ethereum blockchain and Solidity smart contracts. It allows users to adopt pets in a transparent and trustless environment.

## Features

- Decentralized pet adoption system
- User registration and sign-in functionality
- Adoption process managed by Ethereum smart contracts
- User-friendly interface

## Installation

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Truffle Suite](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache) for local blockchain development
- [MetaMask](https://metamask.io/) browser extension

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/PetAdoption-DApp.git
   cd PetAdoption-DApp

2. **Install the dependencies**
   ```bash
   npm install

3. **Install Truffle globally**
   ```bash
   npm install -g truffle

4. **Start Ganache**
   - Open Ganache to create local blockchain
   - Connect Metamask to local network of Ganache

5. **Compile the contracts**
   ```bash
   truffle compile

6. **Deploy the contracts**
   ```bash
   truffle migrate

7. **Run the application**
   ```bash
   npm run dev

### Usages
1. Register with your email or sign in using the registration form on the homepage.
2. Browse available pets for adoption.
3. Click the "Adopt" button to adopt a pet. MetaMask will ask for transaction approval.

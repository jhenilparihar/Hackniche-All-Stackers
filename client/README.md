
<h1 align="center"> Stream.it </h1>

 <p align="center">
<img src="https://readme-typing-svg.herokuapp.com?font=monospace&color=92B6FE&size=25&vCenter=true&lines=Issuance+of+Certificate;Appliance+of+Certificate"alt="Verification+of+Certificate">
</p>
</p>
<h3 align="center"> Blockchain based OTT Platform<h3>

<div align="center">
  
 
  [![made-with-react](https://img.shields.io/badge/React-16.8.4-brightgreen.svg?style=for-the-badge)](https://github.com/facebook/create-react-app)
   [![](https://img.shields.io/badge/-Ethereum-lightgrey.svg?style=for-the-badge)](https://www.ethereum.org/)
    ![](https://img.shields.io/badge/Smart%20-Contract-lightgrey.svg?style=for-the-badge)
 ![](https://img.shields.io/github/forks/HarshDilipGhosalkar/E-certo.svg?style=for-the-badge) 
  ![](https://img.shields.io/github/stars/HarshDilipGhosalkar/E-certo.svg?style=for-the-badge) 

 </div>
  
  ## Stream.it : About
- It is a blockchain based project for uploading videos on our OTT platform. 
- It works on the idea that: “User can upload its created content he/she can apply some pay restrictions on it for others to view it". 
- Thus this is a modern way to create Contents and overcomes the drawback of traditional approach of your content being getting malfunctioned.

  
## Insight
- It is D-App on [Ethereum](https://www.ethereum.org/).
- Back-End has Smart Contract 
- Front-end of our Web-App is made with [React.Js](https://github.com/facebook/create-react-app)   

- We are using [Metamask](https://metamask.io/) Browser Extension to work with Ethereum.
- We have used [Truffle](https://www.trufflesuite.com/) for testing our project
  
  
  
  ## How to Use

### Signup/Login
- Connect to metamask
  <p align="center">
 
</p>
  
  
 Upon SignIn the first page that's going to be visible is the Dashboard page.
 ### Dashboard Page
- All the Created contents by the Admin will be listed on the dashboard.
- user can earn through the content created by it.
- Admin can apply multiple filters such as filter by Department,Passout year,SAP.
- User can search for its liked contents.
 <p align="center">
 
</p>  
 
  ### ML/AI in our project
- We implemented recommended system that recommends user music/video based on his/her mood.
- Also implemented a model for nudity detection.
- Searching Functionality has also been successfully implemented.
 
 


 ### user profile/profilr-setting section
- user can view its profile 
- Its also allows user to to change his/her setting.
  
 
#
### Stack
- [Solidity](https://docs.soliditylang.org/en/v0.7.6/) - Object-oriented, high-level language for implementing smart contracts.
- [Bootstrap 4](https://getbootstrap.com/) - CSS framework for faster and easier web development.
- [React.js](https://reactjs.org/) - JavaScript library for building user interfaces.
- [web3.js](https://web3js.readthedocs.io/en/v1.3.4/) - Allows users to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.
- [Truffle](https://www.trufflesuite.com/truffle) - Development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM).
- [Ganache](https://www.trufflesuite.com/ganache) - Personal blockchain for Ethereum development used to deploy contracts, develop DApps, and run tests.
- Django
- AI/ML
- DRF
#
### Interact with the deployed DApp
- Ecertify DApp requires [Metamask](https://metamask.io/) browser wallet extension to interact with.
- Connect metamask browser wallet to Localhost 7545 running a custom RPC like Ganache.

#
### Run the DApp Locally
#### Install truffle
```
npm install -g truffle
```
#### Install ganache-cli
```
npm i ganache-cli
```
#### Run ganache-cli
```
ganache-cli --port 7545
```
#### Open new terminal window and clone this repository
```
[git clone https://github.com/HarshDilipGhosalkar/E-certo.git](https://github.com/jhenilparihar/SPIT-All-Stacker.git)
```
#### Install dependencies
```
cd E-certo
npm install
```
#### Compile smart contract
```
truffle compile
```
#### Deploy smart contract to ganache
```
truffle migrate
```
```
#### Start DApp
```
### npm start

- Open metamask browser wallet and connect network to Localhost 7545.
- Import accounts from ganache-cli into the metamask browser wallet to make transactions on the DApp.
  
### Contributing
- We're are open to enhancements & bug-fixes.
- Feel free to add issues and submit patches.
### Authors
- Harsh Ghosalkar - [HarshDilipGhosalkar](https://github.com/HarshDilipGhosalkar)
- Jhenil Parihar - [JhenilParihar](https://github.com/jhenilparihar)
- prerak gada - [prerak gada](https://github.com/jhenilparihar)
- yash joshi [yash joshi](https://github.com/jhenilparihar)
### License
This project is licensed under the MIT

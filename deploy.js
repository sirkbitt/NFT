//const { ethers } = require("hardhat");

async function main() {
  
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  //console.log("Account balance:", (await deployer.getBalance()).toString());
  // Start deployment, returning a promise that resolves to a contract object
  //const myNFT = await MyNFT.deploy();
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  console.log("Contract deployed to address:", myNFT.address);
  //const ownerBalance = await hardhatToken.balanceOf(owner.address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });
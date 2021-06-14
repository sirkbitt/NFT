//require('dotenv').config();
const PUBLIC_KEY = "{your public wallet address}";
const Private_Key = "{your private key}";
const alchemyApiKey = "https://eth-ropsten.alchemyapi.io/v2/your alchemy's api";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyApiKey);
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json"); 
//console.log(JSON.stringify(contract.abi));
const contractAddress = "{your contract address, put on console after deployment}";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
  
    //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, Private_Key);
    signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log(" Promise failed:", err);
  });
}

mintNFT("https://gateway.pinata.cloud/ipfs/{your nft-metadata.json hash}");
/**
* @type import('hardhat/config').HardhatUserConfig
*/

const { alchemyApiKey, mnemonic } = require('./secrets.json');
require("@nomiclabs/hardhat-ethers");

module.exports = {
   solidity: "0.7.4",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: alchemyApiKey,
         accounts: {mnemonic: mnemonic}
      }
   },
}

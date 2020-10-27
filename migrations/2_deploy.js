const BaseToken = artifacts.require('BaseToken');
const BlokkoOrder = artifacts.require('BlokkoOrder');

require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle' });

const { singletons } = require('@openzeppelin/test-helpers');

module.exports = async function (deployer, network, accounts) {
  if (network === 'development') {
    // In a test environment an ERC777 token requires deploying an ERC1820 registry
    await singletons.ERC1820Registry(accounts[0]);
  }

  await deployer.deploy(BaseToken, "Pleuro", "PLR", 1, "");
  const token = await BaseToken.deployed();

  await deployer.deploy(BlokkoOrder, token.address);
};

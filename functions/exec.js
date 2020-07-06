const axios = require('axios');
const ethers = require('ethers');
const { abis, addresses } = require('../contracts');

exports.handler = async function() {
  console.log('Starting...');
  // Load Contract ABIs
  const DummyStorageABI = abis.DummyStorage;
  const DummyStorageAddress = addresses.DummyStorage;
  console.log('Contract ABIs loaded');

  // Initialize Ethers wallet
  const provider = new ethers.getDefaultProvider(parseInt(process.env.CHAIN_ID))
  let wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
  wallet = wallet.connect(provider)
  console.log('Ethers wallet loaded');

  // Load contract
  const contract = new ethers.Contract(
    DummyStorageAddress,
    DummyStorageABI,
    wallet,
  )
  console.log('Contract loaded');

  console.log('Sending transaction...');
  try {
    // Specify custom tx overrides, such as gas price https://docs.ethers.io/ethers.js/v5-beta/api-contract.html#overrides
    const overrides = { gasPrice: process.env.DEFAULT_GAS_PRICE };

    // Call smart contract function `put(uint)`
    const RANDOM_INTEGER = Math.floor(Math.random() * 100); // returns a random integer from 0 to 99
    const tx = await contract.put(RANDOM_INTEGER, overrides)

    const successMessage = `:white_check_mark: Transaction sent https://ropsten.etherscan.io/tx/${tx.hash}`;
    console.log(successMessage)
    await postToSlack(successMessage);
  } catch (err) {
    const errorMessage = `:warning: Transaction failed: ${err.message}`;
    console.error(errorMessage)
    await postToSlack(errorMessage);
    return err;
  }

  console.log('Completed');
  return true;
}

function postToSlack(text) {
  const payload = JSON.stringify({ 
    text,
  });
  return axios.post(process.env.SLACK_HOOK_URL, payload)
}
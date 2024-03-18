// stellarUtils.js

const StellarSdk = require('stellar-sdk');

// Initialize StellarSdk with Horizon server
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

/**
 * Retrieves the account information for a given Stellar address.
 * @param {string} publicKey - The public key of the Stellar account.
 * @returns {Promise} A promise that resolves with the account information.
 */
async function getAccountInfo(publicKey) {
  try {
    return await server.loadAccount(publicKey);
  } catch (error) {
    throw new Error(`Error loading account info: ${error}`);
  }
}

/**
 * Sends a payment from one Stellar account to another.
 * @param {string} sourceSecretKey - The secret key of the sender account.
 * @param {string} destinationPublicKey - The public key of the recipient account.
 * @param {string} amount - The amount to send.
 * @param {string} assetType - The type of asset (e.g., "XLM").
 * @returns {Promise} A promise that resolves when the payment is successful.
 */
async function sendPayment(sourceSecretKey, destinationPublicKey, amount, assetType = 'XLM') {
  try {
    const sourceKeys = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: destinationPublicKey,
        asset: StellarSdk.Asset.native(),
        amount: amount.toString(),
      }))
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeys);

    return await server.submitTransaction(transaction);
  } catch (error) {
    throw new Error(`Error sending payment: ${error}`);
  }
}

module.exports = {
  getAccountInfo,
  sendPayment,
};

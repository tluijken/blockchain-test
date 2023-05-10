// checkout https://www.youtube.com/watch?v=zVqczFZr124 
// this code is base on this tutorial, for educational purposes only
const { BlockChain, Transaction } = require('./models/blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


const myKey = ec.keyFromPrivate('0da48d0343877b7889c316ea5ede2440a4017751f7590248c1f3af2ccbb13277');

const myWalletAddress = myKey.getPublic('hex');

let testCoin = new BlockChain();
const tx1 = new Transaction(myWalletAddress, 'Address1', 10);
tx1.signTransaction(myKey);

testCoin.addTransaction(tx1);


console.log('\nStarting the miner');
testCoin.minePendingTransacions(myWalletAddress);

console.log('\nBalance of thomas is', testCoin.getBalanceOfAddress(myWalletAddress));

console.log(JSON.stringify(testCoin, null, 4));

// Let's tamper with the transactions
//testCoin.chain[1].transactions[0].amount = 1;

console.log('is chain valid', testCoin.isChainValid());

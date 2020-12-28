// checkout https://www.youtube.com/watch?v=zVqczFZr124 
// this code is base on this tutorial, for educational purposes only
const {BlockChain, Transaction}  = require('./models/blockchain');
let testCoin = new BlockChain();
testCoin.createTransaction(new Transaction('Address1', 'Address2', 100));
testCoin.createTransaction(new Transaction('Address2', 'Address1', 50));

console.log('\nStarting the miner');
testCoin.minePendingTransacions('thomas-address');


console.log('\nStarting the miner');
testCoin.minePendingTransacions('thomas-address');

console.log('\nBalance of thomas is', testCoin.getBalanceOfAddress('thomas-address'));

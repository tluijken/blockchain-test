// checkout https://www.youtube.com/watch?v=zVqczFZr124 
// this code is base on this tutorial, for educational purposes only

const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp, data, previousHash = ''){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block('01/01/2020', 'Genesis block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            var previousBlock = this.chain[i -1];
            var currentBlock = this.chain[i];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let testCoin = new BlockChain();
testCoin.addBlock(new Block('10/07/2020', {amount: 4}));
testCoin.addBlock(new Block('10/08/2020', {amount: 10}));
console.log('Is blockchain valid', testCoin.isChainValid());

// Lets temper with the block, and see if it is still valid.
testCoin.chain[1].data = {amount: 100};
// Let's recalculate the hash, and see if it is still invalid
testCoin.chain[1].hash = testCoin.chain[1].calculateHash();

console.log('Is blockchain valid', testCoin.isChainValid());

console.log(JSON.stringify(testCoin, null, 4));

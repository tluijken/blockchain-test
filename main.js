// checkout https://www.youtube.com/watch?v=zVqczFZr124 
// this code is base on this tutorial, for educational purposes only

const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp, data, previousHash = ''){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.nonce + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined", this.hash);
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock(){
        return new Block('01/01/2020', 'Genesis block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
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
console.log('Mining block...');
testCoin.addBlock(new Block('10/07/2020', {amount: 4}));

console.log('Mining block...');
testCoin.addBlock(new Block('10/08/2020', {amount: 10}));

console.log(JSON.stringify(testCoin, null, 4));

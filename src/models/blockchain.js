const {Block} = require('./block');
const {Transaction} = require('./transaction');

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block('01/01/2020', 'Genesis block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    minePendingTransacions(miningRewardAddress){
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward)
        this.pendingTransactions.push(rewardTx);
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined');
        this.chain.push(block);
        
        this.pendingTransactions = [];

    }

    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must incldude from and to addresses');
        }
        
        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            var previousBlock = this.chain[i -1];
            var currentBlock = this.chain[i];

            if(!currentBlock.hasVallidTransactions()){
                console.log('invalid transactions');
                return false;
            }

            if(currentBlock.hash !== currentBlock.calculateHash()){
                console.log('invalid hash');
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                console.log('invalid previous hash', currentBlock.previousHash, previousBlock.calculateHash() );
                return false;
            }
        }
        return true;
    }
}

module.exports.BlockChain = BlockChain;
module.exports.Transaction = Transaction;

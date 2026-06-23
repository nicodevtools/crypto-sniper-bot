#!/usr/bin/env node
/**
 * Crypto Sniper Bot - Monitor new token listings on DEXes
 * Funciona con Uniswap/PancakeSwap usando WebSocket providers
 * Versión: 1.0.0 - Nico
 */

const { ethers } = require('ethers');
const readline = require('readline');

// Configuration
const CONFIG = {
  // Monitor for new pairs on these DEX factories
  FACTORIES: {
    UNISWAP_V2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    PANCAKESWAP: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    SUSHISWAP: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac'
  },
  
  // PairCreated event signature
  PAIR_CREATED_TOPIC: ethers.id('PairCreated(address,address,address,uint256)'),
  
  // Minimum liquidity to alert (in native token)
  MIN_LIQUIDITY: ethers.parseEther('0.1'),
  
  // WETH/WBNB addresses
  WRAPPED_NATIVE: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',    // Ethereum
    56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',   // BSC
    42161: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'  // Arbitrum
  }
};

class DexSniper {
  constructor(rpcUrl, chainId = 1) {
    this.provider = new ethers.WebSocketProvider(rpcUrl);
    this.chainId = chainId;
    this.watchList = new Set();
    this.scannedPairs = new Map();
  }

  async startMonitoring() {
    console.log(`🔍 [Nico's Sniper] Monitoring chain ${this.chainId}...`);
    
    // Listen for new pairs
    for (const [dex, factory] of Object.entries(CONFIG.FACTORIES)) {
      try {
        const contract = new ethers.Contract(factory, [
          'event PairCreated(address indexed token0, address indexed token1, address pair, uint256)'
        ], this.provider);
        
        contract.on('PairCreated', async (token0, token1, pair, event) => {
          await this.onNewPair(dex, token0, token1, pair, event);
        });
        
        console.log(`  ✓ Watching ${dex} at ${factory}`);
      } catch (e) {
        console.log(`  ✗ ${dex}: ${e.message}`);
      }
    }
  }

  async onNewPair(dex, token0, token1, pair, event) {
    const timestamp = Date.now();
    console.log(`\n🆕 [${new Date(timestamp).toISOString()}] New pair on ${dex}!`);
    console.log(`   Pair: ${pair}`);
    console.log(`   Token0: ${token0}`);
    console.log(`   Token1: ${token1}`);
    
    // Check if involves wrapped native
    const wrappedAddr = CONFIG.WRAPPED_NATIVE[this.chainId];
    const isNative = token0.toLowerCase() === wrappedAddr?.toLowerCase() || 
                     token1.toLowerCase() === wrappedAddr?.toLowerCase();
    
    if (isNative) {
      console.log(`   ⚡ NATIVE PAIR - Potential new token launch!`);
      this.alertNewToken(dex, token0, token1, pair);
    }
    
    this.scannedPairs.set(pair, { dex, token0, token1, timestamp });
  }

  alertNewToken(dex, token0, token1, pair) {
    const token = token0.toLowerCase() === CONFIG.WRAPPED_NATIVE[this.chainId]?.toLowerCase() 
      ? token1 : token0;
    
    console.log(`\n🎯 ALERT: New token detected!`);
    console.log(`   Token: ${token}`);
    console.log(`   Pair: ${pair}`);
    console.log(`   DEX: ${dex}`);
    console.log(`   Buy: https://dexscreener.com/search?q=${token}`);
  }

  async stopMonitoring() {
    await this.provider.destroy();
  }
}

// CLI Interface
if (require.main === module) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  
  console.log('⚡ Nico\'s Crypto Sniper Bot v1.0.0');
  console.log('Monitor new DEX listings in real-time\n');
  
  rl.question('RPC WebSocket URL: ', async (rpcUrl) => {
    rl.question('Chain ID (1=Ethereum, 56=BSC, 42161=Arbitrum): ', async (chainId) => {
      const sniper = new DexSniper(rpcUrl, parseInt(chainId) || 1);
      await sniper.startMonitoring();
      
      console.log('\n✅ Monitoring active. Press Ctrl+C to stop.\n');
      
      process.on('SIGINT', async () => {
        console.log('\n🛑 Shutting down...');
        await sniper.stopMonitoring();
        process.exit(0);
      });
    });
  });
}

module.exports = DexSniper;

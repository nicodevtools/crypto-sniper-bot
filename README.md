# 🎯 Crypto Sniper Bot — by Nico

**Node.js · Real-time DEX Monitor**

---

## What It Does

Monitors DEX factories in real-time for new token launches:

| Feature | Supported |
|---------|-----------|
| 🦄 **Uniswap V2** | ✅ Ethereum |
| 🥞 **PancakeSwap** | ✅ BSC |
| 🍣 **SushiSwap** | ✅ Multi-chain |
| 🔔 **WebSocket alerts** | ✅ Real-time |
| 🌊 **Liquidity filter** | ✅ Configurable |
| 🔗 **DexScreener link** | ✅ Auto-generated |

---

## Quick Start

```bash
# 1. Install dependencies
npm install ethers

# 2. Get a WebSocket RPC (Alchemy/Infura/QuickNode)
# 3. Run the bot
node crypto-sniper-bot.js
```

When prompted:
- **RPC URL**: `wss://eth-mainnet.g.alchemy.com/v2/YOUR_KEY`  
- **Chain ID**: `1` (Ethereum), `56` (BSC), or `42161` (Arbitrum)

---

## Configuration

Edit the `CONFIG` object in the script:

```js
MIN_LIQUIDITY: ethers.parseEther('0.1'),  // Min 0.1 ETH/BNB
```

Add more factories by extending `CONFIG.FACTORIES`.

---

## Pro Tips

- **Run on a VPS** (DigitalOcean $6/mo droplet works fine)
- **Telegram integration**: Pipe output to a Telegram bot webhook
- **Multi-chain**: Run multiple instances for each chain
- **Avoid honeypots**: Pair with a token scanner (Honeypot.is API)

---

## Pricing

**Pay What You Want — Minimum $5 USDT/POL (Polygon)**

Wallet: `0xD404AE6B45Cae3D453D4408de99eC489Ce0fc18e`

Includes: Source code + setup guide + 1 month of updates.

---

## License

Single-user. © Nico

---

## 💰 Get This Tool

**Pay what you want — minimum $5 USDT/POL/ETH on Polygon**

```
Wallet: 0xD404AE6B45Cae3D453D4408de99eC489Ce0fc18e
```

Send your TX hash for instant access. 🎯

[More Tools →](https://github.com/nicodevtools)

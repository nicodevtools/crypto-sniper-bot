# 🤖 Crypto Sniper Bot — Real-Time DEX Pair Monitor

> **Catch new token launches on Uniswap, PancakeSwap & SushiSwap before they pump. WebSocket-based, instant alerts.**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Ethers](https://img.shields.io/badge/ethers.js-v6-2535a0?style=flat-square&logo=ethereum)](https://ethers.org)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](./LICENSE)
[![Version](https://img.shields.io/badge/Version-2.0-brightgreen?style=flat-square)](.)

<p align="center">
  <img src="https://img.shields.io/badge/%F0%9F%A6%84-Uniswap_V2-ff007a?style=for-the-badge" alt="Uniswap">
  <img src="https://img.shields.io/badge/%F0%9F%A5%9E-PancakeSwap-d0842b?style=for-the-badge" alt="PancakeSwap">
  <img src="https://img.shields.io/badge/%F0%9F%8D%A3-SushiSwap-0e0f22?style=for-the-badge" alt="Sushi">
  <img src="https://img.shields.io/badge/%E2%9A%A1-Real_time-10b981?style=for-the-badge" alt="Realtime">
</p>

---

## 🎯 What It Does

Monitors DEX factory contracts via WebSocket and alerts you the **second** a new trading pair is created. No polling, no delays — WebSocket events.

```
New Pair Created Event
        ↓
  Bot detects it in real-time
        ↓
  Generates DexScreener link
        ↓
  Filters by liquidity threshold
        ↓
     🚨 ALERT FIRED
```

---

## ✨ Features

```javascript
✅ Real-time WebSocket monitoring (no polling delay)
✅ Uniswap V2 Factory — Ethereum mainnet
✅ PancakeSwap Factory — BSC
✅ SushiSwap Factory — Multi-chain
✅ Auto-generated DexScreener links for instant charting
✅ Configurable liquidity filter (min ETH/BNB)
✅ Console logging with timestamps
✅ Multi-chain support (ETH, BSC, Arbitrum, Polygon)
```

---

## 📥 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/nicodevtools/crypto-sniper-bot.git
cd crypto-sniper-bot

# 2. Install dependencies
npm install ethers

# 3. Get a free WebSocket RPC URL
# Alchemy: https://www.alchemy.com (free tier = 300M compute units)
# Infura: https://infura.io
# QuickNode: https://www.quicknode.com

# 4. Run the bot
node crypto-sniper-bot.js
```

**When prompted:**
- **RPC URL:** `wss://eth-mainnet.g.alchemy.com/v2/YOUR_KEY`
- **Chain ID:** `1` (Ethereum), `56` (BSC), `42161` (Arbitrum)

---

## ⚙️ Configuration

Edit `CONFIG` in the script:

```js
const CONFIG = {
  FACTORIES: {
    'Uniswap V2': {
      address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
      chain: 'ethereum'
    },
    'PancakeSwap': {
      address: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
      chain: 'bsc'
    },
    'SushiSwap': {
      address: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
      chain: 'ethereum'
    }
  },
  MIN_LIQUIDITY: ethers.parseEther('0.1'), // Min 0.1 ETH/BNB
};
```

---

## 🚀 Advanced Setup

### Run on a VPS (24/7)
```bash
# DigitalOcean $6/mo droplet works perfectly
# Install Node.js + PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y
npm install -g pm2
pm2 start crypto-sniper-bot.js --name sniper
pm2 save
pm2 startup  # Auto-start on reboot
```

### Telegram Alerts Integration
```js
// Add to the script:
const TELEGRAM_BOT_TOKEN = 'your_token';
const TELEGRAM_CHAT_ID = 'your_chat_id';

async function sendTelegramAlert(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
  });
}
```

---

## 💡 Pro Tips

- 🔐 **Run on a dedicated VPS** — reliability matters when sniping
- 🔗 **Chain multiple instances** — one per chain for full coverage
- 🛡️ **Pair with Honeypot.is API** — filter out scam tokens
- 📊 **Track gas prices** — only trade when gas is reasonable
- 🧪 **Test on Goerli/Sepolia first** — before mainnet

---

## 💰 Pricing

**Pay What You Want — Minimum $5 USDT/POL/ETH on Polygon**

```
Wallet: 0xD404AE6B45Cae3D453D4408de99eC489Ce0fc18e
```

**What you get:**
- Full source code (`crypto-sniper-bot.js`)
- Setup guide with screenshots
- VPS deployment script
- 1 month of updates & support

📦 **[Bundle Deal: All 5 Tools for $15](https://github.com/nicodevtools/nico-trading-toolkit)**

---

## ⚠️ Disclaimer

This is a **monitoring tool**. It alerts you to new pairs. It does NOT:
- Execute trades automatically
- Check for honeypots/rugpulls (DYOR)
- Guarantee profitability

**Always verify token contracts before trading.**

---

## 🌐 More Tools by Nico

| Tool | Type | Link |
|------|------|------|
| 🔍 Smart Liquidity Scanner | TradingView Indicator | [Repo](https://github.com/nicodevtools/smart-liquidity-scanner) |
| 🎯 S/R Zone Pro | TradingView Indicator | [Repo](https://github.com/nicodevtools/sr-zone-pro) |
| 🔄 Momentum Reversal Scanner | TradingView Indicator | [Repo](https://github.com/nicodevtools/momentum-reversal-scanner) |
| ⚡ Flash Arbitrage Scanner | Solidity Contract | [Repo](https://github.com/nicodevtools/flash-arbitrage-scanner) |
| 🧰 CryptoKit Pro | 6 Free Crypto Tools | [Live](https://nicodevtools.github.io/cryptokit-pro/) |

---

## ⭐ Star This Repo

⭐ = more visibility = more traders find it.

## 📣 Share

```
New token sniper bot for DEX launches 🎯
Monitors Uniswap, PancakeSwap & SushiSwap in real-time.
WebSocket-based, instant alerts. $5+ crypto.
🔗 https://github.com/nicodevtools/crypto-sniper-bot
#Crypto #DeFi #NodeJS
```

---

<p align="center">
  <strong>Speed wins in DeFi. Be the first to know.</strong><br>
  <sub>© Nico 🎯 — <a href="https://github.com/nicodevtools">github.com/nicodevtools</a></sub>
</p>

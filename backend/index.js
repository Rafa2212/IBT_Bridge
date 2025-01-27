const express = require("express");
const cors = require("cors");
const { mint: mintEth, burn: burnEth } = require("./services/ethService");
const { mint: mintSui, burn: burnSui } = require("./services/suiService");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key'], 
};

app.use(cors(corsOptions));
app.use(express.json());

app.options('*', cors(corsOptions));

app.post('/bridge/eth-to-sui', async (req, res) => {
  try {
    const { ethAddress, suiAddress, amount } = req.body;
    
    const ethTxHash = await burnEth(ethAddress, amount);
    const suiTxHash = await mintSui(suiAddress, amount);
    
    res.json({
      success: true,
      ethTxHash,
      suiTxHash
    });
  } catch (error) {
    console.error('ETH to SUI bridge error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/bridge/sui-to-eth', async (req, res) => {
  try {
    const { ethAddress, suiAddress, amount, txDigest } = req.body;
    
    const suiTxHash = await burnSui(suiAddress, amount, txDigest);
    
    const ethTxHash = await mintEth(ethAddress, amount);
    
    res.json({
      success: true,
      ethTxHash,
      suiTxHash
    });
  } catch (error) {
    console.error('SUI to ETH bridge error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
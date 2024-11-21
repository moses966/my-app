import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

const injected = injectedModule();

const web3Onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x66eeb', // Arbitrum Sepolia chain ID
      token: 'ETH',
      label: 'Arbitrum Sepolia',
      rpcUrl: import.meta.env.VITE_APP_ARBITRUM_RPC_URL, // Arbitrum Sepolia RPC URL
    },
  ],
  appMetadata: {
    name: 'Betmimi',
    description: 'Wellcome to Betmimi where Fun meets transparency.',
  },
  apiKey: import.meta.env.VITE_APP_BLOCKNATIVE_API_KEY, // Blocknative API Key
});

export default web3Onboard;

// Define network configurations
const networks = {
  arbitrum: {
    chainId: '0xa4b1', // Hexadecimal for 42161
    chainName: 'Arbitrum One',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://arbiscan.io/'],
  },
  arbitrumSepolia: {
    chainId: '0x66EEE', // Hexadecimal for 421614
    chainName: 'Arbitrum Sepolia',
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia.arbiscan.io'],
  },
  anotherNetwork: {
    chainId: '0x', // Hexadecimal for 0
    chainName: 'another-network',
    rpcUrls: ['https://another-network.io/rpc'],
    nativeCurrency: {
      name: 'A_N_T',
      symbol: 'A_N_T',
      decimals: 18,
    },
    blockExplorerUrls: ['https://another-network.io'],
  },
};

async function switchNetwork(networkKey) {
  if (!window.ethereum) {
    console.error('MetaMask is not installed!');
    return;
  }

  const network = networks[networkKey];
  if (!network) {
    console.error('Network configuration not found for:', networkKey);
    return;
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainId }],
    });
    console.log(`Switched to ${network.chainName}`);
  } catch (switchError) {
    // If the chain is not added, request to add it
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [network],
        });
        console.log(`Added and switched to ${network.chainName}`);
      } catch (addError) {
        console.error('Error adding network:', addError);
      }
    } else {
      console.error('Error switching network:', switchError);
    }
  }
}

export { switchNetwork };

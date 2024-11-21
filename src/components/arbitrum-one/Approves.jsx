import React, { useState } from 'react';
import { BrowserProvider, Contract, parseUnits } from 'ethers';
import tokenABI from '../../artifacts/arbitrum-one/usdt/tokenABI.json'; // Import ABI from file
import { getContractAddress } from '../../utils/loadContractAddresses'; // Import the utility function
import { switchNetwork } from '../../utils/networkUtils'; // Import the switchNetwork utility

function ApprovessTokenWithABIComponent() {
  const [amount, setAmount] = useState('');
  const [networkKey, setNetworkKey] = useState('anotherNetwork'); // Default to arbitrum-sepolia

  async function handleApprove() {
    if (!window.ethereum) {
      console.error('MetaMask is not installed!');
      return;
    }

    // Fetch the token and spender addresses dynamically based on the selected network
    const tokenAddress = getContractAddress(networkKey, 'MockTether');
    const spenderAddress = getContractAddress(networkKey, 'UsdtManager');

    if (!tokenAddress || !spenderAddress) {
      console.error('Required contract addresses are missing!');
      return;
    }

    try {
      // Switch to the selected network
      await switchNetwork(networkKey);

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Connect to MetaMask
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create contract instance using the ABI
      const tokenContract = new Contract(tokenAddress, tokenABI, signer);

      // Format the amount (assuming token has 6 decimals)
      const formattedAmount = parseUnits(amount, 6);

      // Call the approve function
      const txResponse = await tokenContract.approve(spenderAddress, formattedAmount);
      await txResponse.wait(); // Wait for transaction confirmation

      console.log('Approval successful:', txResponse.hash);
    } catch (error) {
      console.error('Error approving tokens:', error);
    }
  }

  return (
    <div>
      <select
        value={networkKey}
        onChange={(e) => setNetworkKey(e.target.value)}
        style={{ marginBottom: '10px' }}
      >
        <option value="arbitrumSepolia">Arbitrum Sepolia</option>
        <option value="anotherNetwork">Another Network</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount to approve"
      />
      <button onClick={handleApprove}>Approve Tokens</button>
    </div>
  );
}

export default ApprovessTokenWithABIComponent;

import React, { useState } from 'react';
import { BrowserProvider, Contract, parseUnits } from 'ethers';
import tokenABI from '../../artifacts/arbitrum-one/usdt/tokenABI.json'; // Import ABI from file
import { getContractAddress } from '../../utils/loadContractAddresses'; // Import the utility function

function ApprovesTokenWithABIComponent() {
  const [amount, setAmount] = useState('');

  // Fetch the token and spender addresses dynamically
  const tokenAddress = getContractAddress('Usdt'); // Use "Usdt" key from deployments.json
  const spenderAddress = getContractAddress('Balances'); // Use "Balances" key from deployments.json

  async function handleApprove() {
    if (!window.ethereum) {
      console.error('MetaMask is not installed!');
      return;
    }

    if (!tokenAddress || !spenderAddress) {
      console.error('Required contract addresses are missing!');
      return;
    }

    try {
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

export default ApprovesTokenWithABIComponent;

import React, { useState } from 'react';
import { BrowserProvider, Contract, parseUnits } from 'ethers';
import tokenABI from '../abis/tokenABI.json'; // Import ABI from file

function ApproveTokenWithABIComponent() {
  const [amount, setAmount] = useState('');
  const tokenAddress = '0x36b0188ebE6ffcE952De77EE28b9bb852443E7Dc'; // Token contract address
  const spenderAddress = '0xFD6827d6562FdF9797f09946b37F433146D26Ad2'; // Spender address

  async function handleApprove() {
    if (!window.ethereum) {
      console.error('MetaMask is not installed!');
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

export default ApproveTokenWithABIComponent;

import React, { useState } from 'react';
import { BrowserProvider, Contract, parseUnits } from 'ethers';

function ApproveTokenComponent() {
  const [amount, setAmount] = useState('');
  const tokenAddress = '0x36b0188ebE6ffcE952De77EE28b9bb852443E7Dc'; // Token contract address
  const spenderAddress = '0xFD6827d6562FdF9797f09946b37F433146D26Ad2'; // Spender contract address

  async function handleApprove() {
    if (!window.ethereum) {
      console.error('MetaMask is not installed!');
      return;
    }

    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Connect to the MetaMask provider
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Minimal ABI for the approve function
      const minimalABI = ['function approve(address spender, uint256 amount) external returns (bool)'];

      // Create the contract instance
      const tokenContract = new Contract(tokenAddress, minimalABI, signer);

      // Convert amount to the appropriate format (e.g., assuming 6 decimals)
      const formattedAmount = parseUnits(amount, 6);

      // Send the approve transaction
      const txResponse = await tokenContract.approve(spenderAddress, formattedAmount);
      await txResponse.wait(); // Wait for transaction confirmation

      console.log('Transaction successful:', txResponse.hash);
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

export default ApproveTokenComponent;

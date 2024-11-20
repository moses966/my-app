import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';

function UpdateStringComponent() {
  const [newString, setNewString] = useState('');
  const contractAddress = '0x312835d3B01D7c472E00d4678240387EB44303ab';

  async function handleUpdate() {
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

      // Sign the message
      const message = `Update string to: ${newString}`;

      // Create the contract instance
      const contract = new Contract(contractAddress, ['function set_string(string)'], signer);

      // Send the transaction
      const txResponse = await contract.set_string(newString);
      await txResponse.wait(); // Wait for transaction confirmation

      console.log('Transaction successful:', txResponse.hash);

    } catch (error) {
      console.error('Error updating string:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={newString}
        onChange={(e) => setNewString(e.target.value)}
        placeholder="Enter new string"
      />
      <button onClick={handleUpdate}>Update String</button>
    </div>
  );
}

export default UpdateStringComponent;
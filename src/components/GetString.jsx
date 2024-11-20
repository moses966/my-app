import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function GetString() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const contractAddress = '0x312835d3B01D7c472E00d4678240387EB44303ab';
  const apiKey = import.meta.env.VITE_APP_ALCHEMY_API_KEY;

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        // Connect to a public Ethereum provider
        const provider = new ethers.JsonRpcProvider(`https://arb-sepolia.g.alchemy.com/v2/${apiKey}`);

        // Create the contract instance with a minimal ABI for the `greeting` function
        const contract = new ethers.Contract(contractAddress, ['function greeting() view returns (string)'], provider);

        // Call the contract's `greeting` method to fetch the string
        const greeting = await contract.greeting();
        setResult(greeting);
      } catch (err) {
        console.error('Error fetching the greeting:', err);
        setError('Failed to fetch greeting from the blockchain.');
      }
    };

    fetchGreeting();
  }, [apiKey, contractAddress]);

  return (
    <div>
      <h1>Contract String</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{result}</p>
      )}
    </div>
  );
}

export default GetString;
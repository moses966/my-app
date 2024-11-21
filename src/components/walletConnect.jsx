import React, { useState } from 'react';
import web3Onboard from './web3Onboard';

function WalletConnect() {
  const [wallets, setWallets] = useState([]);
  const [address, setAddress] = useState(null);

  async function connectWallet() {
    try {
      // Prompt user to connect a wallet
      const connectedWallets = await web3Onboard.connectWallet();
      setWallets(connectedWallets);

      // Get the first wallet address
      if (connectedWallets.length > 0) {
        setAddress(connectedWallets[0].accounts[0].address);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }

  async function disconnectWallet() {
    try {
      const [primaryWallet] = wallets;
      if (primaryWallet) {
        await web3Onboard.disconnectWallet({ label: primaryWallet.label });
        setWallets([]);
        setAddress(null);
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  }

  return (
    <div>
      {address ? (
        <div>
          <p>Connected: {address}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default WalletConnect;

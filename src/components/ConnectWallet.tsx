import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface ConnectWalletProps {
    setAddress: (address: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setAddress }) => {
    const [balance, setBalance] = useState<string>(''); // Store wallet balance
    const [isConnected, setIsConnected] = useState<boolean>(false); // Track connection status
    const [loading, setLoading] = useState<boolean>(false); // Track loading state

    // Simulate connecting to MetaMask and getting wallet details
    const connectWallet = async () => {
        setLoading(true); // Start loading
        try {
            if ((window as any).ethereum) {
                const provider = new ethers.BrowserProvider((window as any).ethereum);
                const accounts = await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const walletAddress = await signer.getAddress();
                setAddress(walletAddress);

                const walletBalance = await provider.getBalance(walletAddress);
                setBalance(ethers.formatEther(walletBalance));

                // Simulate delay before completing connection
                setTimeout(() => {
                    setIsConnected(true); // Set connection status to true
                    setLoading(false); // Stop loading
                }, 2000); // 2 seconds delay
            } else {
                alert('MetaMask not detected!');
                setLoading(false); // Stop loading if no MetaMask
            }
        } catch (error) {
            console.error(error);
            setLoading(false); // Stop loading in case of error
        }
    };

    // Simulate disconnecting wallet
    const disconnectWallet = () => {
        setLoading(true); // Start loading
        setTimeout(() => {
            setAddress(''); // Clear address
            setBalance(''); // Clear balance
            setIsConnected(false); // Set connection status to false
            setLoading(false); // Stop loading
        }, 2000); // 2 seconds delay
    };

    useEffect(() => {
        connectWallet(); // Automatically try to connect on page load
    }, [setAddress]);

    return (
        <div className="flex justify-between items-center    w-[1200px] mx-auto">
           <div className=''>
              <h2 className="text-2xl text-black font-bold mb-4">ETH Balance: {balance} ETH</h2>
           </div>

            {loading ? (
                <p className="text-white">Processing...</p> // Show loading message/spinner
            ) : (
                !isConnected ? (
                    <button
                        onClick={connectWallet}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                    >
                        Connect Wallet
                    </button>
                ) : (
                    <button
                        onClick={disconnectWallet}
                        className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                    >
                        Disconnect Wallet
                    </button>
                )
            )}
        </div>
    );
};

export default ConnectWallet;
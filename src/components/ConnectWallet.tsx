import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface ConnectWalletProps {
    setAddress: (address: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setAddress }) => {
    const [balance, setBalance] = useState<string>('');
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // Define the Holesky network RPC URL
    const HOLESKY_RPC_URL = 'https://rpc.ankr.com/eth_holesky'; // Replace with the actual RPC URL if necessary

    const connectWallet = async () => {
        setLoading(true);
        try {
            if ((window as any).ethereum) {
                const provider = new ethers.BrowserProvider((window as any).ethereum);
                // Set the network to Holesky
                await provider.send('wallet_switchEthereumChain', [{ chainId: '0xYourChainId' }]); // Replace with the Holesky chain ID

                const accounts = await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const walletAddress = await signer.getAddress();
                setAddress(walletAddress);

                // Create a new provider specifically for Holesky
                const holeskyProvider = new ethers.JsonRpcProvider(HOLESKY_RPC_URL);
                const walletBalance = await holeskyProvider.getBalance(walletAddress);
                setBalance(ethers.formatEther(walletBalance));

                setTimeout(() => {
                    setIsConnected(true);
                    setLoading(false);
                }, 2000);
            } else {
                alert('MetaMask not detected!');
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const disconnectWallet = () => {
        setLoading(true);
        setTimeout(() => {
            setAddress('');
            setBalance('');
            setIsConnected(false);
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        connectWallet();
    }, [setAddress]);

    return (
        <div className="flex justify-between items-center w-[1200px] mx-auto">
            <div>
                <h2 className="text-2xl text-black font-bold mb-4">ETH Balance: {balance} ETH</h2>
            </div>

            {loading ? (
                <p className="text-white">Processing...</p>
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

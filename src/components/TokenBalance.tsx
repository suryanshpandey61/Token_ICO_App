import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import "../app/globals.css";

interface TokenBalanceProps {
    address: string; // Type for the address prop
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ address }) => {
    const [tokenBalance, setTokenBalance] = useState<string>('0'); // Initialize balance to '0'
    const tokenAddress = '0x94570E489A1b8f3C334aF3aE87d5F04ec683cbec'; // Replace with your token address

    const fetchTokenBalance = async () => {
        // Check if MetaMask is installed
        if (!(window as any).ethereum) {
            alert('MetaMask is not installed. Please install it to use this feature.');
            return; // Exit the function if MetaMask is not detected
        }

        const tokenABI = [
            "function balanceOf(address owner) view returns (uint256)",
            "function decimals() view returns (uint8)"
        ];

        const provider = new ethers.BrowserProvider((window as any).ethereum); // Use the provider
        const contract = new ethers.Contract(tokenAddress, tokenABI, provider); // Use provider instead of signer

        try {
            const balance = await contract.balanceOf(address);
            const decimals = await contract.decimals();
            setTokenBalance(ethers.formatUnits(balance, decimals));
        } catch (error) {
            console.error('Error fetching token balance:', error);
           
        }
    };

    useEffect(() => {
        fetchTokenBalance(); // Call the function to fetch token balance on mount
    }, [address]); // Add address as a dependency to refetch when it changes

    return (
        <div>
            <p className="text-2xl text-black font-bold ml-[15px]">
                Token Balance: <span className="font-bold">{tokenBalance}</span> MTK
            </p> {/* Display token balance */}
        </div>
    );
};

export default TokenBalance;

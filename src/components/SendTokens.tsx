import { useState, FormEvent } from 'react';
import { ethers } from 'ethers';
import "../app/globals.css";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface SendTokensProps {
    address: string; // Type for the address prop
}

const SendTokens: React.FC<SendTokensProps> = ({ address }) => {
    const [recipient, setRecipient] = useState<string>(''); // State for recipient address
    const [amount, setAmount] = useState<string>(''); // State for amount
    const tokenAddress = '0x94570E489A1b8f3C334aF3aE87d5F04ec683cbec'; // Replace with your token address

    const sendTokens = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const tokenABI = ["function transfer(address to, uint256 value) returns (bool)"];
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(tokenAddress, tokenABI, signer);

        try {
            const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18)); // Token has 18 decimals
            console.log('Transaction submitted', tx);
            await tx.wait();
            console.log('Transaction confirmed', tx);
            toast.success("Tokens sent Successfully")
         
        } catch (error) {
            console.error('Transaction failed', error);
          toast.error("Failed to sent tokens Check the console For more Details")
            
        }
    };

    return (
        <form onSubmit={sendTokens} className="shadow-lg border border-black rounded-lg p-6 space-y-4 mt-8 max-w-[800px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-4">Send Tokens</h2>
            <div className='flex flex-col md:flex-row gap-4'>
                <input
                    className="border text-black border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                    type="text"
                    placeholder="Recipient Address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                    className="border text-black border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button 
                type="submit" 
                className="bg-green-500 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-md transition duration-200 w-full"
            >
                Send Tokens
            </button>
            <ToastContainer />
        </form>
    );
};

export default SendTokens;

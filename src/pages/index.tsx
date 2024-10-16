import { useState } from 'react';
import "../app/globals.css";
import ConnectWallet from '../components/ConnectWallet'
import TokenBalance from '../components/TokenBalance';
import SendTokens from '../components/SendTokens'; // Make sure to import SendTokens correctly
import "../app/globals.css";
const Home: React.FC = () => {
    const [address, setAddress] = useState<string>('');

    return (
        <div className="container h-[100vh]  mx-auto p-6">
            <h1 className="text-3xl font-bold text-center font-serif  text-slate-500 underline mb-6">Suryansh's Token ICO App</h1>
            <ConnectWallet setAddress={setAddress} />
            {address && (
                <div className="mt-6">
                    <TokenBalance address={address} />
                    <SendTokens address={address} />
                </div>
            )}
        </div>
    );
};

export default Home; // Ensure this line is present
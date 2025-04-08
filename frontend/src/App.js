import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contract-config";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum); // ethers v6
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          const votingContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
          setContract(votingContract);
          console.log("✅ Connected to contract:", votingContract);
        } catch (err) {
          console.error("🛑 Error connecting:", err);
        }
      } else {
        alert("🦊 Please install MetaMask!");
      }
    };

    init();
  }, []);

  return (
    <div>
      <h1>🗳️ Blockchain Voting System</h1>
      {contract ? (
        <p>✅ Connected as: {account}</p>
      ) : (
        <p>🔌 Connecting to smart contract...</p>
      )}
    </div>
  );
}

export default App;

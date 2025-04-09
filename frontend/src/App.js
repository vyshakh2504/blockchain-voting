// src/App.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contract-config";
import RegisterCandidate from "./components/RegisterCandidate";
import CandidatesList from "./components/CandidateList";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          // Request access to MetaMask accounts
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum); // Ethers v6 style
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          // Create an instance of the contract
          const votingContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
          setContract(votingContract);
          console.log("✅ Connected to contract:", votingContract);
        } catch (err) {
          console.error("Connection error:", err);
        }
      } else {
        alert("Please install MetaMask!");
      }
    };

    init();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Blockchain Voting System</h1>
      {account ? <p>Connected as: {account}</p> : <p>Not connected...</p>}
      {contract ? (
        <>
          {/* Render the Register Candidate form only if contract is available */}
          <RegisterCandidate contract={contract} />
          <CandidatesList contract={contract} />
        </>
      ) : (
        <p>Connecting to the contract...</p>
      )}
    </div>
  );
}

export default App;

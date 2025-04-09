import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contract-config";
import RegisterCandidate from "./components/RegisterCandidate";
import CandidatesList from "./components/CandidateList";
import RegisterVoter from "./components/RegisterVoter";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
          
          setContract(contract);
          setAccount(address);
          console.log("✅ Connected account:", address);
          
          // Check admin from contract
          const deployedAdmin = await contract.admin();
          console.log("Admin from contract:", deployedAdmin);
          
          if (address.toLowerCase() === deployedAdmin.toLowerCase()) {
            console.log("You are the admin!");
          } else {
            console.warn("You are NOT the admin. Admin is:", deployedAdmin);
          }
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
          <RegisterCandidate contract={contract} />
          <RegisterVoter contract={contract} />
          <CandidatesList contract={contract} />
        </>
      ) : (
        <p>Connecting to the contract...</p>
      )}
    </div>
  );
}

export default App;
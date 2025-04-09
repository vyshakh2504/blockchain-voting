// src/RegisterCandidate.js
import { useState } from "react";
import { uploadToIPFS } from "../pinataUpload";

export default function RegisterCandidate({ contract }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const handleRegister = async () => {
    // Basic checks
    if (!name.trim()) return alert("Please enter a candidate name!");
    if (!file) return alert("Please select a manifesto file!");

    try {
      // Upload file to IPFS using Pinata
      const cid = await uploadToIPFS(file);
      console.log("Manifesto uploaded. CID:", cid);

      // Call the smart contract function registerCandidate(name, cid)
      const tx = await contract.registerCandidate(name, cid);
      await tx.wait(); // Wait for transaction confirmation

      window.location.reload();

      alert("Candidate registered successfully!");

      // Reset form fields
      setName("");
      setFile(null);
    } catch (error) {
      console.error("Error registering candidate:", error);
      alert("There was an error registering the candidate. " + error.message);
    }
  };

  
  return (
    <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc" }}>
      <h2>Register Candidate</h2>
      <div>
        <label>Candidate Name: </label>
        <input
          type="text"
          placeholder="Enter candidate name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label>Manifesto (file): </label>
        <input type="file" onChange={(e) => {
          if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }} />
      </div>
      <button style={{ marginTop: "1rem" }} onClick={handleRegister}>
        Register Candidate
      </button>
    </div>
  );
}
 
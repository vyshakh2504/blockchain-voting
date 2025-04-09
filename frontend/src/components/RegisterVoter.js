// src/components/RegisterVoter.js
import React, { useState } from "react";

export default function RegisterVoter({ contract }) {
  const [voterAddress, setVoterAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterVoter = async () => {
    // Basic check: ensure an address was provided.
    if (!voterAddress.trim()) {
      alert("Please enter a valid Ethereum address for the voter.");
      return;
    }
    // Optional: You could add further address validation here.
    try {
      setLoading(true);
      // Call the smart contract function registerVoter(address)
      const tx = await contract.registerVoter(voterAddress);
      await tx.wait(); // Wait for the transaction confirmation
      alert("Voter registered successfully!");
      setVoterAddress("");
    } catch (error) {
      console.error("Error registering voter:", error);
      alert("Error registering voter: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc" }}>
      <h2>Register Voter</h2>
      <div>
        <label>Voter Ethereum Address: </label>
        <input
          type="text"
          placeholder="0x..."
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
          style={{ width: "300px" }}
        />
      </div>
      <button style={{ marginTop: "1rem" }} onClick={handleRegisterVoter} disabled={loading}>
        {loading ? "Registering..." : "Register Voter"}
      </button>
    </div>
  );
}

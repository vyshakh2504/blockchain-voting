import { useEffect, useState } from "react";

export default function CandidatesList({ contract }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Get total candidates (using candidatesCount)
        const count = await contract.candidatesCount();
        
        // Fetch each candidate by ID (starting from 1)
        const candidatesArray = [];
        for (let i = 1; i <= count; i++) {
          const candidate = await contract.candidates(i); // Using the mapping directly
          candidatesArray.push({
            id: candidate.id.toString(),
            name: candidate.name,
            manifestoCID: candidate.manifestoCID,
            voteCount: candidate.voteCount.toString()
          });
        }
        
        setCandidates(candidatesArray);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    if (contract) {
      fetchCandidates();
    }
  }, [contract]);

  if (loading) {
    return <p>Loading candidates...</p>;
  }

  return (
    <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc" }}>
      <h2>Registered Candidates</h2>
      {candidates.length === 0 ? (
        <p>No candidates registered yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {candidates.map((candidate) => (
            <li key={candidate.id} style={{ 
              margin: "1rem 0", 
              padding: "1rem", 
              border: "1px solid #eee",
              borderRadius: "8px" 
            }}>
              <h3>{candidate.name}</h3>
              <p>Votes: {candidate.voteCount}</p>
              <p>
                Manifesto:{" "}
                <a
                  href={`https://ipfs.io/ipfs/${candidate.manifestoCID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on IPFS
                </a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
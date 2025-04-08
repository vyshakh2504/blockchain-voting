// src/pinataUpload.js
import axios from "axios";

const PINATA_API_KEY = "24372add6d09f57f46cf";
const PINATA_SECRET_API_KEY = "c7a89aaf36fe61736ad9d9969ea9d20b83f5aaa831bef55d994eab6d9756d5d7";

export async function uploadToIPFS(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": "multipart/form-data",
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
  });

  const cid = res.data.IpfsHash;
  console.log("📦 Uploaded to IPFS:", cid);
  return cid;
}

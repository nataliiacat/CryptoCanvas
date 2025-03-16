import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getWalletData, getTransactions } from "../../api/blockfrost";
import "./WalletPage.css";
import Loading from "../../components/Loading/Loading";

const API_URL = 'https://cardano-mainnet.blockfrost.io/api/v0';
const API_KEY = 'mainnetRUrPjKhpsagz4aKOCbvfTPHsF0SmwhLc';

const getFormattedField = (metadata, field) => {
  const value = metadata[field];
  const joinWith = field === "image" ? "" : " ";

  if (Array.isArray(value)) {
    return value.join(joinWith);
  }
  return value || "";
};

const resolveIpfsUrl = (url) => {
  if (url.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${url.slice(7)}`;
  }
  return url;
};

const WalletPage = () => {
  const { address } = useParams();
  const [walletInfo, setWalletInfo] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNft, setSelectedNft] = useState(null);
  const EUR_RATE = 0.0021;

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!address) {
          setError("Address not provided.");
          setLoading(false);
          return;
        }
        const data = await getWalletData(address);
        if (data) {
          const lovelace = data.amount.find((a) => a.unit === "lovelace")?.quantity || "0";
          setBalance(Number(lovelace) / 1000000);
          setWalletInfo(data);

          axios
            .get(`${API_URL}/addresses/${address}/utxos`, {
              headers: { project_id: API_KEY },
            })
            .then((res) => {
              const nftTokens = res.data
                .flatMap((utxo) => utxo.amount)
                .filter((a) => a.unit !== "lovelace")
                .map((a) => a.unit);

              const fetchNftMetadata = async () => {
                const nftData = [];
                const nftPromises = nftTokens.map((token, index) =>
                  axios
                    .get(`${API_URL}/assets/${token}`, {
                      headers: { project_id: API_KEY },
                    })
                    .then((nftMetadataResponse) => {
                      const metadata = nftMetadataResponse.data.onchain_metadata;
                      if (metadata) {
                        return {
                          index,
                          metadata: {
                            name: getFormattedField(metadata, "name"),
                            image: getFormattedField(metadata, "image"),
                            description:
                              getFormattedField(metadata, "description") ||
                              getFormattedField(metadata, "Description") ||
                              getFormattedField(metadata, "message"),
                            id: token,
                          },
                        };
                      }
                      return null;
                    })
                    .catch((error) => {
                      console.error("Error fetching NFT metadata:", error);
                      return null;
                    })
                );

                const results = await Promise.all(nftPromises);
                results.forEach((result) => {
                  if (result) nftData[result.index] = result.metadata;
                });

                setNfts(nftData);
                setFilteredNfts(nftData);
              };

              fetchNftMetadata();
            })
            .catch((error) => {
              console.error("Error fetching NFTs:", error);
            });

          const transactions = await getTransactions(address);
          setWalletInfo((prev) => ({ ...prev, transactions }));
        }
      } catch (err) {
        console.error("Error fetching wallet data:", err);
        setError("Something went wrong while fetching the wallet data.");
      }
      setLoading(false);
    };

    fetchWalletData();
  }, [address]);

  const handleSearch = () => {
    const filtered = nfts.filter((nft) =>
      nft.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNfts(filtered);
  };

  const handleNftClick = (nft) => {
    setSelectedNft(nft);
  };

  const closePopup = () => {
    setSelectedNft(null);
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="walletPage">
      <div className="container">
        <div className="info-content">
          <div className="wallet">
            <h1 className="title">My Wallet</h1>
            <p className="info">{address}</p>
            <p className="info preinfo">Address wallet</p>
            <div className="priceDiv flex">
              <h3 className="subtitle">{balance || "Not available"} ADA</h3>
              <h3 className="subtitle">{balance ? (balance * EUR_RATE).toFixed(2) : "Not available"} EUR</h3>
            </div>
          </div>
          <div className="transactions">
            <h3 className="subtitle">Recent Transactions</h3>
            {walletInfo?.transactions && walletInfo.transactions.length > 0 ? (
              <div className="transaction-list">
                {walletInfo.transactions
                  .sort((a, b) => b.block_time - a.block_time)
                  .map((transaction, index) => (
                    <div className="transaction" key={index}>
                      <div className="id-info">
                        <p className="info">ID : {transaction.tx_hash}</p>
                      </div>
                      <p className="text">{new Date(transaction.block_time * 1000).toLocaleString()}</p>
                    </div>
                  ))}
              </div>
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        </div>
        <section className="nftCollection">
          <div className="titleDiv">
            <p className="text">Number of NFTs: {filteredNfts.length || "Not available"}</p>
            <div className="search-bar">
              <input
                className="input"
                type="text"
                placeholder="Search NFTs by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn" onClick={handleSearch}>Search</button>
            </div>
            <h3 className="subtitle">NFT Collection</h3>
            </div>
          <ul className="nftList">
            {filteredNfts.length > 0 ? (
              filteredNfts.map((nft, index) => (
                <li className="nft" key={index} onClick={() => handleNftClick(nft)}>
                  <img
                    src={resolveIpfsUrl(nft.image) || "default-image-url.jpg"}
                    alt={nft.name}
                    
                  />
                  <h3 className="text name">{nft.name}</h3>
                </li>
              ))
            ) : (
              <p>No NFTs found.</p>
            )}
          </ul>
        </section>
      </div>
      {selectedNft && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            <img src={resolveIpfsUrl(selectedNft.image) || "default-image-url.jpg"} alt={selectedNft.name} />
            <h3 className="text name">{selectedNft.name}</h3>
            <p className="text">{selectedNft.description}</p>
            <p className="info">ID : {selectedNft.id}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default WalletPage;




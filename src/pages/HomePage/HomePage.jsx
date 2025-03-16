import React, { useState } from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'
import homeNFT from '../../assets/images/homeNFT.png'
import Loading from '../../components/Loading/Loading'

const HomePage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    navigate(`/wallet/${walletAddress || "addr1x88ttk0fk6ssan4g2uf2xtx3anppy3djftmkg959tufsc6qkqt76lg22kjjmnns37fmyue765qz347sxfnyks27ysqaqd3ph23"}`);
  };

  return (
    <div>
      <section className="HomePage" >
        <div className="container flex" id="home">
          <div className="content">
            <h1 className="title">Search for Your Wallet Address</h1>
            <p className="text">Use the search bar below to find your wallet address. Just type in the address, and we’ll help you locate it. It’s quick and easy!</p>
            <form className="flex form" onSubmit={handleSearch}>
              <input
                className="input"
                type="text"
                placeholder="Enter your wallet address"
                title="Enter an address or click on Search"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <button className="btn" type="submit">Search</button>
            </form>
            {loading && <Loading />}
          </div>
          <div className="nft">
            <img src={homeNFT} alt="image NFT" />
            <h3 className="subtitle name">ArtCrypto</h3>
            <div className="priceDiv flex">
              <p className="number">#00001</p>
              <p className="price">$399</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

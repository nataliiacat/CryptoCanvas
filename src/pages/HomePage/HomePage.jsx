import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import homeNFT from '../../assets/images/homeNFT.png'

const HomePage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (walletAddress) {
      navigate(`/wallet/${walletAddress}`);
    }
  };


  return (
    <div>
      <section className="HomePage" >
        <div className="container flex" id="home">
          <div className="content">
            <h1 className="title">Search for Your Wallet Address</h1>
            <p className="text">Use the search bar below to find your wallet address. Just type in the address, and we’ll help you locate it. It’s quick and easy!</p>
            <form className="flex form" onSubmit={handleSubmit}>
              <input
                className="input"
                type="text"
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <button className='btn' type="submit">Search</button>
            </form>
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

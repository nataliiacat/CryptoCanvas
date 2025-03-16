import React from 'react'
import './Footer.css'
import { AiOutlineGithub, AiFillLinkedin, AiFillFacebook, AiFillInstagram } from "react-icons/ai"

const Footer = () => {
  return (
    <>
      <footer className="footer" id="contact">
        <div className="container flex">
          <div className="footerInner">
            <div className="logo">
              <div className="title flex">Crypto <h1 className="title end">Canvas</h1></div>
            </div>
            <p className="info">©2025 - CryptoCavas.com </p>
          </div>
          <div className="footerInner inner">
            <div className="footerItem">
              <h4 className="subtitle">Menu</h4>
              <ul>
                <li><a className="text" href="#">Home</a></li>
                <li><a className="text" href="#">About</a></li>
                <li><a className="text" href="#">Wallet</a></li>
                <li><a className="text" href="#">Reviews</a></li>
              </ul>
            </div>
            <div className="footerItem">
              <h4 className="subtitle">Information</h4>
              <ul>
                <li><a className="text" href="#">Destinations</a></li>
                <li><a className="text" href="#">Supports</a></li>
                <li><a className="text" href="#">Terms & Conditions</a></li>
                <li><a className="text" href="#">Privacy</a></li>
              </ul>
            </div>
            <div className="footerItem">
              <h4 className="subtitle">Contact Info</h4>
              <ul>
                <li>
                  <a className="text" href="tel:+420720579646">+420 72 057 9646</a>
                </li>
                <li>
                  <a className="text" href="mailto:nataliagricaj6@gmail.com">nataliagricaj6@gmail.com</a>
                </li>
                <li className="text">
                  Republic Square 10, 110 00
                </li>
              </ul>
            </div>
          </div>

          <div className="footerInner">
            <h4 className="subtitle follow">Follow us</h4>
            <ul className="social-link flex">
              <li><a href="https://github.com/nataliiacat"><AiOutlineGithub className="icon" /></a></li>
              <li><a href="https://www.linkedin.com/in/nataliia-hrytsai-968a27309/"><AiFillLinkedin className="icon" /></a></li>
              <li><a href="#"><AiFillFacebook className="icon" /></a></li>
              <li><a href="#"><AiFillInstagram className="icon" /></a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

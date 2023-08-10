import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div className="socialdiv">
            <div className="socialimgs">
                <img src="s1.png" alt="" className="socialimg" />
                <img src="s2.png" alt="" className="socialimg" />
                <img src="s3.png" alt="" className="socialimg" />
                <img src="s4.png" alt="" className="socialimg" />
                <img src="s5.png" alt="" className="socialimg" />
                <img src="s6.png" alt="" className="socialimg" />
            </div>
            <div className='privacylink'>
                <a href="privacy-policy" className='privacy'>Privacy Policy</a>
                <a href="terms-and-conditions" className='privacy'>Terms & Conditions</a>
            </div>
            <p className='privacy'>©2023 Visualio</p>
        </div>
    )
}

export default Footer
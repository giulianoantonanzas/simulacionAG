import * as React from 'react';

const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-logo">
            <h2>Logo</h2>
            </div>
            <div className="footer-nav">
  
                    <ul className="footer-nav--list">
                        <li className="footer-nav--list_item"><a className="link" href="#">   Términos y Condiciones </a></li>
                        <li className="footer-nav--list_item"><a className="link" href="#"> Aviso de Privacidad </a></li>
                    </ul>
            </div>
        </div>
    )
}

export default Footer;
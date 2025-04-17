import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const FooterContainer = styled.footer`
    background: #1a1a1a;
    color: white;
    padding: 4rem 2rem;
    margin-top: 4rem;
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`;

const FooterSection = styled.div`
    h3 {
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
        color: #fff;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-bottom: 0.8rem;
    }

    a {
        color: #ccc;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
            color: #fff;
        }
    }
`;

const FooterBottom = styled.div`
    max-width: 1200px;
    margin: 2rem auto 0;
    padding-top: 2rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    text-align: center;
`;

const Copyright = styled.p`
    color: #ccc;
    font-size: 0.9rem;
`;

function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterSection>
                    <Logo inverted size="small" />
                    <p style={{ color: '#ccc', marginTop: '1rem' }}>
                        Your one-stop destination for the latest streetwear and fashion trends in Egypt.
                    </p>
                </FooterSection>
                <FooterSection>
                    <h3>Shop</h3>
                    <ul>
                        <li><Link to="/shop">All Products</Link></li>
                        <li><Link to="/shop?store=Juvenile">Juvenile</Link></li>
                        <li><Link to="/shop?store=TwentySeven">TwentySeven</Link></li>
                    </ul>
                </FooterSection>
                <FooterSection>
                    <h3>Information</h3>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                    </ul>
                </FooterSection>
            </FooterContent>
            <FooterBottom>
                <Copyright>© {new Date().getFullYear()} EgyDrip. All rights reserved.</Copyright>
            </FooterBottom>
        </FooterContainer>
    );
}

export default Footer; 
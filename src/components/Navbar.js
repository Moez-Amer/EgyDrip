import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo';

const Nav = styled.nav`
    background: #1a1a1a;
    padding: 0.5rem 2rem;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
`;

const LeftLinks = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: flex-end;
    padding-right: 2rem;
    align-items: center;
`;

const RightLinks = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: flex-start;
    padding-left: 2rem;
    align-items: center;
`;

const LogoLink = styled(Link)`
    text-decoration: none;
    display: flex;
    justify-content: center;
`;

const NavLink = styled.button`
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #fff;
        transition: width 0.3s ease;
    }

    &:hover {
        filter: brightness(1.2);
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        
        &:after {
            width: 100%;
        }
    }
`;

const ShopLink = styled(NavLink)`
    position: relative;
    display: inline-block;

    &:hover {
        & > div {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0);
        }
    }
`;

const DropdownMenu = styled.div`
    position: fixed;
    top: 56px;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    background: white;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 0.75rem 1.5rem;
    width: auto;
    min-width: 480px;
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.15s ease-out,
                visibility 0.15s ease-out,
                transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    will-change: transform, opacity;

    &:before {
        content: '';
        position: absolute;
        top: -10px;
        left: 0;
        width: 100%;
        height: 10px;
        background: transparent;
    }

    &:hover {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }
`;

const DropdownLinks = styled.div`
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0;
`;

const DropdownLink = styled(Link)`
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    position: relative;
    transition: color 0.15s ease-out;
    white-space: nowrap;
    padding: 0.25rem 0;

    &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background-color: #000;
        transition: width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    &:hover {
        color: #000;
        
        &:after {
            width: 100%;
        }
    }
`;

function Navbar() {
    const location = useLocation();

    const handleNavClick = (path) => {
        if (location.pathname === path) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <Nav>
            <LeftLinks>
                <NavLink as={Link} to="/" onClick={() => handleNavClick('/')}>
                    Home
                </NavLink>
                <ShopLink as={Link} to="/shop" onClick={() => handleNavClick('/shop')}>
                    Shop
                    <DropdownMenu>
                        <DropdownLinks>
                            <DropdownLink to="/shop?category=t-shirts">T-Shirts</DropdownLink>
                            <DropdownLink to="/shop?category=hoodies">Hoodies</DropdownLink>
                            <DropdownLink to="/shop?category=sweatshirts">Sweatshirts</DropdownLink>
                            <DropdownLink to="/shop?category=pants">Pants</DropdownLink>
                            <DropdownLink to="/shop?category=shorts">Shorts</DropdownLink>
                            <DropdownLink to="/shop?category=jackets">Jackets</DropdownLink>
                        </DropdownLinks>
                    </DropdownMenu>
                </ShopLink>
            </LeftLinks>
            
            <LogoLink to="/">
                <Logo size="small" />
            </LogoLink>
            
            <RightLinks>
                <NavLink as={Link} to="/about" onClick={() => handleNavClick('/about')}>
                    About
                </NavLink>
                <NavLink as={Link} to="/contact" onClick={() => handleNavClick('/contact')}>
                    Contact
                </NavLink>
            </RightLinks>
        </Nav>
    );
}

export default Navbar; 
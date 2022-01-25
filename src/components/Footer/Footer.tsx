import React from 'react';
import { FooterContainer, FooterLink, FooterText } from './Footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        Develop by{' '}
        <FooterLink
          href="https://estebanburgos.com.ar"
          target="_blank"
          rel="noopener noreferrer">
          Esteban Burgos
        </FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;

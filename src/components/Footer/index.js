import React, {useEffect, useState} from 'react';
import {FaYoutube,FaGithub} from 'react-icons/fa'
import {animateScroll as scroll} from 'react-scroll';
import { FooterContainer, FooterWrap, FooterLinksContainer, FooterLinksWrapper, FooterLinkItems, FooterLinkTitle, FooterLink, FooterLinkL, FooterEmail, SocialMedia, SocialMediaWrap, SocialLogo, WebsiteRights, SocialIcons, SocialIconLink} from './FooterElements';

const Footer = ({ toggle }) => {
    const [scrollNav, setScrollNav] = useState(false)
    
    const changeNav = () => {
        if(window.scrollY >= 10){
            setScrollNav(true)
        } else{
            setScrollNav(false)
        }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', changeNav)
    }, []);
  
    const toggleHome = () => {
        scroll.scrollToTop();
    };

  return (
      <FooterContainer>
          <FooterWrap>
              <FooterLinksContainer>
                  <FooterLinksWrapper>
                      <FooterLinkItems>
                        <FooterLinkTitle>About Us</FooterLinkTitle>
                            <FooterLinkL to="/abtpage" target="_blank">Thesis</FooterLinkL>
                            <FooterLinkL to="/privacyact" target="_blank">Privacy Act</FooterLinkL>
                      </FooterLinkItems>
                       {/* If you want to add more footer links */}
                      {/* <FooterLinkItems>
                        <FooterLinkTitle>Lorem</FooterLinkTitle>
                            <FooterLink to="/benchmark">Lorem Ipsum</FooterLink>
                            <FooterLink to="/benchmark">Lorem Ipsum</FooterLink>
                            <FooterLink to="/benchmark">Lorem Ipsum</FooterLink>
                            <FooterLink to="/benchmark">Lorem Ipsum</FooterLink>
                            <FooterLink to="/benchmark">Lorem Ipsum</FooterLink>
                      </FooterLinkItems> */}
                  </FooterLinksWrapper>
                  <FooterLinksWrapper>
                      <FooterLinkItems>
                        <FooterLinkTitle>LinkedIn</FooterLinkTitle>
                            <FooterLink></FooterLink>
                            <FooterLink href="https://www.linkedin.com/in/vince-dela-peña-641324234/" target="_blank">Vince Dela Peña</FooterLink>
                            <FooterLink href="https://www.linkedin.com/in/elnathansalavarria/" target="_blank">Elnathan Salavarria</FooterLink>
                            <FooterLink href="https://www.linkedin.com/in/kynchsilao/" target="_blank" >Kynch Silao</FooterLink>
                      </FooterLinkItems>
                      <FooterLinkItems>
                        <FooterLinkTitle>Email Us</FooterLinkTitle>
                            <FooterEmail to="/benchmark"></FooterEmail>
                            <FooterEmail to="/benchmark"></FooterEmail>
                            <FooterEmail href="mailto:aletheiathesis@gmail.com">Aletheia</FooterEmail>
                            <FooterEmail to="/benchmark"></FooterEmail>
                      </FooterLinkItems>
                  </FooterLinksWrapper>
              </FooterLinksContainer>
              <SocialMedia>
                  <SocialMediaWrap>
                      <SocialLogo to='/' onClick={toggleHome}>
                            Aletheia
                      </SocialLogo>
                      <WebsiteRights> Bridging Bois {new Date().getFullYear()} All rights reserved.</WebsiteRights>
                      <SocialIcons>
                          <SocialIconLink></SocialIconLink>
                          <SocialIconLink href="https://www.youtube.com/channel/UCWkt7xqxQUMbrb_Z-rzaAmw" target="_blank" aria-label="Youtube">
                              <FaYoutube/>
                          </SocialIconLink>
                          <SocialIconLink href="https://github.com/elnathan84/aletheia" target="_blank" aria-label="Github">
                              <FaGithub/>
                          </SocialIconLink>
                      </SocialIcons>
                  </SocialMediaWrap>
              </SocialMedia>
          </FooterWrap>
      </FooterContainer>
  )
};

export default Footer;
import multicar1 from "../../images/multicar1.jpg";
import multicar2 from "../../images/multicar2.jpg";
import multicar3 from "../../images/multicar3.jpg";
import styled from 'styled-components'


export const multiData = [
  multicar1,
  multicar2,
  multicar3,
];


export const Heading = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({lightText}) => (lightText ? '#f7f8fa' : '#010606')};

    @media screen and (max-width: 480px){
        font-size: 32px;
    }
`
export const Subtitle = styled.p`
    max-width: 440px;
    margin-bottom: 35px;
    font-size: 18px;
    line-height: 24px;
    color: ${({darkText}) => (darkText ? '#010606' : '#fff')};
`


export const CarouselOne = {
  paragraph: "hatdog",
  title: "si kynch"
}

export const CarouselTwo = {
  paragraph: "hatdog",
  title: "si vince"
}
export const CarouselThree = {
  paragraph: "hatdog",
  title: "si ej"
}
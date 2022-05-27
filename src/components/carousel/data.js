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
    margin-top: 80px;
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    text-align: center;
    font-weight: 600;
    color: black;
    @media screen and (max-width: 768px){
        font-size: 40px;
    }

    @media screen and (max-width: 480px){
        font-size: 32px;
    }
`
export const Subtitle = styled.p`
    margin-top: 24px;
    margin-bottom: 25px;
    color: black;
    font-size: 24px;
    text-align: center;
    max-width: 600;
    
    @media screen and (max-width: 768px){
        font-size: 24px;
    }

    @media screen and (max-width: 480px){
        font-size: 18px;
    }
`
export const InfoContainer = styled.div`
    background: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 800px;
    position: relative;
    z-index: 1;
    @media screen and (max-width: 768px){
        padding: 100px 0;
    }
`

export const InfoWrapper = styled.div`
    position: absolute;
    padding-top: 300px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    flex-direction: row;
`

export const CardContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    color: "black";
    @media screen and (max-width: 768px){
        padding: 0;
        flex-direction: column;
    }
`

export const CardContents = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    color: black;
    margin-left: 150px;
   
    @media screen and (max-width: 768px){
        margin-left: 0px;
    }
`


//Data for the text
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
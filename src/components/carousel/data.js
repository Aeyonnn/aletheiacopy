import multicar1 from "../../images/multicar1.jpg";
import multicar2 from "../../images/multicar2.jpg";
import multicar3 from "../../images/multicar3.jpg";
import styled from 'styled-components'


export const multiData = [
  multicar1,
  multicar2,
  multicar3,
];

export const Heading = styled.p`
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 1.1;
    font-weight: 600;

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
export const IdContainer = styled.div`
    @media screen and (max-width: 768px){
        padding: 100px 0;
    }
`

export const carouselobjectone = {
  id: '1',
  headline: 'hatdog',
  subtitle: 'si lorem'
}
export const carouselobjecttwo = {
  id: '2',
  headline: 'hatdog',
  subtitle: 'si cong'
}
export const carouselobjectthree = {
  id: '3',
  headline: 'hatdog',
  subtitle: 'si kynch'
}
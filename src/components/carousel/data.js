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
    margin-top: 6px;
    margin-bottom: 25px;
    color: black;
    font-size: 24px;
    text-align: justify;
    max-width: 600;
    
    @media screen and (max-width: 840px){
        font-size: 24px;
        margin-top: -40px;
        margin-left: 12px;
        margin-top: 10px;
    }

    @media screen and (max-width: 480px){
        font-size: 18px;
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 10px;
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
    text-align: center;
    justify-content: center;
    color: "black";
    @media screen and (max-width: 840px){
        margin-top: -100px;
        padding: 0;
        text-align: justify;
    }
    @media screen and (max-width: 768px){
        margin-top:  50px;
        padding: 0;
        flex-direction: column;
        text-align: justify;
    }

`

export const CardContents = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    color: black;
   
    @media screen and (max-width: 768px){
        margin-left: 0px;
    }
`


//Data for the text
export const CarouselOne = {
  paragraph: "A procedure for solving a problem or performing a computation is referred to as an algorithm. Algorithms are a precise set of instructions that perform specified actions in either hardware or software-based routines. Algorithms are also used as data processing specifications and play an important role in automated systems.These are Adaboost, Decision Tree, KNN, Logistic Regression, Naïve Bayes, Neural Network(MLP), Random Forest, Support Machine Vector.",
  title: "Algorithm"
}

export const CarouselTwo = {
  paragraph: "A data set is an ordered grouping of data. Data, as we know, is a collection of information obtained through observations, measurements, study, or analysis. It could contain facts, numbers, figures, names, or even basic descriptions of objects..The Dataset used to train the model for this project was built using web scrappers.",
  title: "Dataset"
}
export const CarouselThree = {
  paragraph: "Using the Ensamble Voting Classifier, the researchers of this project tested all possible combination from the first 9 algorithms. These test was conducted in 5 different datasets to show the uniqueness of each combination. The list of combination results was ran through Correlational Analaysis to determine the most unique combination for each test and get the top performing combination.",
  title: "Aletheia"
}
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import { Avatar } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import {Heading,Subtitle,CarouselOne,CarouselTwo,CarouselThree, InfoContainer, InfoWrapper,CardContainer, CardContents} from './data'

const PreviousBtn = (props) => {
  console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "black", fontSize: "45px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "black", fontSize: "45px" }} />
    </div>
  );
};
const Carousel = () => {
  return (
    <div className="container">
    <div
      className="carousel">
      <div style={{ width: "80%", textAlign: "center" }}>
        <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} dots>
          <Card  {...CarouselOne}/>
          <Card  {...CarouselTwo}/>
          <Card  {...CarouselThree}/>
        </Slider>
      </div>
    </div>
    </div>
  );
};

const Card = ({ title, paragraph }) => {
  return (
    <CardContainer id="card">
      <CardContents>
      <Heading>{title}</Heading>
      <Subtitle>{paragraph}</Subtitle>
      </CardContents>
    </CardContainer>
  );
};

export default Carousel;
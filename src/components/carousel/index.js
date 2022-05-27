import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import { Avatar } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import multicar1 from "../../images/multicar1.jpg";
import multicar2 from "../../images/multicar2.jpg";
import multicar3 from "../../images/multicar3.jpg";
import {Heading,Subtitle,CarouselOne,CarouselTwo,CarouselThree, InfoContainer, InfoWrapper} from './data'

const PreviousBtn = (props) => {
  console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "black", fontSize: "45px"
    }} />
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
      <InfoContainer id="carousel">
        <InfoWrapper>
        <h1 style={{ marginTop: -120,marginBottom: 100 }}>Lorem Ipsum</h1>
        <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} dots>
          <Card img={multicar1} {...CarouselOne}/>
          <Card img={multicar2} {...CarouselTwo}/>
          <Card img={multicar3} {...CarouselThree}/>
        </Slider>
        </InfoWrapper>
      </InfoContainer>
  );
};

const Card = ({ img, title, paragraph }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "black",
      }}
    >
      <Avatar
        imgProps={{ style: { borderRadius: "50%" } }}
        src={img}
        style={{
          width: 120,
          height: 120,
          border: "1px solid lightgray",

        }}
      />
      <Heading>{title}</Heading>
      <Subtitle>{paragraph}</Subtitle>
    </div>
  );
};

export default Carousel;
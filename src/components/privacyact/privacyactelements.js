import styled from "styled-components";
import { Link } from "react-router-dom";
export const Container = styled.div`
    background-color: #33415C;

`
export const ParagraphContainer = styled.div`
    width: 80%;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    text-align: justify;
    @media screen and (max-width: 768px){
    text-align: left;
    }
`
export const Paragraph = styled.p`
    color: #f7f8fa;
    font-size: 1rem;
`
export const NavLogo = styled(Link)`
    color: #f7f8fa;
    cursor: pointer;
    font-size: 3rem;
    display: flex;
    align-items: center;
    margin-left: 36px;
    font-weight: bold;
    text-decoration: none;
    background-color: #33415C;
    @media screen and (max-width: 768px){
    text-align: left;
    margin-left: 48px;
    }
`
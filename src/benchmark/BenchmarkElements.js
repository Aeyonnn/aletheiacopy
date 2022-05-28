import styled from 'styled-components'
import { Link as LinkR} from 'react-router-dom';

// export const Icon = styled(LinkR)`
//     position: fixed;
//     margin-left: 32px;
//     margin-top: 32px;
//     text-decoration: none;
//     color: #33415C;
//     font-weight: 700;
//     font-size: 32px;
//     @media screen and (max-width: 480px){
//         margin-left: 16px;
//         margin-top: 8px;
//     }
// ` 
export const Container = styled.div`
    background: #EDEDED;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    align-items: center;
    justify-content: center;
    @media screen and (max-height:780px) {
        height: auto;
        width: auto;
    }
`
export const FormWrap = styled.div`
    height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 150px;

    @media screen and (max-width: 400px){
        height: auto;
    }
`
export const FormContent = styled.div`
    height: 100%;
    margin: auto;
    padding: .625rem;
    border: 10rem;
    @media screen and (max-width: 480px){
        padding: 10px;
        width: 100%;
    }
`
export const FormLoader = styled.div`
    height: 360px;
    margin: auto;
    width: auto;
    padding: .625rem;
    border: 10rem;
    @media screen and (max-width: 480px){
        padding: 10px;
    }
`
export const ContentTable = styled.div`
    height: 360px;
    margin: auto;
    padding: .625rem;
    border: 10rem;
    @media screen and (max-width: 480px){
        display: flex;
        padding: 10px;
    }
`
export const NavBtnLink = styled(LinkR)`
    border-radius: 50px;
    background: #33415C;
    white-space: nowrap;
    padding: 10px 22px;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

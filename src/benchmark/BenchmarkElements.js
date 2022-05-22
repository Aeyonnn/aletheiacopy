import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Icon = styled(Link)`
    position: fixed;
    margin-left: 32px;
    margin-top: 32px;
    text-decoration: none;
    color: #33415C;
    font-weight: 700;
    font-size: 32px;
    @media screen and (max-width: 480px){
        margin-left: 16px;
        margin-top: 8px;
    }
` 
export const Container = styled.div`
    height: 1080px;
    background: #EDEDED;
    height: 100vh;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: auto;
    align-items: center;
    justify-content: center;
    @media screen and (max-height:375px) {
        max-height: 375px;
        max-width: 667px;
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


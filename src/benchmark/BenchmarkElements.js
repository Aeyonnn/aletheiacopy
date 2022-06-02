import styled from 'styled-components'
import { Link as LinkR} from 'react-router-dom';


export const ContainerWhole = styled.div`
    background: #EDEDED;
    @media screen and (max-width: 768px){
        padding: 100px 0;
        width: 100%;
        
    }
`
export const ContainerWholeAdmin = styled.div`
    background: #EDEDED;
    height: 1080px;
    @media screen and (max-width: 768px){
        padding: 100px 0;
        height: 1080px;
    }
`

export const Container = styled.div`
    background: #EDEDED;
    height: auto;
    @media screen and (max-width: 768px){
        padding: 100px 0;
        
    }
`
export const ContainerAdmin = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 100px;
    @media screen and (max-width: 768px){
        flex-direction: column;
    }
`
export const ContainerAdminShow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 100px;
    @media screen and (max-width: 768px){
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
`
export const ContainerAdminButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5px;
    @media screen and (max-width: 768px){
        margin-top: 20px;
        flex-direction: column;
    }
`
export const ContainerTable = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;
    @media screen and (max-width: 768px){
        padding-top: 100px;
    }
`
export const ContainerTableAdminSum = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media screen and (max-width: 768px){
        flex-direction: column;
        margin-top: -100px;
    }
`

export const Button = styled.button`
    border-radius: 50px;
    background: #002855;
    white-space: nowrap;
    padding: 12px 24px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #5C677D;
    }
    @media screen and (max-width: 768px){
        font-size: 14px;
    }
`

export const FormWrap = styled.div`
    height: 360px;
    width: 100%;
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -140px;
    @media screen and (max-width: 480px){
        padding: 10px;
        width: 100%;
        margin-bottom: 200px;
    }
`
export const FormLoader = styled.div`
    height: 120px;
    margin: auto;
    width: auto;
    border: 10rem;
    margin-top: -200px;
    @media screen and (max-width: 480px){
        padding: 10px;
    }
`
export const ContentTable = styled.div`
    height: 380px;
    margin: auto;
    border: 10rem;
    display: flex;
    justify-content: center;
    background-color: #EDEDED;
    margin-top: -360px;
    @media screen and (max-width: 480px){
        display: flex;
        padding: 10px;
        margin-bottom: 100px;
    }
`
export const ContentTableHistory = styled.div`
    height: 380px;
    margin: auto;
    border: 10rem;
    display: flex;
    justify-content: center;
    background-color: #EDEDED;
    margin-top: 50px;
    @media screen and (max-width: 480px){
        display: flex;
        padding: 10px;
    }
`
export const ContentTableAdmin = styled.div`
    height: 380px;
    margin: auto;
    border: 10rem;
    display: flex;
    justify-content: center;
    background-color: #EDEDED;
    width: 100%;
    @media screen and (max-width: 480px){
        display: flex;
        padding: 10px;
    }
`
export const ContentTableAdminSummary = styled.div`
    height: 60px;
    margin: auto;
    border: 10rem;
    display: flex;
    justify-content: center;
    background-color: #EDEDED;
    width: 100%;
    margin-bottom: 200px;
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

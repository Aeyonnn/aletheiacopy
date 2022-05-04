import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    height: 1080px;
    background: #EDEDED;
    display: flex;
    height: 100vh;
    width: 100%;
    flex-direction: column;
    row-gap: 20px;
    
`
export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px){
        height: 80%;
    }
`
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
export const FormContent = styled.div`
    height: 50%;
    display: flex;
    margin: auto;
    width: 50%;
    padding: .625rem;
    border: 10rem;
    @media screen and (max-width: 480px){
        padding: 10px;
    }
`
export const SearchInputs = styled.div`
    margin-top: 105px;
    display: flex;
    justify-content: center;
`
export const IconSearch = styled.div`
    height: 3.75rem;
    width: 3.125rem;
    background-color: #fff;
    display: grid;
    place-items: center;
`
export const Search = styled.div`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
    width: 800px;
`

export const input = styled.input`
    background-color: #fff;
    border: 0;
    border-radius: .125rem;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    font-size: 1.125rem;
    padding: 0.9375rem;
    height: 1.875rem;
    width: 1.75rem;
`

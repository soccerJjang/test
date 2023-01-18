import styled from "styled-components";



export const VideoBackground = styled.View`
    display: flex;
    align-items: center;
    width:100%;
    background-color: #fff;
    padding : 68px 53px;
   

`


export const VideoBox = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width:270px;
    height:350px;
    background-color: blue;
`

export const PlayBtn = styled.Image`

    width:92px;
    height:92px;
`

export const VideoBtnBox = styled.View`
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width:100%;
    height:200px;
    background-color: black;
`

export const SaveBtn = styled.TouchableOpacity`
    display:flex;
    justify-content: center;
    width: 165px;
    height:60px;
    border-radius: 12px;
    background-color: #ffffff;
`

export const AppendBtn = styled.TouchableOpacity`
    display:flex;
    justify-content: center;
    width: 165px;
    height:60px;
    border-radius: 12px;
    background-color: #fff;
    margin-left: 5px;
`

export const BtnText = styled.Text`
    font-size: 16px;
    text-align: center;
    color:#000000;
    font-weight: 700;    
`
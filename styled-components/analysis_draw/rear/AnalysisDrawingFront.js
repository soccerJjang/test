import styled from "styled-components/native";


export const AnalysisRearWrap = styled.ScrollView`
    
`;

export const DrawingTabMenuBox = styled.View`
    display:flex;
    flex-direction: row;
    margin-top:31px;
    width:100%;
   
`;

export const DrawingTabMenu = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    width:79px;
    height:36px;
    background-color:${(props)=>props.bgColor ? "#171C61" : "#fff"};
    border-radius: 50px;
`;

export const DrawingTabMenuTextOn = styled.Text`
    font-weight: ${(props=>props.fontW ? 700 : 400)};
    font-size: 14px;
    color:${(props)=>props.color ? "#fff" : "#222222"};
`;

export const DrawingContentBox = styled.View`
    margin-top: 16px;
    width:100%;
    height:430px;
    background-color: beige;
    border-radius: 16px;
`;

export const DrawingImageBox = styled.Image`
    margin-top: 16px;
    width:100%;
    height:430px;
    border-radius: 16px;
`;

export const DrawingButtonBox = styled.View`
    display:flex;
    flex-direction: row;
    position:relative;
    margin-top:52px;
`;

export const DrawingCircle = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content:center;
    width:60px;
    height:60px;
    border-radius: 50px;
    background-color: #efefef;
`;

export const DrawingImg = styled.ImageBackground`
    width:24px;
    height:24px;   
`;

export const DrawingCircleEdit = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content:center;
    position: absolute;
    right:0;
    width:60px;
    height:60px;
    border-radius: 50px;
    background-color: #000000;
`;

export const DrawingCircleEditAll = styled.View`
    display: flex;
    align-items: center;
    padding : 18px 0 ;
    width:60px;
    background-color: #000000;
    border-radius: 50px;    
`;

export const EditImage = styled.Image`
    margin-top:20px; 
    width:24px;
    height:24px;
`;
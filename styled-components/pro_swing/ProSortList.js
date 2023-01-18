import styled from "styled-components/native";


export const ProSortMainContainer = styled.View`
    display: flex;
    flex-direction: column;
`;

export const ProSortCommonContainer = styled.ScrollView`
    position:relative;
    width: 100%;
    height: 100%;
    background-color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 40px 20px 0;
`

export const ProSortTitle = styled.Text`
    margin-bottom: 24px;
    font-weight: 400;
    font-size: 24px;
`;

export const ProListContainer = styled.View`
    display: flex;
    flex-wrap: wrap;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    width:100%;
  
   `;
export const ProListBox = styled.TouchableOpacity`
    width: 160px;
    padding-bottom:34px;
`;
export const ProImage = styled.Image`
    width: 160px;
    height: 130px;
    border-radius:12px;
`;
export const ProTitle = styled.Text`
    margin-top: 10px;
    font-weight: 700;
    font-size: 16px;
    color: #222222;

`;

export const ProEtcContainer = styled.View`
    display: flex;
   
    flex-direction:row;
    padding-top:10px;
    justify-content: space-between;

`;
export const ProEtcLeftCont = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex:1;
 
`
export const ProEtcRightCont = styled.View`
    flex:1;
`

export const LikeBtn = styled.View`

`
export const ProEtcIcon = styled.Image`
    width:12px;
    height:11px;
     
`;
export const ProEtcText01 = styled.Text`
    padding-left:3px;
`;
export const ProEtcText02 = styled.Text`
    text-align: right;
     color: #666666;    
`;



import { exp } from "react-native-reanimated";
import styled from "styled-components/native";



export const RankingWrap = styled.ScrollView`
    display: flex;
    flex-direction: column;
`;

/* header */
export const RankingHeader = styled.View`
    display: flex;
    position: relative;
    margin : 30px 30px 0;
   
`;
export const RankingPreface = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width:120px;
    height:30px;
    background-color: #e63312;
    border-radius: 50px;
`
export const RankingTriangle = styled.Image`
    position:absolute;
    top:25px;
    left:5px;
`

export const PrefaceText = styled.Text`
    font-size: 14px;
    color:#fff;
`
export const RankingHeaderTitle = styled.Text`
    margin-top: 45px;
    font-size: 700px;
    font-size: 32px;
    color:#fff;
`
export const RankingHeaderSub = styled.Text`
    margin-top:7px;
    color:#fff;
    font-size: 16px;
`
/* Graph */
export const RankingGraph = styled.View`
    display: flex;
    margin-top:40px;
    align-items: center;
`;
export const Pentagon = styled.ImageBackground`
   position: relative;
   width:191px;
   height:191px;
   margin-top:10px;
`
export const GraphText1 = styled.Text`position: absolute;top:-27px;left:43.5%;color:#fff;`
export const GraphText2 = styled.Text`position: absolute;top:53px;left:-30px;color:#fff;`
export const GraphText3 = styled.Text`position: absolute;top:53px;right:-30px;color:#fff;`
export const GraphText4 = styled.Text`position: absolute;bottom:-25px;left:10px;color:#fff;`
export const GraphText5 = styled.Text`position: absolute;bottom:-25px;right:25px;color:#fff;`
/* Tab */
export const RankingTab = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;    
    margin : 66px 40px 2px; 
`;
export const RankingTabMenu =styled.TouchableOpacity`
    display: flex;
    align-items: center;
    flex:1;
   
`

export const RankingTabList = styled.View`
    width:60px;
    text-align: center;
    font-weight: 700;
    padding-bottom:15px;
`
export const RankingTabListOn = styled.View`
    width:60px;
    text-align: center;
    font-weight: 700;
    padding-bottom:15px;
`
export const RankingTabText = styled.Text`
    text-align: center;
    width:60px;
`
export const RankingTabTextOn = styled.Text`
    text-align: center;
    width:60px;
    
`
/* Content */
export const RankingContent = styled.View`
    display: flex;
    overflow: hidden;
    min-height: 500px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`; 




/* 0503 */

export const RankBox = styled.View `
    position: relative;
    display: flex;
    flex-direction: row;
    padding : 24px 24px;
    margin-bottom:12px;
    width:100%;
    background-color:${(props)=> props.bgColor ? "#171C61" : "#fff"};
    border-radius: 12px;
`
export const RankBox2 = styled.View `
position: relative;
    display: flex;
    flex-direction: row;
    padding : 24px 24px;
    margin-bottom:12px;
    width:100%;
    background-color:${(props)=> props.bgColor ? "#171C61" : "#fff"};
    border-radius: 12px;
`

export const RankBoxImg = styled.ImageBackground`
    margin-top:8px;
    width:48px;
    height:48px;
 `;

 export const RankTextBox = styled.View`
    
 `;
 export const RankTextBox2 = styled.View`
 
`;
/* 랭킹 타이틀 */
export const ListGoldTitle = styled.Text`
        padding-left:16px;
        color:#FDE61A;
        font-weight: 700;
`;
export const ListOrgTitle = styled.Text`
        padding-left:16px;
        color:#FF7A00;
        font-weight: 700;
`
export const ListRedTitle = styled.Text`
        padding-left:16px;
        color:#E63312;
        font-weight: 700;
`
export const ListBlackTitle = styled.Text`
        padding-left:16px;
        color:#000000;
        font-weight: 700;
`
export const ListBrownTitle = styled.Text`
        padding-left:16px;
        color:#A6450E;
        font-weight: 700;
`

export const ListSilverTitle = styled.Text`
        padding-left:16px;
        color:#999999;
        font-weight: 700;
        `;
export const ListBronzeTitle = styled.Text`
        padding-left:16px;
        font-weight: 700;
        color:#A6450E;
        `;


export const ListName = styled.Text`
        padding-left:16px;
        font-size: 24px;
        color: ${(props) => props.color  ? "white" : "black"};
`
export const ListName02 = styled.Text`
 
        font-size: 24px;
        color: ${(props) => props.color  ? "white" : "black"};
`;

export const ListPercent = styled.Text`
    color:${(props)=>props.color ? "white" : "black"};
    font-size: 12px;
    padding-top:12px;
    padding-left:16px;
`

export const ListPercent2 = styled.Text`
    color:${(props)=>props.color ? "white" : "black"};
    font-size: 12px;
    padding-top:12px;    
`;



export const ListName2 = styled.Text`
        font-size: 24px;
        color: ${(props) => props.color  ? "white" : "black"};
`

export const ListTextBold = styled.Text`
    font-weight: 700;
    color:${(props)=>props.color ? "white" : "black"};
    font-size: 12px;
    padding-top:4px;
`

/* basic box */

export const RankingBasicBox = styled.View`
    display: flex;
    flex-wrap:wrap;
    width:100%;
    margin-bottom:12px;
    padding : 24px 0 12px 22px;
    elevation:5;
    background:#fff;
    border-radius: 12px;
`
export const ListBasicTitle = styled.Text`
    color:#000;
    font-weight: 700;
    font-size: 12px;
`
export const ListBasicName = styled.Text`
    color:#000;
    padding-top:2px;
    font-size: 20px;
`

export const ListPercentBox = styled.View`
    display: flex;
    flex-direction: row;
    
`
export const ListBasicPercent = styled.Text`
    color:#000;
    padding-top:12px;
    font-size: 12px;    
    padding-right:94px;
`

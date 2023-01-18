import { exp } from "react-native-reanimated";
import styled from "styled-components/native";



export const ProViewWrap = styled.View`
    display: flex;
    position:relative;
    padding : 0 20px;
    background-color:#fff;

`

export const ProfileBox = styled.View`
    position:absolute;
    top:-30px;
    left:20px;
    right:20px;
    padding: 24px 30px 24px;
    height:145px;
    background: #FFFFFF;
    elevation: 5;
    border-radius: 16px;
    zIndex:10;
    shadowOpacity : 0.5;
    shadowRadius : 4.45px;
    elevation : 10;
   
`;

export const ProfileImgBox = styled.View`
    width:100%;
    height:252px;
    zIndex:-1;
    background-color:#171C61 ;
    
 
`;

export const ProfileImg = styled.Image`
    width:100%;
    height:100%;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    
`;


export const ProfileFirst = styled.View`
    display:flex;
    flex-direction : row;
    justify-content:space-between;
  
`;
export const ProfileTitle = styled.Text`
    font-weight: 700;
    font-size: 20px;
    color:#000000;

`;
export const ProfileRightBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const ProFileHeartBtn = styled.Image`
    width:12px;
    height:11px;
`
export const ProfileBtn = styled.Text`
     padding-left:3px;
     font-weight: 700;
     font-size: 14px;

`;

export const ProfileTwo = styled.View`
    display:flex;
    flex-direction : row;
    padding-top:28px;
    width:100%;
    
   
`;

export const ProfileBirth = styled.View`
    flex:1;
    borderRightWidth : 1px;
    borderRightColor : #DDDDDD;   
    text-align: center;
    `;
export const ProfileBody = styled.View`    
    flex:1;
    padding-left:30px;
`;

export const ProfileNum = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color:#222222;
   

`;
export const ProfileText = styled.Text` 
    padding-top:6px;
    font-size:14px;
    font-weight: 600;
    color: #666666;


`;

export const StoryCont = styled.View`
    display:flex;
    position:relative;
    width:100%;
    margin-top:145px;
`;


export const StoryText = styled.Text`
    margin-top:10px; 
    font-size:14px;
    font-weight:400;
    color:gray;
`;



export const Awards = styled.View`
    margin-top:60px;
    width:100%;

    
`;

export const AwardsCont = styled.View`
    display: flex;
    justify-content: center;
    position:relative;
    margin-top:16px;
    padding: 20px 20px;
    width:100%;
    height: 120px;
    background-color: #f5f5f5;
    border-radius: 12px;
`;

export const AwardsList = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width:100%;
`;
export const AwardsList2 = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 16px 0;

`;

export const Tour = styled.Text`
    font-weight: 600 ;
    font-size: 14px;
`;

export const Wins = styled.Text`
    font-weight: 600 ;
    font-size: 14px;

    color: #777777;
`;

export const VideoCont = styled.View`
    margin-top:60px;

`;

export const VideoBox = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top:10px;
    width:100%;
    
`;

export const VideoList = styled.View`
    display: flex;
    flex-direction: column;
    margin-bottom:33px;
    width:160px;
    height:140px;
`;

export const VideoImg = styled.Image`
    width:160px;
    height:90px;
`

export const VideoTit = styled.Text`
    margin-top:10px;
`;

export const VideoSub = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between ;
    width:100%;
`;


export const VideoBox1 = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const VideoBox2 = styled.View`
    display: flex;
`;

export const VideoSubImg = styled.Image`
    width:12px;
    height:11px;
`;
export const VideoSubNum = styled.Text`
    padding-left:2px;
    font-weight: 400;
    font-size: 12px;
   
`;

export const VideoSubDay = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: #666666;
`;

export const PageButtonOn1 = styled.TouchableOpacity `
display: flex;
align-items: center;
justify-content: center;
bottom: 24px;
width: 100%;
height:60px;
margin: 40px 0 20px 0;
text-align: center;
border-radius: 12px;
background: #000;
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
color: #FFFFFF;
font-weight: 600;
font-size: 16px;
`

export const ButtonText = styled.Text`
    color:#fff;
    text-align: center;
`

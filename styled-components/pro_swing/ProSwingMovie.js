import styled from "styled-components/native";



export const ProSwingMovieContainer = styled.ScrollView`
    display: flex;
    flex-direction: column;
    `;

export const ProSwingBestTitle = styled.Text`
    font-size:24px;
    font-weight: 400;
`


export const ProSwingVideoCont = styled.View`
    display: flex;
    flex-direction: row;
    width:100%;
    margin-top:24px;
    background-color: #fff;
    border-radius:  12px; 
    

  
`;
export const ProSwingVideoList = styled.View`
    display: flex;
    position:relative;
    background-color: #fff;
    margin-right:16px;
    width:315px;
    elevation: 5;
    shadowOpacity : 0.3;
    shadowRadius : 4px;

    border-radius: 16px;
    background-color:#fff;
`;
export const ProSwingSubBox = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 16px 0 21px 0 ;
    
    
   
`;
export const ProSwingVideo = styled.View`
    width:100%;
    height:176px;
    background-color: rgba(0,0,0,0.5);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    
`;
export const VideoText = styled.Text`
    margin : 20px;
    width:60px; 
    height:20px;
    text-align: center;
    color :#fff;
    border:1px solid #fff;
    
`;

export const PlayBtn = styled.TouchableOpacity`
    position: absolute;
    left:45%;
    top:45%;
    width:40px;
    height:40px;
    border:1px solid #fff;
    border-radius: 50px;
    
`
export const ClickBtn = styled.Image`
    width:16px;
    height:16px; 
    left:13px;
    top:10px;

`

export const ProSwingImg = styled.Image`
    margin-left:20px;
    width:40px;
    height:40px;
    background-color: red;
    border-radius: 50px;


`;

export const ProSwingTextBox = styled.View`
    display: flex;
    justify-content: center;
    padding-left:10px;


    `
export const ProSwingMainText = styled.Text`
   font-weight:600;
   font-size:16px;
   color:#000000;
`;

export const ProSwingSubText = styled.Text`
    font-weight: 400;
    font-size: 14px;
    color:#666666;
`;


// swing list start


export const ProSwingListContainer = styled.View`
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content: space-between;
 
`;
export const ProSwingListTitle = styled.Text`
    margin-top:60px;
    font-weight: 700;
    font-size:18px;
    
    `;

export const ProListBox = styled.TouchableOpacity`
    margin-top:24px;
    background:#fff;
 
`;

export const ProImage = styled.Image `
    border-radius: 5px;
    width: 160px;
    height: 130px;

`;

export const ProName = styled.Text`
    padding-top:10px;
    font-weight: 700;
`;

export const ProLikeBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top:10px;
`;

export const ProLikeBtn = styled.Image`
    width:12px;
    height:11px;
`;

export const ProLikeNum = styled.Text`
    padding-left:3px;
`;


import styled from "styled-components";

export const AddressContainer = styled.ScrollView `
    margin: 0 10px 30px 10px;
`

export const AddressImageView = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const AddressImage = styled.Image`
    position: relative;
    flex: 1;
    align-items: center;
    width: 350px;
    height: 500px;
    border-radius: 16px;
`
export const AddressButtonView = styled.View`
    margin-top: 40px;

`
export const AddressAntDesignView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const AntDesignView = styled.View`
    justify-content: center;
    width: 60px;
    height: 60px;
    margin-right: 10px;
    background-color: #EEEEEE;
    border-radius: 30px;
    align-items: center;
`

export const AntDesignDownloadView = styled.View`
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: #000000;
    border-radius: 30px;
    align-items: center;
`


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
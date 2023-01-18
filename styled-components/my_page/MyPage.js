import styled from "styled-components/native";

export const UserInfoLayer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const UserImage = styled.Image`
    width:50px;
    height: 50px;
    margin-left: 24px;
`;

export const UserName = styled.Text`
    font-weight: 400;
    font-size: 24px;
    line-height: 27px;
    color: #222222;
    margin-left: 8px;
`;

export const MyInfo = styled.View`
    display: flex;
    justify-content: center;
    position:relative;
    margin:24px 0;
    padding: 12px 20px;
    width:100%;
    /* height: 120px; */
    background-color: #f5f5f5;
    border-radius: 12px;
`;

export const MyInfoList = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width:100%;
    margin : 8px 0;
`;

export const MyInfoTitle = styled.Text`
    font-weight: 600 ;
    font-size: 14px;
`;

export const MyInfoValue = styled.Text`
    font-weight: 400 ;
    font-size: 14px;
    color: #777777;
`;

export const ButtonContainer = styled.View`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    padding:25px 0;
`;

export const ButtonTitle = styled.Text`
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
    color: #222222;
`;

export const Border = styled.View`
    width: 100%;
    height: 1px;
    background: #E6E6E6;
`

export const EtcContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
`;
export const EtcTextContainer = styled.View`
    display: flex;
    flex-direction: row;
`;

export const EtcText = styled.Text`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #666666;
`;

export const MarginView = styled.View`
    margin : 0 12px;
`;






import styled from "styled-components/native";

// draw common
export const DrawContainer = styled.ScrollView`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;
export const DrawIcon = styled.Image`
    width:30px;
    height: 30px;
    margin: 20px 0;
`;
export const DrawTouchable = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 70px;
    margin-left:24px;
`;

export const BoundaryLine = styled.View`
    height: 1px;
    background-color: #E6E6E6;
    margin: 8px 14px 8px 16px;
`;

// User Layer
export const UserInfoLayer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #171C61;
    height: 150px;
    padding-top: 20px;
`;
export const UserImage = styled.Image`
    width:60px;
    height: 60px;
    margin-left: 150px;
    margin-bottom: 45px;
`;
export const UserName = styled.Text`
    margin-left: 8px;
    margin-right: 35px;
    color: white;
    font-size: 18px;
`;
export const UserTouchable = styled.TouchableOpacity`
    margin-left:12px;
`;

// OndDepth Layer
export const OneDepthLayer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 69px;
`;

export const OneDepthTitle = styled.Text`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    margin: 25px 9px;
`;

// TwoDepth Layer
export const TwoDepthLayer = styled.View`
    height: auto;
`;
export const TwoDepthTitle = styled.Text`
    font-size: 14px;
    font-weight: 400;
    margin: 12px 66px;
`;










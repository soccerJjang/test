import styled from "styled-components/native";

export const InfoSetWrap = styled.ScrollView`
    position:relative;
    width: 100%;
    height: 100%;
    background-color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 40px 20px 0;
`
export const InfoText = styled.Text`
    margin-bottom: 9px;
    font-size: 14px;
    font-weight: 600;
    color: #1E1E1E;
`
/*
export const TextInput = styled.TextInput`
    position: relative;
    flex:0.7 ${(props) => props.nickname ? 0.7 : 1};
    height: 52px;
    margin-bottom: 16px;
    padding: 14px 18px;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
    font-size: 16px;
    color: #000;
`;
*/

export const TextInput = styled.TextInput`
    position: relative;
    width: 100%;
    height: 52px;
    margin-bottom: 40px;
    padding: 14px 18px;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
    font-size: 16px;
    color: #000;
`
export const NicknameBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 40px;
`
export const Nickname = styled.TextInput`
    flex: 1;
    height: 52px;
    padding: 14px 18px;
    font-size: 16px;
    font-weight: 400;
    color: #000;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
    margin-right: 4px;
`
export const CheckBtn = styled.Text`
    width: 99px;
    height: 52px;
    padding-top: 15px;
    border-radius: 6px;
    overflow: hidden;
    font-size: 16px;
    color: #fff;
    background: #171C61;
    text-align: center;
`

export const UpdateButton = styled.Text`
    width: 100%;
    padding: 20px 0;
    text-align: center;
    /*
    border: 1px solid #EEEEEE;
    border-radius: 16px;*/
    margin: 60px 0;
    background: ${(props) => (props.agree ? "#000000" : "#DADADA")};
    color: ${(props) => (props.agree ? "#FFFFFF" : "#FFFFFF")};
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
`
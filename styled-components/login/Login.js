import styled from "styled-components/native";
export const LoginContainer = styled.View`
    padding-top: 10px;
`
export const JoinContainer = styled.ScrollView`
    background: #fff;
`
export const LoginInputContainer = styled.View`
`
export const LoginText = styled.Text`
    margin-bottom: 9px;
    font-size: 14px;
    font-weight: 600;
    color: #1E1E1E;
`
export const LoginInput = styled.TextInput`
   border: 1px solid gray;
   width: 100%;
`
export const TextInput = styled.TextInput`
    position: relative;
    width: 100%;
    height: 52px;
    margin-bottom: 16px;
    padding: 14px 18px;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
    font-size: 16px;
    color: #000;
`
export const TextInputFocus = styled.TextInput`
    width: 100%;
    height: 52px;
    margin-bottom: 16px;
    padding: 14px 18px;
    border: 1px solid #171C61;
    border-radius: 6px;
    font-size: 16px;
    color: #000;
`
export const BottomTextContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    font-size: 16px;
    font-weight: 600;
`
export const JoinPwd = styled.View`
    color: #666666;
    font-weight: 600;
    display: flex;
    flex-direction: row;
`
export const LoginButtonContainer = styled.Text`
    padding: 20px 0;
    text-align: center;
    border-radius: 12px;
    background: #DADADA;
    color: #666666;
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
`
export const AutoLogin = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
export const IcoCircle = styled.View`
    width: 24px;
    height: 24px;
`;
//Join페이지
export const ConTitle = styled.Text`
    font-size: 24px;
    line-height: 34px;
    color: #222;
`;
export const FloatingBox = styled.View`
    position: absolute;
    bottom: 103px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`;
export const ImgKakao = styled.View`
    width: 60px;
    height: 60px;
`;
export const ImgNaver = styled.View`
    width: 60px;
    height: 60px;
`;
export const BorderBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 40px 0 4px;
    padding: 26px 10px 26px 24px;
    border: 1px solid #EEEEEE;
    border-radius: 12px;
    font-size: 16px;
    color: #222;
    font-weight: 700;
`;
export const BorderBoxOn = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 40px 0 4px;
    padding: 26px 10px 26px 24px;
    background: #171C61;
    border: 1px solid #EEEEEE;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
`;
export const BlackText = styled.Text`
    font-size: 16px;
    color: #222;
    font-weight: 600;
`;
export const WhiteText = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: 600;
`;
export const AgreeAll = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin-right: 12px;
    border: 1px solid #ddd;
    border-radius: 12px;
`;
export const AgreeAllOn = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin-right: 12px;
    border: 1px solid #5CEEA7;
    background: #5CEEA7;
    border-radius: 12px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
`;
export const AgreeList = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px 0 16px;
    margin-top: 40px;
    font-size: 16px;
    font-weight: 700;
`;
export const AgreeCon = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
`
export const LookBtn = styled.Text`
    font-size: 14px;
    color: #222;
    font-weight: 700;
    opacity: 0.5;
`
export const PrivacyWrap = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
`
export const PrivacyCon = styled.View`
/*
position: absolute;
bottom: 0;
*/
    padding: 24px 20px 40px;
    background: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`
export const PrivacyTit = styled.Text`
    margin-bottom: 23px;
    font-size: 20px;
    font-weight: 700;
    color: #000;
`
export const PrivacyText = styled.Text`
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
`
export const JoinButton = styled.TouchableOpacity`
    padding: 20px 0;
    text-align: center;
    /*border: 1px solid #EEEEEE;*/
    border-radius: 12px;
    margin: 38px 0;
    background: ${(props) => (props.agree ? "#000000" : "#DADADA")};
    color: ${(props) => (props.agree ? "#FFFFFF" : "#FFFFFF")};
    ${(props) => (props.agree ?   "box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3)" : "")};
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
`
export const JoinOrText = styled.Text`
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #222222;
    opacity: 0.5;
`
export const JoinOrText02 = styled.Text`
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
`

export const IconChkAll = styled.View`
    width: 10px;
    height: 8px;
`
export const IconChkGray = styled.View`
    width: 24px;
    height: 24px;
`
export const IconChkNavy = styled.View`
    width: 24px;
    height: 24px;
`
export const NicknameBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
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
export const TextInputWrap = styled.View`
    position: relative;
`
export const IcoEye = styled.View`
    position: absolute;
    top: -56px;
    right: 15px;
    width: 28px;
    height: 28px;
    background: #fff;
`
export const IcoEyeN = styled.View`
    position: absolute;
    top: -56px;
    right: 15px;
    width: 28px;
    height: 28px;
    background: #fff;
`
//JoinSuccess
export const JoinSuccessImg = styled.Image`
    max-width: 100px;
    width: 100%;
    margin: 50px auto 32px;
`;
export const SnsContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom:150px;
    margin-top:47px;
`;
//FindPwdStep2
export const NumInputdBox = styled.View`
    display: flex;
    flex-direction: row;
`
export const NumInput = styled.TextInput`
    flex: 1;
    padding: 18px 5px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: #000;
`
export const NumInputError = styled.TextInput`
    flex: 1;
    padding: 18px 5px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: #E63312;
`
export const ErrorMessage = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    text-align: center;
    
`
export const NoticeText = styled.Text`
    font-size: 12px;
    color: #999;
    font-weight: 400;
`
export const ErrorMessageIcon = styled.View`
    width: 14px;
    height: 14px;
`
/* 이메일, 닉네임 중복 체크  */
export const DuplicateBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 12px;
`
export const DuplicateValue = styled.TextInput`
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
export const DuplicateCheckBtn = styled.Text`
    width: 99px;
    padding: 18px;
    border-radius: 6px;
    overflow: hidden;
    font-size: 16px;
    color: #fff;
    background: #171C61;
    text-align: center;
`
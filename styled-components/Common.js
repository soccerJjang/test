import styled from "styled-components/native";
import * as Font from 'expo-font';

export const CommonBackground = styled.View`
    position:relative;
    width: 100%;
    height: 100%;
    background-color: #171C61;
`;
export const CommonContainer = styled.ScrollView`
    position:relative;
    width: 100%;
    height: 100%;
    background-color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 40px 20px 0;
`
export const CommonContainer2 = styled.ScrollView`
    position:relative;
    width: 100%;
    height: 100%;
    background-color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 40px 0 0;
`

export const CommonContainer3 = styled.View`
    position:relative;
    width: 100%;
    height: 100%;
    background-color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 40px 0 0;
`
export const CommonContainer4 = styled.ScrollView`
    position:relative;
    width: 100%;
    background-color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 40px 20px 0;
`

export const CommonBoxContainer = styled.View`
    border: 1px solid #EEEEEE;
    border-radius: 12px;
`
export const CommonTwoDepthTabView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 50px;
    align-items: center;
    border: 1px solid;
    background-color: #171C61;
`
export const CommonTwoDepthTabTextView = styled.TouchableOpacity`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 50px;
`
export const TwoDepthTabOn = styled.View`
    position: absolute;
    left: 50%;
    bottom: 0;
    height: 4px;
    width: 100px;
    margin-left: -50px;
    background: #5CEEA7;
`
export const CommonThreeDepthBackground = styled.View`
    background-color: #171C61;
`

export const CommonThreeDepthTabView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 83px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    align-items: center;
    background-color: #FFFFFF;
`
export const ThreeTabText = styled.Text`
    padding: 10px 14px;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    border-radius: 16px;
    color: rgba(34, 34, 34, .5);
    font-size: 14px;
    overflow: hidden;
`
export const ThreeTabItem = styled.TouchableOpacity`
    padding: 10px 14px;
    border-radius: 50px;
    color: rgba(34, 34, 34, .5);
    font-size: 14px;
`
export const CommonThreeDepthContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
`
export const CommonText = styled.Text`
    color: ${props => props.color};
    font-size: ${props => props.fontSize};
    padding : 0 20px;
`;
export const Tit = styled.Text`
    font-size:16px;
    font-weight:700;
    color:#222222;
`;
export const TitLarge = styled.Text`
    font-size:24px;
    font-weight:400;
    color:#222222;
`;
export const TitMiddle = styled.Text`
    font-size:18px;
    font-weight:400;
    color:#000;
`;

export const TitSmall = styled.Text`
    font-size:14px;
    font-weight:700;
    color:#1E1E1E;
`;
export const TxtSmallBlue = styled.Text`
    font-size:20px;
    font-weight:400;
    color:#171C61;
`;
//하단 고정 버튼
export const PageButton = styled.Text`
    position: absolute;
    bottom: 24px;
    left: 20px;
    /*width: 100%;*/
    right: 20px;
    padding: 20px 0;
    text-align: center;
    border-radius: 12px;
    background: #DADADA;
    color: #666666;
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
`
//하단 고정 버튼 활성화
export const PageButtonOn = styled.Text`
    position: absolute;
    bottom: 24px;
    left: 20px;
    /*width: 100%;*/
    right: 20px;
    padding: 20px 0;
    text-align: center;
    border-radius: 12px;
    background: #000;
    /* box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3); */
    color: #FFFFFF;
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
`
// 하단 비고정 버튼
export const PageButtonScr = styled.TouchableOpacity`
    padding: 20px 0;
    marginTop: 38px;
    text-align: center;
    border-radius: 12px;
    margin: 38px 0;
    background: ${(props) => (props.enabled ? "#000000" : "#DADADA")};
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
`
export const PageBtnText = styled.Text`
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #fff;
`
//회원가입 개인정보 동의 s
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
    position: absolute;
    bottom: 0;
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
//회원가입 개인정보 동의 e

//팝업창
export const Wrap = styled.View`
    position: relative;
`
export const CloseBtn = styled.Text`
    position: absolute;
    top: 27px;
    right: 49px;
    font-size: 0;
    width: 20px;
    height: 20px;
`

// 분석데이터 없을때 보여줄 Container
export const GettingReady = styled.View`
    padding-top: 94px;
    display: flex;
    align-items: center;
`

// 기본 박스
export const CommonBoxWrap = styled.View`
    flexDirection: row;
    justifyContent: ${props => props.flexStart ? 'flex-start' : 'space-between'};
    alignItems: center;
`
export const GrayBox = styled.View`
    padding: 20px;
    borderRadius: 12px;
    backgroundColor: #F5F5F5;
`
// 기본 버튼
export const CheckBtn = styled.Text`
    width: 100%
    height: 52px;
    padding-top: 17px;
    border-radius: 6px;
    overflow: hidden;
    fontWeight: 400;
    font-size: 16px;
    color: ${props => props.blueBtn ? '#fff' : '#666'};
    backgroundColor: ${props => props.blueBtn ? '#171C61' : '#dadada'};
    text-align: center;
`
export const CheckBtnWBox = styled.TouchableOpacity`
    width: 100%; 
    position: relative;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
`
export const CheckBtnW = styled.Text`
    width: 100%
    height: 52px;
    padding-top: 17px;
    border-radius: 6px;
    overflow: hidden;
    fontWeight: 400;
    font-size: 16px;
    color: #222;
    text-align: center;
    backgroundColor: #fff;
`

export const GreenBt = styled.TouchableOpacity`
    alignItems: center;
    justifyContent: center;
    color: #222;
    borderRadius: 5px;
    backgroundColor: #5CEEA7;
`
export const BlueBt = styled.TouchableOpacity`
    alignItems: center;
    justifyContent: center;
    color: #fff;
    borderRadius: 5px;
    backgroundColor: #171C61;
`

// layer popup
export const DimBox = styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    alignItems: center;
    justifyContent: center;
    padding: 20px;
    backgroundColor: rgba(0,0,0, .6);
`
export const LayerBox = styled.View`
    position: relative;
    width: 100%;
    minHeight: 209px;
    padding: 25px 20px;
    borderRadius: 20px;
    backgroundColor: #fff;
`
export const LayerConBox = styled.View`
    padding: 20px 0 25px;
`
export const LayerConBoxScroll= styled.ScrollView`
    padding: 20px 0 25px;
`
export const CenterText = styled.Text`
    fontSize: 16px;
    textAlign: center;
    fontWeight: 700;
    lineHeight: 24px;
    color: #1A1D1E;
`
export const LayerGreenBt = styled(GreenBt)`
    width: 195px;
    height: 50px;
    margin: auto auto 0;
    borderRadius: 12px;
`
export const LayerBlueBt = styled(BlueBt)`
    width: 195px;
    height: 50px;
    margin: auto auto 0;
    border-radius: 12px;
`

// fontsize
export const FontSize12 = styled.Text`
    fontSize: 12px;
`
export const FontSize16 = styled.Text`
    fontSize: 16px;
`
export const Description = styled.Text`
    font-size: 12px;
    line-height: 14px;
    color: #E63312;
    font-weight: 400;
`
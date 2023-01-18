import styled from "styled-components";
import { TouchableOpacity } from 'react-native';

export const AnalysisSwingWrap = styled.View`
    position:relative;
    width: 100%;
    height: 100%;
    background-color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 40px 20px 0;
`
export const AnalysisSwingBox = styled.View`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
    padding: 33px 28px 31px 102px;
    border: 1px solid #EEEEEE;
    border-radius: 12px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
    background: #fff;
`
export const AnalysisSwingCon = styled.TouchableOpacity`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const BgCamera = styled.ImageBackground`
    position: absolute;
    left: 20px;
    top: 33px;
    width: 56px;
    height: 56px;
`
export const BgPicture = styled.ImageBackground`
    position: absolute;
    left: 20px;
    top: 33px;
    width: 56px;
    height: 56px;
`
export const SwingTit = styled.Text`
    font-size: 20px;
    color: #222;
    font-weight: 400;
`
export const SwingTxt = styled.Text`
    margin-top: 4px;
    font-size: 12px;
    font-weight: 400;
`
export const SwingNoticeBox = styled.View`
    position: absolute;
    bottom: 32px;
    left: 20px;
    right: 20px;
    padding: 24px 12px 24px 86px;
    background: #275DE9;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0px 10px 20px rgba(39, 93, 233, 0.3);
`
export const BgNotice = styled.ImageBackground`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 81px;
    height: 82px;
`
export const SwingNoticeTit = styled.Text`
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
`
export const SwingNoticeTxt = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: #fff;
`
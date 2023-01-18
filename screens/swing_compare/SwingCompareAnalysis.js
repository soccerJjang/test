import React from 'react';
import * as RN from 'react-native';
import styled from "styled-components/native";
import { 
    CommonBackground,
    CommonContainer,
    TitMiddle,
} from '../../styled-components/Common';
import { 
    SwingRearImgBox,
    SwingRearImgInner,
    SwingRearImg,
    PercentBox,
    PercentNum,
    ProCardBox,
    ProCardTit,
    ProCardBadge,    
    ShotListBox,
    ShotList,    
    ShotListName,
    ShotListImg,
    OpenBtn,
    ShotListChk,    
} from './../../styled-components/analysis_list/AnalysisSwingRear';
import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const SwingCompareAnalysis = (props) => {
    const [selectedProName, setSelectedProName] = React.useState(props.route.params.selectedProName);
    const [detailInfo, setDetailInfo] = React.useState(props.route.params.detailInfo);
    const [proPhotoPath, setProPhotoPath] = React.useState(props.route.params.proPhotoPath + '/frame_01_additional.jpg');
    const [userPhotoPath, setUserPhotoPath] = React.useState(props.route.params.userPhotoPath + '/frame_01_additional.jpg');
    const [percentage, setPercentage] = React.useState(null);
    
    React.useEffect(() => {
        setPercentage(Math.floor(JSON.parse(detailInfo.data.comparison)[selectedProName]));
    },[]);

    if(percentage) {
        return (
            <CommonBackground>
                <CommonContainer>
                    <TitMiddle>유사도 분석</TitMiddle>
                    <SwingRearImgBox>
                        <SwingRearImgInner>                    
                            <SwingRearImg>
                                <RN.Image style={{ width: "100%", height : "100%" }} source={userPhotoPath != null ? {uri : userPhotoPath} : require('../../images/img-SwingRear01.png')} />
                                <NameTag><RN.Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}>Me</RN.Text></NameTag>
                            </SwingRearImg>
                            <RN.View style={{ width: 5 }}/>                        
                            <SwingRearImg>
                                <RN.Image style={{ width: "100%" , height : "100%"}}  source={proPhotoPath != null? {uri : `${proPhotoPath}`} : require('../../images/img-SwingRear01.png')} />
                                <NameTag><RN.Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}>Tour Pro</RN.Text></NameTag>
                            </SwingRearImg>
                        </SwingRearImgInner>
                        <PercentBox><PercentNum><RN.Text  style={{ fontSize: 27, color:"#fff", fontWeight: "700"}}>{percentage}</RN.Text><RN.Text style={{ fontSize: 16, color:"#fff", fontWeight: "700"}}>%</RN.Text></PercentNum></PercentBox>
                    </SwingRearImgBox>        
                </CommonContainer>
            </CommonBackground>
        )
    } else {
       return (
           <></>
       )
    }
}

const NameTag = styled.View`
    position: absolute;
    top: 22px;
    left: 50%;
    width: 87px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -43px;
    text-align: center;
    background: rgba(255, 93, 2, 0.7);
    border-radius: 50px;
    border: 1px solid #fff;
`
const SwingRearCommentBox = styled.View`
    margin-bottom: 150px;
    padding: 23px 20px 20px 20px;
    border-radius: 20px;
    background: #fff;
    display: flex;
`
const Comment1 = styled.Text`
    margin-bottom: 17px;
    font-size: 16px;
    font-weight: 700;
    color: #1A1D1E;
`
const Comment2 = styled.Text`
    margin-bottom: 17px;
    font-size: 14px;
    color: #000;
    font-weight: 300;
`
const InfoBtn = styled.TouchableOpacity`
    width: 81px;
    padding: 5px 0;
    background: #000;
    border-radius: 50px;

`
const SlideRightBt = styled.TouchableOpacity`
    position: absolute;
    top: 45%;
    right: 10px;
    width: 34px;
    height: 34px;
    margin-top: -17px;
    z-index: 99999;
`
export default SwingCompareAnalysis;
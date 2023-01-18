import React from 'react';
import { View, Alert, Platform} from 'react-native';
import { 
    CommonBackground,
} from '../../styled-components/Common';
import {
    AnalysisSwingWrap,
    AnalysisSwingBox,
    AnalysisSwingCon,
    BgCamera,
    BgPicture,
    SwingTit,
    SwingTxt,
    SwingNoticeBox,
    BgNotice,
    SwingNoticeTit,
    SwingNoticeTxt
} from '../../styled-components/analysis_list/AnalysisSwing';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const AnalysisSwing = ({navigation: {navigate}}) => {

    const route = useRoute();
    const [comment, setComment] = React.useState([true , '정면측면 스윙']);

    React.useEffect(()=> {

        if(route.params != null && route.params.fullData != undefined) {
            let frontCount = 0, rearCount =0;

            if(route.params.fullData.length > 0) {

                route.params.fullData.map((item, idx) => {
                    item.type.indexOf('F') >= 0 ? frontCount++ : null;
                    item.type.indexOf('R') >= 0 ? rearCount++ : null;
                })                
            }

            if(frontCount > 0 && rearCount == 0) { 
                setComment([true, '측면 스윙분석']);

            }else if(frontCount == 0 && rearCount > 0) {
                setComment([true, '정면 스윙분석']);

            }else if(frontCount > 0 && rearCount > 0) {
                setComment([false, null]);
            }
        }
    }, []);

    return (
        <CommonBackground>
            <AnalysisSwingWrap>
            <AnalysisSwingBox style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
            <BgCamera source={require('../../images/img-camera.png')}/>
                <AnalysisSwingCon onPress={() => {navigate('AnalysisSwingCameraSelect')}}>
                    <View>
                        <SwingTit>스윙 촬영하기</SwingTit>
                        <SwingTxt>나의 자세 분석을 AI 로 받아보세요</SwingTxt>
                    </View>
                    <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                </AnalysisSwingCon>
            </AnalysisSwingBox>
            <AnalysisSwingBox  style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
            <BgPicture source={require('../../images/img-picture.png')}/>
                <AnalysisSwingCon onPress={() => {navigate('AnalysisSwingSelect')}}>
                    <View>
                        <SwingTit>스윙 갤러리</SwingTit>
                        <SwingTxt>촬영된 영상으로 AI 분석을 받아보세요.</SwingTxt>
                    </View>
                    <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                </AnalysisSwingCon>
            </AnalysisSwingBox>
            </AnalysisSwingWrap>

            {

                comment[0] ? 
                <SwingNoticeBox style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                    <BgNotice source={require('../../images/bg-Notice.png')}/>
                    <SwingNoticeTit>{comment[1]}을 한번도 안하셨네요.</SwingNoticeTit>
                    <SwingNoticeTxt>{comment[1]}도 전체 스윙점검을 위해서 {"\n"}
                        매우 중요합니다. 지금 바로 촬영해보세요.
                    </SwingNoticeTxt>
                </SwingNoticeBox> 
                :
                null
            }
        </CommonBackground>
    )
}
export default AnalysisSwing;
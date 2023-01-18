import React from 'react';
import { View, Alert, Platform} from 'react-native';
import { 
    CommonBackground,
} from '../../styled-components/Common';
import {
    AnalysisSwingWrap,
    SwingNoticeBox,
    BgNotice,
    SwingNoticeTit,
    SwingNoticeTxt,
    AnalysisSwingCon
} from '../../styled-components/analysis_list/AnalysisSwing';
import {
    AnalysisSwingBox,
    SwingTit
}
from '../../styled-components/analysis_list/AnalysisMenu';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

const AnalysisMenu = () => {

    return (
        <CommonBackground>
            <AnalysisSwingWrap>
            <AnalysisSwingBox style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                <AnalysisSwingCon onPress={() => {navigate()}}>
                    <View>
                        <SwingTit>FRONT - Driver</SwingTit>
                    </View>
                    <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                </AnalysisSwingCon>
            </AnalysisSwingBox>
            <AnalysisSwingBox style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                <AnalysisSwingCon onPress={() => {navigate()}}>
                    <View>
                        <SwingTit>REAR - Driver</SwingTit>
                    </View>
                    <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                </AnalysisSwingCon>
            </AnalysisSwingBox>
            <AnalysisSwingBox style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                <AnalysisSwingCon onPress={() => {navigate()}}>
                    <View>
                        <SwingTit>FRONT - Iron</SwingTit>
                    </View>
                    <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                </AnalysisSwingCon>
            </AnalysisSwingBox>
            <AnalysisSwingBox style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                <AnalysisSwingCon onPress={() => {navigate()}}>
                    <View>
                        <SwingTit>REAR - Iron</SwingTit>
                    </View>
                    <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                </AnalysisSwingCon>
            </AnalysisSwingBox>

            </AnalysisSwingWrap>
            <SwingNoticeBox style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}>
                <BgNotice source={require('../../images/bg-Notice.png')}/>
                <SwingNoticeTit>측면 스윙분석을 한번도 안하셨네요.</SwingNoticeTit>
                <SwingNoticeTxt>측면 스윙분석도 전체 스윙점검을 위해서 {"\n"}
                    매우 중요합니다. 지금 바로 촬영해보세요.
                </SwingNoticeTxt>
            </SwingNoticeBox>
        </CommonBackground>
    )
}
export default AnalysisMenu;
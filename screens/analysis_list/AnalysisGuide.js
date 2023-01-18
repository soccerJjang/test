import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { View, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const AnalysisGuide = (props) => {
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);

    const navigation = useNavigation();
    useEffect(()=> {

        const unsubscribe = navigation.addListener('focus', async () => {
        

        });

        return unsubscribe;
    }, [])


    const downloadGuideVideo = async () => {
        const midiaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
        setHasMediaLibraryPermission(midiaLibraryStatus.status === 'granted');

        Alert.alert(
            "표준 영상을 갤러리에 다운로드 받아서 분석해 보시겠습니까? ",
            "",

            Platform.OS == 'android' ? 
            [
                {
                    text: "취소",
                    onPress: () => console.log("Cancel Pressed"),                
                  },
                { text: "Front", onPress: () => downloadFile("Front") },
                { text: "Rear", onPress: () => downloadFile("Rear") },                
            ]            
            :
            [

              { text: "Front", onPress: () => downloadFile("Front") },
              { text: "Rear", onPress: () => downloadFile("Rear") },
              {
                text: "취소",
                onPress: () => console.log("Cancel Pressed"),                
            },
              
            ]
          );
    
    };

    const downloadFile = async (type) => {
        const downloadLink = type == 'Front' ? "http://223.130.132.180:5008/screengo/service1/media/guide/frontGuide.mp4" : "http://223.130.132.180:5008/screengo/service1/media/guide/rearGuide.mp4";

        let all = '';
        await FileSystem.downloadAsync(downloadLink, FileSystem.cacheDirectory + type + '.mp4')
        .then(data => {

            console.log(data);
            all = data.uri;
            console.log('Finishied all downloading to ', data.uri);
        })
        .catch(error => {
            console.error(error);
        })
        all = await FileSystem.getInfoAsync(all);
        await MediaLibrary.saveToLibraryAsync(all.uri);
        Alert.alert("저장되었습니다.");
    }

    return (
        <GuideContainer>
            <GuideImageBox>
                <GuideSampleImage source={require("../../images/img-guideSample0.png")}/>
                {/*<GuideSampleImage source={require("../../images/img-guide3.png")}/>*/}
            </GuideImageBox>
            <GuideConBox>
                <GuideConTit>핸드폰 촬영 가이드</GuideConTit>
                    <GuideConList>
                        <ListTit>첫번째</ListTit><View style={{ width: 20 }}/>
                        <ListText>Front/Rear, Driver/Iron</ListText>
                    </GuideConList>
                    <GuideConList>
                        <ListTit>두번째</ListTit><View style={{ width: 20 }}/>
                        <ListText>어드레스 <YellowText>정지 상태에서 촬영시작</YellowText>{"\n"}피니시에서 종료 버튼 터치</ListText>
                    </GuideConList>
                    <GuideConList>
                        <ListTit>세번째</ListTit><View style={{ width: 20 }}/>
                        <ListText><YellowText>2.5m 내외 거리</YellowText>에서 마스킹에 맞춘 후{"\n"}촬영 버튼을 누르고, 끝나면 바로 종료버튼 터치{"\n"}(10초 경과 자동 정지)</ListText>
                    </GuideConList>
                    <GuideConList>
                        <ListTit>네번째</ListTit><View style={{ width: 20 }}/>
                        <ListText>촬영이 끝나고 전송버튼을 누르면 분석 시작</ListText>
                    </GuideConList>
                    <WhiteButton onPress={downloadGuideVideo}>표준 영상 다운 받기</WhiteButton>                    
            </GuideConBox>
            
        </GuideContainer>
    )
};
const GuideContainer = styled.View`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    background: #FFFFFF;
`;
const GuideImageBox = styled.View`
    flex: 1;
    overflow: hidden;
    margin: 20px auto;
`;
const GuideSampleImage = styled.Image`
    height: 100%;
    `;
const GuideConBox = styled.View`
    padding: 30px 20px 42px;
    background: #000000;
`;
const GuideConTit = styled.Text`
    margin-bottom: 36px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
`;
const GuideConList = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 13px;
    color: #fff;
`;
const ListTit = styled.Text`
    font-size: 14px;
    font-weight: 700;
    line-height: 20;
    color: #fff;
`;
const ListText  = styled.Text`
    font-size: 14px;
    font-weight: 300;
    line-height: 20;
    color: #FFF;
`;
const YellowText = styled.Text`
    font-size: 14px;
    font-weight: 700;
    line-height: 20;
    color: #FBE30F;
`;
const WhiteButton = styled.Text`
    margin-top: 47px;
    padding: 20px 0;
    text-align: center;
    border-radius: 12px;
    background: #FFFFFF;
    color: #000000;
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
`

export default AnalysisGuide;
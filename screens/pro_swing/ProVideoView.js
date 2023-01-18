import React from 'react';
import * as RN from 'react-native';
import uuid from 'react-native-uuid';
import * as SecureStore from 'expo-secure-store';
import { CommonBackground, CommonContainer } from '../../styled-components/Common';
import { ProEtcContainer, ProSortCommonContainer,ProEtcIcon, ProEtcText01, ProEtcText02, ProListBox, ProListContainer,ProEtcLeftCont,ProEtcRightCont,ProSortMainContainer, ProSortTitle, ProImage, ProTitle  } from '../../styled-components/pro_swing/ProSortList';
import { article } from '../../api/article';
import { NavigationContainer } from '@react-navigation/native';

const ProVideoView = (props) => {
    const [video, setVideo] = React.useState([]);

    React.useEffect(async() => {
        const proData = props.route.params.data;
        const videoData = await article.selectProCardVideo(proData.name);
        setVideo(videoData);
    }, []);

    const goToVideo = (data) => {
        props.navigation.navigate('ProVideo', {video: data});
    }
    return (
        video.length > 0
        ?
        <CommonBackground>
        <ProSortCommonContainer>
            <ProSortMainContainer>
                <ProSortTitle>영상</ProSortTitle>
                <ProListContainer>
                    {
                       video.map((data, i) => {
                           return(
                            (data.video != "")?
                                <ProListBox key={uuid.v4() + data} onPress={() => goToVideo(data)}>
                                    <RN.View >
                                        {
                                            (data.thumbnail_original_name != null) 
                                            ? <ProImage source={{uri : `http://223.130.132.180:5009/upload/${data.thumbnail}`}}></ProImage>
                                            : <ProImage source={require('../../images/video_img.png')}></ProImage>
                                        }
                                        
                                        <ProTitle>{data.video_original_name}</ProTitle>
                                    </RN.View>
                                </ProListBox> 
                            : null
                           )
                        })
                    }
                </ProListContainer>
            </ProSortMainContainer>
        </ProSortCommonContainer>
    </CommonBackground>
        : null
    )
}
export default ProVideoView;
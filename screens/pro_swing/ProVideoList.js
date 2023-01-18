import React from 'react';
import uuid from 'react-native-uuid';
import * as RN from 'react-native';
import { CommonBackground, CommonContainer } from '../../styled-components/Common';
import { ProEtcContainer, ProSortCommonContainer,ProEtcIcon, ProEtcText01, ProEtcText02, ProListBox, ProListContainer,ProEtcLeftCont,ProEtcRightCont,ProSortMainContainer, ProSortTitle, ProImage, ProTitle  } from '../../styled-components/pro_swing/ProSortList';
import * as SecureStore from 'expo-secure-store';
import { article } from '../../api/article';
import { procard } from '../../api/procard';

const ProSortList = (props) => {
    
    const [user, setUser] = React.useState(null);
    const [proData, setProData] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const getUserData = await SecureStore.getItemAsync('userData');
            const parseUserData = JSON.parse(getUserData);
            setUser(parseUserData);
            const getProCardData = await procard.selectProCardList(parseUserData.user_no)
            .then(res => {
                setProData(res.proCardList);
            })
        })();
    }, [])

    const goToDetail = (data) => {
        if(data.videoCnt == 0) {
            RN.Alert.alert("등록된 동영상이 없습니다.");
            return false;
        }
        props.navigation.navigate('ProVideoView', {data: data});
    }
    
    if (user !== null && proData.length > 0) {
        return (
            <CommonBackground>
            <ProSortCommonContainer>
                <ProSortMainContainer>
                    <ProSortTitle>프로리스트</ProSortTitle>
                    <ProListContainer>
                        {
                           proData.map((data, i) => {
                               return(
                                <ProListBox key={uuid.v4() + data.name} onPress={() => goToDetail(data)}>
                                    <RN.View >
                                        <ProImage source={{uri: `http://223.130.132.180:5009/upload/${data.photo}`}}></ProImage>
                                        <ProTitle>{data.name}</ProTitle>
                                    </RN.View>
                                    <ProEtcContainer>
                                        <ProEtcLeftCont>
                                            {
                                                (!data.cnt) ? <ProEtcIcon  style={{ width: 18, height: 18 }} source={require('../../images/ico-heartOff.png')}/> 
                                                : <ProEtcIcon style={{ width: 18, height: 18 }} source={require('../../images/ico-heartOn.png')}/>
                                            }
                                            <ProEtcText01>{(!data.cnt) ? 0 : data.cnt}개</ProEtcText01>
                                        </ProEtcLeftCont>
                                        <ProEtcRightCont>
                                        <ProEtcText02>22.03.06</ProEtcText02>
                                        </ProEtcRightCont>
                                    </ProEtcContainer>
                                </ProListBox> 
                               )
                            })
                        }
                    </ProListContainer>
                </ProSortMainContainer>
            </ProSortCommonContainer>
        </CommonBackground>
           
        )
    } else {
    return (
        <RN.View />
    )
    }
}

export default ProSortList;
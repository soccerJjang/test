import React from 'react';
import uuid from 'react-native-uuid';
import * as RN from 'react-native';
import { useQuery } from 'react-query';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonBackground, CommonContainer } from '../../styled-components/Common';
import { ProEtcContainer, ProSortCommonContainer,ProEtcIcon, ProEtcText01, ProEtcText02, ProListBox, ProListContainer,ProEtcLeftCont,ProEtcRightCont,ProSortMainContainer, ProSortTitle, ProImage, ProTitle  } from '../../styled-components/pro_swing/ProSortList';
import * as SecureStore from 'expo-secure-store';
import { article } from '../../api/article';
import { useNavigation } from '@react-navigation/native';

const ProSortList = (props) => {
    
    const [userData, setUserData] = React.useState(props.route.params.user);
    const [proData, setProData] = React.useState([]);
    const [proStatus, setProStatus] = React.useState([]);

    const navigation = useNavigation();
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

            (async () => {
                const getProCardData = await article.selectProCardList(userData.user_no);
                setProData(getProCardData.proCardList);           
                setProStatus(getProCardData.proCardStatus);             
            })();

        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

      
    React.useEffect(() => {
        /*
        (async () => {
            const getProCardData = await article.selectProCardList(userData.user_no);
            setProData(getProCardData.proCardList);           
            setProStatus(getProCardData.proCardStatus); 
        })();
        */

        /*
        (async () => {
            const getProCardData = await article.selectProCardList(userData.user_no);
            setProData(getProCardData.proCardList);           
            setProStatus(getProCardData.proCardStatus);             
        })();
        */
    }, [])

    const goToDetail = (data) => {
        props.navigation.navigate('ProView', {data, userData});
    }
    
    if (userData !== null && proData.length > 0) {
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
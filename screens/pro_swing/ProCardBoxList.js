import React from 'react';
import * as RN from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { article } from '../../api/article';
import { procard } from '../../api/procard';
import { CommonBackground, CommonContainer, GettingReady } from '../../styled-components/Common';
import { ProEtcContainer, ProSortCommonContainer,ProEtcIcon, ProEtcText01, ProEtcText02, ProListBox, ProListContainer,ProEtcLeftCont,ProEtcRightCont,ProSortMainContainer, ProSortTitle, ProImage, ProTitle  } from '../../styled-components/pro_swing/ProSortList';
import { useNavigation } from '@react-navigation/native';

const ProCardBoxList = () => {
    const navigation = useNavigation();

    const [user, setUser] = React.useState(null);
    const [proData, setProData] = React.useState(null);
    const [proCardBoxData, setProCardBoxData] = React.useState(null);
    const [proCardBoxList, setProCardBoxList] = React.useState(null);

    React.useEffect(async() => {
        try {
            await SecureStore.getItemAsync('userData')
            .then(async(userData) => {
                const getUserData = JSON.parse(userData);
                setUser(getUserData);
                return getUserData;
            })
            .then(async(dataUser) => {
                let userInfo = await SecureStore.getItemAsync("userData"); 
                userInfo = JSON.parse(userInfo);
                await procard.selectProCardBoxList(userInfo.user_no)
                .then(res => {
                    const proCardBoxReduce = res.reduce((acc, current) => {
                        if(acc.findIndex(({ pro_name }) => pro_name === current.pro_name) === -1) {
                            acc.push(current);
                        }
                        return acc;
                    },[]);
                    setProCardBoxList(proCardBoxReduce);
                })
              
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    const goToDetail = (data) => {
        console.log(data);
        navigation.navigate("ProCardBoxView", {proInfo: data, proCardBoxList: proCardBoxList});
    }

    if(proCardBoxList) {
        return (
            <CommonBackground>
                <ProSortCommonContainer>
                    <ProSortMainContainer>
                        <ProSortTitle>프로리스트</ProSortTitle>
                        <ProListContainer>
                            
                        
                        {

                            proCardBoxList.length > 0  ? 
                            proCardBoxList.map((data, i) => {
                                return(
                                    <ProListBox key={data.pro_name + i} onPress={() => goToDetail(data)}>
                                        <RN.View >
                                            <ProImage source={{uri: `http://223.130.132.180:5009/upload/${data.pro_photo_path}`}}></ProImage>
                                            <ProTitle>{data.pro_name}</ProTitle>
                                        </RN.View>
                                    </ProListBox> 
                                )
                            })
                            :
                            null
                        }
                        </ProListContainer>

                        {
                            proCardBoxList.length == 0 ? 
                            <GettingReady>
                                <RN.Image style={{ width: 89, height: 89 }} source={ require("../../images/img-gettingReady.png")}/>
                                <RN.Text style={{ marginTop: 26 , color: '#777', fontSize: 20, fontWeight: '700' }}>분석된 데이터가 없습니다.</RN.Text>
                            </GettingReady>  
                            :
                            null
                        }
                    </ProSortMainContainer>
                </ProSortCommonContainer>
            </CommonBackground>
        )
    } else {
        return (
            <></>
        )
    }
}
export default ProCardBoxList;
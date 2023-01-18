import React, { useMemo, useRef } from 'react';
import * as RN from 'react-native';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import styled from "styled-components";
import { lessonPro } from '../../api/lessonPro';
import { 
    CommonBackground,
    CommonContainer4,
    TitLarge,
    PageButtonOn,
    PageBtnText
} from '../../styled-components/Common';

const LessonProList = ( props ) => {   
    const [user, setUser] = React.useState(props.route.params.user);
    const [lessonProList, setLessonProList] = React.useState(null);
    let webRef = useRef();

    const navigation = props.navigation;

    const proApplication = () => {
        
        if(user.member_type == 'pro') {
            navigation.navigate("ApplicationPro")
        } else {
            RN.Alert.alert("프로 회원만 신청이 가능합니다.");
            
        }
    }

    React.useEffect(async ()=> {
        let proList = await lessonPro.selectLessonProList();
        console.log("Start ProList");
        console.log(proList);

        setLessonProList(proList);

    }, []);

    return (
        <CommonBackground>
            <CommonContainer4>
                <TitLarge style={{marginBottom:15}}>레슨 프로</TitLarge>
                <ProListContainer>
 
                {
                    lessonProList != null && lessonProList.length > 0 ?                    
                    lessonProList.map((item,idx) => {
                        return(
                            <ProListBox key={"lessonPro" + idx} onPress={() => {
                                navigation.navigate('LessonProLessonList', { proSeq: item.proSeq })
                            }}>
                                <RN.View >
                                    {
                                        item.ProImage?
                                            null
                                        :
                                        <ProImage source={require('../../images/pro_profile.png')}/>
                                    }
                                    <ProTitle>{item.proName} 프로</ProTitle>
                                </RN.View>
                            </ProListBox>                         
                        )
                        
                    })
                    :
                    null
                }
                </ProListContainer>
            </CommonContainer4>
            <View>
                <PageButtonOn onPress={()=>navigation.navigate('ApplicationPro')}><PageBtnText>레슨프로 신청하기</PageBtnText></PageButtonOn>                          
            </View>
        </CommonBackground>      
    )
}
const ProListContainer = styled.View`
    flex-wrap: wrap;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    width:100%;
    paddingBottom: 140px;
`
const ProListBox = styled.TouchableOpacity`
    width: 160px;
    marginBottom: 15px;
`
const ProImage = styled.Image`
    width: 160px;
    height: 140px;
    border-radius:12px;
`
const ProTitle = styled.Text`
    margin-top: 10px;
    font-weight: 700;
    font-size: 16px;
    color: #222222;
    text-align: center;
`

export default LessonProList;
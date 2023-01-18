import React from 'react';
import { View, Text, Platform, TouchableOpacity} from 'react-native';
import { 
    CommonBackground,
} from '../../styled-components/Common';

import { 
    AnalysisSwingRearContainer,
    RankTit, 
    TextView,
    TextLeft,
    ScoreText,
    RankText,
    ImageView,
    RearImage,
    RearDetailButton,
    RearDetailBox,
    RearDetailTit,
    RearDetailText,
    DetailCloseBtn,
    ProCardBox,
    OpenBtn,
    ProCardTit,
    ProCardBadge,
    ProCardCon,
    ShotListBox,
    ShotList,
    ShotListName,
    ShotListImg,
    ShotListChk,
    BoxShadow
} from './../../styled-components/analysis_list/AnalysisSwingRear';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AnalysisSwingRear = (props) => {

    const [detail, setDetail] = React.useState(true);
    const [detailCard, setDetailCard] = React.useState(false);
    const [proCard,  setProCard] = React.useState(false);

    const navigation = useNavigation();    
    const goToPartView = () => {            
        navigation.navigate("PartView");
    };

    return (detail)?( 
        <CommonBackground>                
                <AnalysisSwingRearContainer>
                    <RankTit>RANK 01</RankTit>
                    <TextView>
                        <TextLeft>
                            GREAT!{"\n"}
                            아주 훌륭해요! 
                        </TextLeft>
                        <View>
                            <ScoreText>80점</ScoreText>
                            <RankText>상위0.01%</RankText>
                        </View>
                    </TextView>

                    <BoxShadow style={{ marginLeft: 20, marginRight: 20, marginBottom: 20, borderRadius: 16, background: '#fff', elevation: 10, shadowColor: "#000", shadowOpacity: 0.5, shadowOffset: { width: 0, height: 5 }, shadowRadius: 16 }}>
                    
                    <ImageView onPress={goToPartView}>

                    <RearImage source={require('../../images/golf.png')} />
                        <RearDetailButton onPress={() => setDetailCard(true)}>
                            <Text style={{color: '#fff', fontSize: 14}}>상세평가보기</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#fff" />
                        </RearDetailButton>
                        {
                        (detailCard)
                        ?
                    <RearDetailBox style={{ elevation: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: -10 }, shadowRadius: 10 }}>
                        <RearDetailTit>수준급이에요!</RearDetailTit>
                        <RearDetailText>머리의 위치가 어드레스 및 백스윙탑, 임팩트 등 스윙 전반에 걸쳐 매우 안정적으로 좋습니다.
                        머리 움직임은 밀접한 관계가 있으니 척추각을 잘 유지할 수 있도록 노력해 주세요.</RearDetailText>
                        <DetailCloseBtn><AntDesign onPress={() => setDetailCard(false)} name="close" size={24} color="#fff" />닫기</DetailCloseBtn>
                    </RearDetailBox>                   
                    :
                    <View />
                    }
                    </ImageView>
                    </BoxShadow>


                    </AnalysisSwingRearContainer>
                    <ProCardBox onPress={() => setProCard(!proCard)} style={{ elevation: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: -5 }, shadowRadius: 10 }}>
                        <ProCardTit><Text style={{color: '#222', fontSize: 16, fontWeight: '700' }}>프로카드 박스</Text><View style={{ width: 7 }}></View><ProCardBadge><Text style={{color: '#fff', fontSize: 12 }}>8명</Text></ProCardBadge></ProCardTit>
                        {
                            (proCard)?
                        <ProCardCon>
                            <ShotListBox onPress={()=> navigation.navigate("ProView")}><ShotList><ShotListImg source={require('../../images/img-shot01.png')}/><ShotListChk><Feather name="check" size={24} color="#fff"/></ShotListChk></ShotList><ShotListName>한국인</ShotListName></ShotListBox>
                            <ShotListBox><ShotList><ShotListImg source={require('../../images/img-shot01.png')}/></ShotList><ShotListName>타이거{"\n"}우즈</ShotListName></ShotListBox>
                            <ShotListBox><ShotList><ShotListImg source={require('../../images/img-shot01.png')}/></ShotList><ShotListName>타이거{"\n"}우즈</ShotListName></ShotListBox>
                            <ShotListBox><ShotList><ShotListImg source={require('../../images/img-shot01.png')}/></ShotList><ShotListName>한국인</ShotListName></ShotListBox>
                            <ShotListBox><ShotList><ShotListImg source={require('../../images/img-shot01.png')}/></ShotList><ShotListName>한국인</ShotListName></ShotListBox>
                        </ProCardCon>
                        :
                        <View/>
                        }
                        <OpenBtn source={require('../../images/ico-OpenBtn.png')}/>
                    </ProCardBox>
            </CommonBackground>
    ) : (
        null
    )
}
export default AnalysisSwingRear;
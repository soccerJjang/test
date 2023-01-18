import * as React from 'react';
import * as RN from 'react-native';
import { CommonBackground, CommonContainer } from '../../styled-components/Common';
import { Border, 
    ButtonContainer, 
    ButtonTitle, 
    EtcContainer, 
    EtcText, 
    EtcTextContainer, 
    MarginView, 
    MyInfo, 
    MyInfoList, 
    MyInfoTitle, 
    MyInfoValue, 
    UserImage, 
    UserInfoLayer, 
    UserName } from '../../styled-components/my_page/MyPage';
import { AntDesign } from '@expo/vector-icons'; 
import * as SecureStore from 'expo-secure-store';

const Mypage = ({navigation}) => {

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

            getUserData();

        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);
    

    const [user, setUser] = React.useState(null);

    const getUserData = async() => {
        let userData = null;
        userData = await SecureStore.getItemAsync("userData"); 
        
        if(userData) {
            userData = JSON.parse(userData);
            setUser(userData);
        }else {
            navigation.navigate("Login");
        }
        console.log(user);
    };

    React.useEffect(() => {
        //getUserData();
    },[])


    return (
        <CommonBackground>
            <CommonContainer>
                <UserInfoLayer>
                    {/* <UserImage source={require('../../images/img-nav-member.png')}/> */}
                    <UserName>
                        {user != null && user.nickname != null && user.nickname != "null" ? user.nickname + " 님" : "정보없음"}
                    </UserName>
                </UserInfoLayer>

                <MyInfo>
                    <MyInfoList>
                        <MyInfoTitle>평균 타수</MyInfoTitle>
                        <MyInfoValue> 
                            {user != null && user.average_score != null && user.average_score != "null" ? user.average_score  : "정보없음"}                
                        </MyInfoValue>
                    </MyInfoList>
                    <MyInfoList>
                        <MyInfoTitle>구력</MyInfoTitle>
                        <MyInfoValue>
                           {user != null && user.career != null && user.career != "null" ? user.career  : "정보없음"}                                    
                        </MyInfoValue>
                    </MyInfoList>
                    <MyInfoList>
                        <MyInfoTitle>드라이버 평균 비거리</MyInfoTitle>
                        <MyInfoValue>
                           {user != null && user.driver_distance != null && user.driver_distance != "null" ? user.driver_distance  : "정보없음"}                                    
                        </MyInfoValue>
                    </MyInfoList>
                </MyInfo>

                <RN.TouchableOpacity onPress={() => {navigation.navigate('MyPageTab')}}>
                    <ButtonContainer>
                        <ButtonTitle>내 정보관리</ButtonTitle>
                        <AntDesign name="right" size={14} color="black" style={{paddingRight:24, fontWeight: "bold"}}/>
                    </ButtonContainer>
                    <Border></Border>
                </RN.TouchableOpacity>

                <RN.TouchableOpacity onPress={() => {navigation.navigate('InquiryStack', {screen : "Inquiry"})}}>
                    <ButtonContainer>
                        <ButtonTitle>1:1 문의</ButtonTitle>
                        <AntDesign name="right" size={14} color="black" style={{paddingRight:24, fontWeight: "bold"}}/>
                    </ButtonContainer>
                    <Border></Border>
                </RN.TouchableOpacity>
                {/* 추가 */}
                <RN.TouchableOpacity onPress={() => {navigation.navigate('Point')}}>
                    <ButtonContainer>
                        <ButtonTitle>포인트 관리</ButtonTitle>
                        <AntDesign name="right" size={14} color="black" style={{paddingRight:24, fontWeight: "bold"}}/>
                    </ButtonContainer>
                    <Border></Border>
                </RN.TouchableOpacity>

                <RN.TouchableOpacity onPress={() => {navigation.navigate('Version')}}>
                    <ButtonContainer>
                        <ButtonTitle>버전 확인</ButtonTitle>
                        <AntDesign name="right" size={14} color="black" style={{paddingRight:24, fontWeight: "bold"}}/>
                    </ButtonContainer>
                    <Border></Border>
                </RN.TouchableOpacity>
            
                <EtcContainer>
                    <EtcTextContainer>
                        <EtcText>이용약관</EtcText>
                        <MarginView></MarginView>
                        <EtcText>개인정보 취급방침</EtcText>
                    </EtcTextContainer>
                </EtcContainer>
            </CommonContainer>
        </CommonBackground>
           
    )
}

export default Mypage;
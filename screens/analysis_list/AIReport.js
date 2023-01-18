import React from 'react';
import styled from "styled-components";
import * as SecureStore from 'expo-secure-store';
import { Alert, Image } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';


const AIReport = (props) => {
    const [data, setData] = React.useState(props.data);
    const [user, setUser] = React.useState(null);
    const navigation = useNavigation();

    

    const getUserData = async() => {
        let userData = null;
        userData = await SecureStore.getItemAsync("userData"); 
        
        if(userData) {
            setUser(JSON.parse(userData));            
        }        
    };

    const sendMail = async () => {
        
        if(user != null && user.phone != null && user.phone.length == 11 ) {
            Alert.alert("Report 전송중입니다.");
        //if(true) {

            const videoId = data.id;
            const userNo = user.user_no;
            const nickname = user.nickname;
            console.log(user.email_id);

            const sendMail = await fetch(`http://223.130.132.180:5009/analysis/sendReportMail.do?videoId=${videoId}&userNo=${userNo}&nickname=${nickname}&email=${user.email_id}`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                Alert.alert("Report 전송이 완료되었습니다.");
            })

        }else {
            Alert.alert("휴대폰 번호 등록 후 이용해주세요 !")
        }
    }

    React.useEffect(()=> {


        //getUserData();
        
    },[])

    React.useEffect(()=> {

        const unsubscribe = navigation.addListener('focus', async () => {
        
            getUserData();
        });

        return unsubscribe;
    }, [navigation])

    return (
        <Container>
            {/* {            
                user != null && user.phone.length > 0 && user.phone != "010-0000-0000" ? 
                    <AIText>{user.phone}</AIText>
                    :
                    <>
                    <AIText>AI Report 메일전송 서비스는{"\n"}휴대폰 번호 등록 사용자에게만 제공됩니다.</AIText>
                    <SendButton onPress={sendMail} style={{ marginLeft: 20, marginRight: 20 }} agree={false}><SendText>AI Report 메일 전송</SendText></SendButton>
                    </>
            }             */}
            <AIText>AI Report 메일전송 서비스는{"\n"}휴대폰 번호 등록 사용자에게만 제공됩니다.</AIText>
            <SendButton onPress={sendMail} style={{ marginLeft: 20, marginRight: 20 }} agree={true}><SendText>AI Report 메일 전송</SendText></SendButton>
            <SendButton onPress={() => { navigation.navigate('AnalysisProfile') }} style={{ marginLeft: 20, marginRight: 20 }} agree={true}><SendText>휴대폰 번호 등록 하러 가기</SendText></SendButton>
            <SlideLeftBt onPress={()=> {navigation.navigate("AnalysisSwingConfirmCard")}}><Image style={{ width: '100%', height: '100%' }} source={require('../../images/ico-slide-left.png')}/></SlideLeftBt>
        </Container>
    )
};


const Container = styled.View`


`;

const AIText = styled.Text`
    margin: 28px;
    font-size: 14px;
    font-weight: 600;
    color: #1E1E1E;
`;

const SendButton = styled.TouchableOpacity`
    padding: 20px 0;
    text-align: center;
    /*border: 1px solid #EEEEEE;*/
    border-radius: 12px;
    margin: 10px 0;
    background: ${(props) => (props.agree ? "#171C61" : "#DADADA")};
    color: ${(props) => (props.agree ? "#FFFFFF" : "#FFFFFF")};
    ${(props) => (props.agree ?   "box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3)" : "")};
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
`;

const SendButton01 = styled.TouchableOpacity`
    padding: 20px 0;
    text-align: center;
    /*border: 1px solid #EEEEEE;*/
    border-radius: 12px;
    margin: 10px 0;
    background: ${(props) => (props.agree ? "#000000" : "#DADADA")};
    color: ${(props) => (props.agree ? "#FFFFFF" : "#FFFFFF")};
    ${(props) => (props.agree ?   "box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3)" : "")};
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
`;

export const SendText = styled.Text`
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;    
`
const SlideLeftBt = styled.TouchableOpacity`
    position: absolute;
    top: 120%;
    left: 10px;
    width: 34px;
    height: 34px;
    margin-top: -17px;
    z-index: 99999;
`

export default AIReport;
import React, { useEffect } from 'react';
import * as RN from 'react-native';
import { View } from 'react-native';
import styled from "styled-components";
import * as SecureStore from 'expo-secure-store';
import { 
    CommonBackground,
    CommonContainer4,
    TitLarge,
    CommonBoxWrap,
    PageButtonOn,
    PageBtnText
 } from '../../styled-components/Common';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { lessonRoomApi } from '../../api/lessonRoom';
const DEV_URL = "http://223.130.132.180:5008";

const BuyPoints = (props) => {

    const [selectedPrice, setSelectedPrice] = React.useState([false,false,false,false,false,false]);
    const [perchaseUrl, setPerchaseUrl] = React.useState(null);
    const [perchasing, setPerchasing] = React.useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        if ("isRunning" === props.route.params?.data) {
            console.log(props.route.params?.data,"data") //api call
        }
    },[props.route.params?.data])

    useEffect(() => {
        if (perchaseUrl) {
            navigation.navigate("Perchase",{perchaseUrl})
        }
    },[perchaseUrl])

    const payment = async () => {
        let userData = null;
        userData = await SecureStore.getItemAsync("userData"); 
        
        if(userData) {
            userData = JSON.parse(userData);
            
            let chargePoint = 0, recvphone = "";
            let formdata = new FormData();
            formdata.append("cmd", "payrequest");
            formdata.append("userid", "screengo");
            formdata.append("goodname", "Golfai 온라인 레슨 포인트");
            formdata.append("feedbackurl", `${DEV_URL}/lesson/payment`);
            
            selectedPrice.map((item,idx) => {            
                if(item) {
                    switch(idx) {
                        case 0 : chargePoint = 10000; break;
                        case 1 : chargePoint = 20000; break;
                        case 2 : chargePoint = 30000; break;
                        case 3 : chargePoint = 50000; break;
                        case 4 : chargePoint = 100000; break;
                        case 5 : chargePoint = 200000; break;                    
                    }
                }
            });
            formdata.append("price", chargePoint);

            if(userData.phone !=  null && userData.phone != "") {
                
                formdata.append("recvphone", userData.phone);
                recvphone = userData.phone;
            } else {
                formdata.append("recvphone", "01000000000");
                recvphone = "01000000000";
            }
            formdata.append("smsuse", "n");
            formdata.append("userNo", userData.user_no);

            let requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            const result2 = await lessonRoomApi.regPayment({"userNo": userData.user_no,"price": chargePoint,"recvphone" : recvphone})
            console.log(result2)
            //setPerchasing(true), setPerchaseUrl(result.split('payurl=')[1].split('&qrurl=')[0].replace(/%3A/g, ':').replace(/%2F/g, '/')),
            /*
            await fetch("https://api.payapp.kr/oapi/apiLoad.html", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result), setPerchasing(true), setPerchaseUrl(result.split('payurl=')[1].split('&qrurl=')[0].replace(/%3A/g, ':').replace(/%2F/g, '/')),
                
                if(result != null && result.errno === "00000") {
                    console.log(result.mul_no);
                    RN.Alert.alert(
                        "결제가 완료되었습니다.",
                        "",
                        [
                        {
                            text: "확인",
                            onPress: () => navigation.pop(),
                            style: "cancel",
                        },
                        ],
                        {
                        cancelable: true,
                        onDismiss: () =>
                            Alert.alert(
                            "This alert was dismissed by tapping outside of the alert dialog."
                            ),
                        }
                    )
                } else {
                    RN.Alert.alert(
                        "결제가 취소되었습니다.",
                        "",
                        [
                        {
                            text: "확인",
                            onPress: () => navigation.pop(),
                            style: "cancel",
                        },
                        ],
                        {
                        cancelable: true,
                        onDismiss: () =>
                            Alert.alert(
                            "This alert was dismissed by tapping outside of the alert dialog."
                            ),
                        }
                    )
                }
            })
            .catch(error => console.log('error', error));
            */
        }
    
    }

    return (
        <CommonBackground>
            <CommonContainer4>
                <TitLarge>Golfai 온라인 레슨 포인트 구매</TitLarge>
                <CommonBoxWrap style={{flexWrap:'wrap',marginTop:35}}>
                    <CheckBtnWBox onPress={()=>{setSelectedPrice([true,false,false,false,false,false])}}>
                        <CheckBtnW>10,000 포인트</CheckBtnW>
                    </CheckBtnWBox>
                    <CheckBtnWBox onPress={()=>{setSelectedPrice([false,true,false,false,false,false])}}>
                        <CheckBtnW>20,000 포인트</CheckBtnW>
                    </CheckBtnWBox>
                    <CheckBtnWBox onPress={()=>{setSelectedPrice([false,false,true,false,false,false])}}>
                        <CheckBtnW>30,000 포인트</CheckBtnW>
                    </CheckBtnWBox>
                    <CheckBtnWBox onPress={()=>{setSelectedPrice([false,false,false,true,false,false])}}>
                        <CheckBtnW>50,000 포인트</CheckBtnW>
                    </CheckBtnWBox>
                    <CheckBtnWBox onPress={()=>{setSelectedPrice([false,false,false,false,true,false])}}>
                        <CheckBtnW>100,000 포인트</CheckBtnW>
                    </CheckBtnWBox>
                    <CheckBtnWBox onPress={()=>{setSelectedPrice([false,false,false,false,false,true])}}>
                        <CheckBtnW>200,000 포인트</CheckBtnW>
                    </CheckBtnWBox>
                </CommonBoxWrap>
            </CommonContainer4>
            <View>
                <PageButtonOn onPress={()=>{payment()}}><PageBtnText>포인트 결제하기</PageBtnText></PageButtonOn>                          
            </View>
        </CommonBackground>
    )
};

const styles = RN.StyleSheet.create({ // picker Style(selectBox)
    dropdown1BtnStyle: {
        width: '100%',
        height: 52,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EBEBEB',
        marginBottom: 24
    },
    dropdown1BtnTxtStyle: {color: '#666666', textAlign: 'left', fontWeight: "400"},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF',borderRadius: 8},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});

const CheckBtnWBox = styled.TouchableOpacity`
    width: 160px;
    margin-bottom: 15px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
`
const CheckBtnW = styled.Text`
    width: 100%;
    height: 60px;
    padding-top: 22px;
    border-radius: 12px;
    overflow: hidden;
    fontWeight: 400;
    font-size: 14px;
    color: #222;
    text-align: center;
    backgroundColor: #fff;
`

const CheckBtnWSelected = styled.Text`
    width: 100%;
    height: 60px;
    padding-top: 22px;
    border-radius: 12px;
    overflow: hidden;
    fontWeight: 400;
    font-size: 14px;
    color: #222;
    text-align: center;
    backgroundColor: #fff;
`

export default BuyPoints;


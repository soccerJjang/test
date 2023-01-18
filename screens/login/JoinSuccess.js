import React from 'react';
import { View, Text, Button } from 'react-native';
import { CommonBackground, CommonContainer, PageButtonOn, TitLarge } from '../../styled-components/Common';
import { 
    JoinSuccessImg,
} from '../../styled-components/login/Login';
const JoinSuccess = ({navigation, route}) => {

    
    console.log("join success !! ");
    console.log(route.params.memberType);

    return (
        <CommonBackground>
            <CommonContainer>
                <JoinSuccessImg source={require('../../images/img-JoinSuccess.png')}/>
            <TitLarge style={{ textAlign:"center" }}>
                GolfAI 회원이 되신 것을{"\n"}진심으로 환영합니다.{"\n\n"}
                {route.params.memberType == "pro"  ?
                    "프로회원의 경우 관리자 승인 이후에\n 서비스 이용이 가능합니다."
                    : null
                }
            </TitLarge>
            </CommonContainer>
            {
                route.params.memberType == "pro"  ? 
                    null : <PageButtonOn style={{ elevation: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }} onPress={() => navigation.navigate('AnalysisGuideStack')} >서비스 이용하기</PageButtonOn>
            }            
        </CommonBackground>
    )
}
export default JoinSuccess;
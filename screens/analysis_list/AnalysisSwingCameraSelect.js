import React from 'react';
import * as RN from 'react-native';
import * as CM from '../../styled-components/Common';
import * as ST from '../../styled-components/analysis_list/AnalysisSwing';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import styled from "styled-components";
import { useNavigation } from '@react-navigation/native';


const AnalysisSwingCameraSelect = (props) => {
    const BASE_URL = 'http://screengo.iptime.org';
    const DEV_URL = 'http://211.55.64.43:5006';
    const LOCAL_URL = 'http://localhost:5006';


    const [userData, setUserData] = React.useState();
    const [shadow, setShadow] = React.useState({});
    const navigation = useNavigation();

    React.useEffect(() => {
        (async () => {
            await SecureStore.getItemAsync('userData')
            .then(data => JSON.parse(data))
            .then(parseData => setUserData(parseData));
        })();
        
        if(RN.Platform.OS === 'ios') {
            setShadow(
                { 
                    shadowColor: "#000", 
                    shadowOpacity: 0.1, 
                    shadowOffset: { width: 0, height: 5 }, 
                    shadowRadius: 10 
                   } 
           )
       } else {
           setShadow(
               {
                   elevation: 15
               }
           )
       }
    }, []);




    const openCamera = async (swingType, clubType) => {
        navigation.navigate("AnalysisSwingShoot", {swingType, clubType});

    }
    
    return (
        <CM.CommonBackground>
            <ST.AnalysisSwingWrap>
                <AnalysisSwingBox
                    style={shadow}
                >
                    <ST.AnalysisSwingCon
                        onPress = {() => { openCamera('front', 'driver') }}
                    >
                        <RN.View>
                            <SwingTit>Front - Driver</SwingTit>
                        </RN.View>
                        <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                    </ST.AnalysisSwingCon>
                </AnalysisSwingBox>

                <AnalysisSwingBox
                    style={shadow}
                >
                <ST.AnalysisSwingCon
                    onPress = {() => { openCamera('rear', 'driver') }}
                >
                        <RN.View>
                            <SwingTit>Rear - Driver</SwingTit>
                        </RN.View>
                        <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                    </ST.AnalysisSwingCon>
                </AnalysisSwingBox>


                <AnalysisSwingBox
                    style={shadow}
                >
                <ST.AnalysisSwingCon
                    onPress = {() => { openCamera('front', 'iron') }}
                >
                        <RN.View>
                            <SwingTit>Front - Iron</SwingTit>
                        </RN.View>
                        <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                    </ST.AnalysisSwingCon>
                </AnalysisSwingBox>
                <AnalysisSwingBox
                    style={shadow}
                >
                <ST.AnalysisSwingCon
                    onPress = {() => { openCamera('rear', 'iron') }}
                >
                        <RN.View>
                            <SwingTit>Rear - Iron</SwingTit>
                        </RN.View>
                        <SimpleLineIcons name="arrow-right" size={14} color="#14181F" />
                    </ST.AnalysisSwingCon>
                </AnalysisSwingBox>
            </ST.AnalysisSwingWrap>
        </CM.CommonBackground>
    )

}

const AnalysisSwingBox = styled.View`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    padding: 32px 20px;
    border: 1px solid #EEEEEE;
    border-radius: 12px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.5);
    background: #fff;   
`

const SwingTit = styled.Text `
    font-size: 18px;
    color: #1a1d1e;
    font-weight: 600;
`
export default AnalysisSwingCameraSelect;
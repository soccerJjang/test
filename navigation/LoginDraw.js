import React from 'react';
import * as RN from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CommonActions, DrawerActions } from "@react-navigation/native";
import {
    AnalysisListStack,
    AnalysisDrawStack,
    ProSwingStack,
    RankingStack,
    MyPageStack,
    LoginStack,
    AnalysisGuideStack,
} from './Stack';
import {
    BoundaryLine, 
    DrawContainer, 
    DrawIcon, 
    DrawTouchable, 
    OneDepthLayer, 
    OneDepthTitle, 
    TwoDepthLayer, 
    TwoDepthTitle, 
    UserImage, 
    UserInfoLayer, 
    UserName, 
    UserTouchable 
} from '../styled-components/Draw';
import * as SecureStore from 'expo-secure-store';

const Drawer = createDrawerNavigator();

const CustomDrawLayout = (props) => {
    
        return (
            <DrawContainer>
                <UserInfoLayer> 

                    {/* <UserImage source={require('../images/img-nav-member.png')}/> */}
                    <RN.TouchableOpacity style={{marginLeft: 50}} onPress={() => props.navigation.reset({routes: [{name: 'LoginStack'}]}) }>
                        <UserName>로그인하기</UserName>
                    </RN.TouchableOpacity>
                    <UserTouchable onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}><DrawIcon source={require('../images/btn-setting.png')}/></UserTouchable>
                    <UserTouchable onPress={() => props.navigation.toggleDrawer()}><DrawIcon source={require('../images/btn-close.png')}/></UserTouchable>
                </UserInfoLayer>
                <TwoDepthLayer>         
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-gaa.png')}/>
                        <OneDepthTitle>Golf AI Analysis</OneDepthTitle>
                    </DrawTouchable>       
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>목록/촬영</TwoDepthTitle>
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>나의 영상</TwoDepthTitle>
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>보조선 그리기</TwoDepthTitle>
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>촬영 가이드</TwoDepthTitle>
                    </RN.TouchableOpacity>
                </TwoDepthLayer>
                <BoundaryLine/>

                <TwoDepthLayer>         
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-lessonRoom.png')}/>
                        <OneDepthTitle>레슨 룸</OneDepthTitle>
                    </DrawTouchable>      
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>레슨 룸</TwoDepthTitle>
                    </RN.TouchableOpacity>                      
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>레슨 프로</TwoDepthTitle>
                    </RN.TouchableOpacity>                      
                </TwoDepthLayer>
                <BoundaryLine/>

                <TwoDepthLayer>         
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-swing.png')}/>
                        <OneDepthTitle>프로</OneDepthTitle>
                    </DrawTouchable>      
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>프로 목록</TwoDepthTitle>
                    </RN.TouchableOpacity>                      
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>프로 영상</TwoDepthTitle>
                    </RN.TouchableOpacity>                      
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>프로카드 박스</TwoDepthTitle>
                    </RN.TouchableOpacity>                      
                </TwoDepthLayer>
                <BoundaryLine/>

                <TwoDepthLayer>
                    <DrawTouchable  onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <DrawIcon source={require('../images/ico-compare.png')}/>
                            <OneDepthTitle>스윙영상 비교</OneDepthTitle>
                    </DrawTouchable>
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>표준 스윙비교</TwoDepthTitle>
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>프로 스윙비교</TwoDepthTitle>
                    </RN.TouchableOpacity>
                </TwoDepthLayer>
                <BoundaryLine/>

                <OneDepthLayer>
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-rank.png')}/>
                        <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                            <OneDepthTitle>랭킹</OneDepthTitle>
                        </RN.TouchableOpacity>
                        <DrawIcon source={require('../images/ico-arrow.png')}/>
                    </DrawTouchable>
                </OneDepthLayer>
                <BoundaryLine/>

                <TwoDepthLayer>
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-commu.png')}/>
                        <OneDepthTitle>커뮤니티</OneDepthTitle>     
                    </DrawTouchable>       
                    <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>1:1 문의</TwoDepthTitle>
                    </RN.TouchableOpacity>
                    {/* <RN.TouchableOpacity onPress = {() => props.navigation.reset({routes: [{name: 'LoginStack'}]})}>
                        <TwoDepthTitle>커뮤니티</TwoDepthTitle>                
                    </RN.TouchableOpacity> */}
                </TwoDepthLayer>
                <BoundaryLine/>
            </DrawContainer>
        );
  };

const LoginDraw = () => {
        return (
            <Drawer.Navigator 
            initialRouteName='AnalysisListStack'
            screenOptions={{
                drawerPosition: 'right',
                headerStyle: {
                    backgroundColor: '#171C61'                     
                },
                headerTintColor: '#FFFFFF',
                drawerType: "front",
                headerShown: false,
            }}
            drawerContent={props => <CustomDrawLayout {...props} />}
        >
             <Drawer.Screen name="LoginStack" component={ LoginStack } 
                options={{
                    title:'로그인'
                }}
            />
            <Drawer.Screen name="MyPageStack" component={ MyPageStack } 
                ititialRoutName="MyPage"
                options={{
                    title: '마이페이지'
                }}
            />
            <Drawer.Screen name="AnalysisListStack" component={ AnalysisListStack }
                initialRouteName="AnalysisList"  
                options={{
                    title:'Golf Ai Analysis'
                }}
            />
            <Drawer.Screen name="AnalysisDrawStack" component={ AnalysisDrawStack }
                initialRouteName="AnalysisDrawing"  
                options={{
                    title:'Golf Ai Analysis'
                }}
            />
            <Drawer.Screen name="ProSwingStack" component={ ProSwingStack } 
                options={{
                    title:'프로스윙'
                }}
            />      
            <Drawer.Screen name="RankingStack" component={ RankingStack } 
                options={{
                    title:'랭킹'
                }}
            />
            <Drawer.Screen name="AnalysisGuideStack" component={ AnalysisGuideStack } 
                            ititialRoutName="AnalysisGuideStack"
                            options={{
                                title: '촬영 가이드',
                                headerShown: false
                            }}  
            />
        </Drawer.Navigator>
        ) 
};

export default LoginDraw;

import React from 'react';
import * as RN from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    AnalysisListStack,
    AnalysisDrawStack,
    ProSwingStack,
    ProVideoStack,
    ProCardBoxStack,
    SwingCompareStack,
    RankingStack,
    MyPageStack,
    InquiryStack,
    CommunityStack,
    MySwingVideoStack,
    AnalysisGuideStack,
    LessonRoomStack,
    LessonProStack,
    LessonProRoomStack,
} from './Stack';
import { LessonRoomTab } from './Tab'
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
import { CommonActions, DrawerActions} from "@react-navigation/native";
import AnalysisAdmob from '../screens/analysis_list/AnalysisAdmob';
import SwingPositionComparisonImg from '../screens/swing_compare/SwingPositionComparisonImg';
import Splash from '../screens/splash/Splash';
import AnalysisGuide from '../screens/analysis_list/AnalysisGuide';

const Drawer = createDrawerNavigator();
const CustomDrawLayout = (props) => {
    const [user, setUser] = React.useState(null);
    const [nickname, setNickname] = React.useState(null);
    React.useEffect(() => {
        getUserData();
    }, [])
   
    const getItem = async() => {
        try {
            const getUserData = await SecureStore.getItemAsync('userData');
        } catch(e) {
            console.log(e);
        }
    }
    const getUserData = async() => {
        let userData = null;
        userData = await SecureStore.getItemAsync("userData"); 
        
        if(userData) {
            userData = JSON.parse(userData);
            if(userData.nickname.length > 4) {
                setNickname(userData.nickname.substr(0, 4) + "..");
            } else {
                setNickname(userData.nickname);
            }
            setUser(userData);
        }
    };
        return (
            <DrawContainer>
                <UserInfoLayer> 
                    
                    {/* <UserImage source={require('../images/img-nav-member.png')}/> */}
                    <UserName style={{marginLeft: 50}}>{user != null && user.nickname != null && user.nickname != "null" ? nickname + " 님" : "정보 없음" }</UserName>
                    <UserTouchable onPress = {() => props.navigation.reset({routes: [{name: 'MyPageStack'}]})}><DrawIcon source={require('../images/btn-setting.png')}/></UserTouchable>
                    <UserTouchable onPress={() => props.navigation.toggleDrawer()}><DrawIcon source={require('../images/btn-close.png')}/></UserTouchable>
                </UserInfoLayer>
                <TwoDepthLayer>         
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-gaa.png')}/>
                        <OneDepthTitle>Golf AI Analysis</OneDepthTitle>
                    </DrawTouchable>       
                    <RN.TouchableOpacity onPress = {() => props.navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                        {
                                            name: 'AnalysisListStack',
                                            params: { data: user }
                                        }
                                    ]
                                }) 
                            )}>
                        <TwoDepthTitle>목록/촬영</TwoDepthTitle>
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity onPress = {() => 
                        props.navigation.dispatch(
                            CommonActions.reset({
                                routes: [
                                    {
                                        name: 'MySwingVideoStack',
                                        params: { data: user, mode : "pro" }
                                    }
                                ]
                            })
                        )}                        
                    >
                        <TwoDepthTitle>나의 영상</TwoDepthTitle>
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity onPress = {() => props.navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                        {
                                            name: 'AnalysisDrawStack',
                                            params: { data: user }
                                        }
                                    ]
                                })
                            )}>
                        <TwoDepthTitle>보조선 그리기</TwoDepthTitle>
                    </RN.TouchableOpacity>

                    <RN.TouchableOpacity onPress = {() => props.navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                        {
                                            name: 'AnalysisGuideStack',                                            
                                            params: { data: user }
                                        }
                                    ],
                                    
                                
                                })
                            )}>
                        <TwoDepthTitle>촬영 가이드</TwoDepthTitle>
                    </RN.TouchableOpacity>
                </TwoDepthLayer>
                <BoundaryLine/>

                {/* 레슨 룸 1011 Start */}
                <TwoDepthLayer>         
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-lessonRoom.png')}/>
                        <OneDepthTitle>레슨 룸</OneDepthTitle>
                    </DrawTouchable>      
                    <RN.TouchableOpacity onPress = {() => props.navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                { 
                                    name: 'LessonRoomStack',
                                    params: { data: user }
                                },
                            ]
                        })
                    )}>
                        <TwoDepthTitle>레슨 룸</TwoDepthTitle>
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity onPress = {() => props.navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                { 
                                    name: 'LessonProStack',
                                    params: { data: user }
                                },
                            ]
                        })
                    )}>
                        <TwoDepthTitle>레슨 프로</TwoDepthTitle>
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity onPress = {() => props.navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                { 
                                    name: 'LessonProRoomStack',
                                    params: { data: user }
                                },
                            ]
                        })
                    )}>
                        <TwoDepthTitle>레슨 프로룸</TwoDepthTitle>
                    </RN.TouchableOpacity>
                </TwoDepthLayer>
                <BoundaryLine />
                {/* 레슨 룸 1011 End */}

                <TwoDepthLayer>         
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-swing.png')}/>
                        <OneDepthTitle>프로</OneDepthTitle>
                    </DrawTouchable>      
                    <RN.TouchableOpacity onPress = {() => props.navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                { 
                                    name: 'ProSwingStack',
                                    params: { data: user }
                                },
                            ]
                        })
                    )}>
                    <TwoDepthTitle>프로 목록</TwoDepthTitle>
                    </RN.TouchableOpacity>                                                          
                    <RN.TouchableOpacity onPress = {() => props.navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                { 
                                    name: 'ProVideoStack',
                                },
                            ]
                        })
                    )}>
                    <TwoDepthTitle>프로 영상</TwoDepthTitle>
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity onPress = {() => props.navigation.dispatch(
                        CommonActions.reset({
                            routes: [
                                { 
                                    name: 'ProCardBoxStack',
                                },
                            ]
                        })
                    )}>
                    <TwoDepthTitle>프로카드 박스</TwoDepthTitle>
                    </RN.TouchableOpacity>
                </TwoDepthLayer>
                <BoundaryLine />


                <TwoDepthLayer>         
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-compare.png')}/>
                        <OneDepthTitle>스윙영상 비교</OneDepthTitle>
                    </DrawTouchable>    
                    <RN.TouchableOpacity onPress = {() => 
                        props.navigation.dispatch(
                            CommonActions.reset({
                                routes: [
                                    {
                                        name: 'SwingCompareStack',
                                        params: { data: user, mode : "default" }
                                    }
                                ]
                            })
                        )}
                    >
                        <TwoDepthTitle>표준 스윙비교</TwoDepthTitle>
                    </RN.TouchableOpacity>          
                    <RN.TouchableOpacity onPress = {() => 
                        props.navigation.dispatch(
                            CommonActions.reset({
                                routes: [
                                    {
                                        name: 'SwingCompareStack',
                                        params: { data: user, mode : "pro" }
                                    }
                                ]
                            })
                        )}
                    >
                        <TwoDepthTitle>프로 스윙비교</TwoDepthTitle>
                    </RN.TouchableOpacity>
                </TwoDepthLayer>
                <BoundaryLine />

                {/* <OneDepthLayer>
                    <DrawTouchable onPress = {() => 
                        props.navigation.dispatch(
                            CommonActions.reset({
                                routes: [
                                    {
                                        name: 'SwingCompareStack',
                                        params: { data: user }
                                    }
                                ]
                            })
                        )}
                    >
                        <DrawIcon source={require('../images/ico-compare.png')}/>
                        <OneDepthTitle>스윙영상 비교</OneDepthTitle>
                        <DrawIcon source={require('../images/ico-arrow.png')}/>
                    </DrawTouchable>
                </OneDepthLayer> */}
                
                <OneDepthLayer>
                    <DrawTouchable onPress = {() => props.navigation.reset({routes: [{name: 'RankingStack'}]})}>
                        <DrawIcon source={require('../images/ico-rank.png')}/>
                        <OneDepthTitle>랭킹</OneDepthTitle>
                        <DrawIcon source={require('../images/ico-arrow.png')}/>
                    </DrawTouchable>
                </OneDepthLayer>
                <BoundaryLine/>
                <TwoDepthLayer>
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-commu.png')}/>
                        <OneDepthTitle>커뮤니티</OneDepthTitle>     
                    </DrawTouchable>       
                    <RN.TouchableOpacity onPress = { () => props.navigation.dispatch(
                            CommonActions.reset({
                                routes : [
                                    {
                                        name: 'InquiryStack',
                                        params: { data: user },
                                    }
                                ]
                            })
                        )}>
                        <TwoDepthTitle>1:1 문의</TwoDepthTitle>
                    </RN.TouchableOpacity>
{/* 
                    <RN.TouchableOpacity onPress = { () => props.navigation.dispatch(
                            CommonActions.reset({
                                routes : [
                                    {
                                        name: 'CommunityStack',
                                        params: { data: user },
                                    }
                                ]
                            })
                        )}>
                        <TwoDepthTitle>커뮤니티</TwoDepthTitle>
                    </RN.TouchableOpacity> */}
                </TwoDepthLayer>
                <BoundaryLine/>
            </DrawContainer>
        );
  };
const HomeDraw = () => {
        return (
            <Drawer.Navigator 
            initialRouteName='AnalysisListStack'
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF',
                drawerType : "front"
            }}
            drawerContent={props => <CustomDrawLayout {...props} />}
        >
            <Drawer.Screen name="AnalysisListStack" component={ AnalysisListStack }
                initialRouteName="AnalysisList"  
                options={{
                    title: '마이페이지',
                    headerShown: false
                }}
                
            />
             <Drawer.Screen name="AnalysisDrawStack" component={ AnalysisDrawStack }
                initialRouteName="AnalysisDrawing"  
                options={{
                    title:'Golf Ai Analysis',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="ProSwingStack" component={ ProSwingStack } 
                options={{
                    title:'프로스윙',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="ProVideoStack" component={ ProVideoStack }
                options={{
                    title: '프로영상',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="ProCardBoxStack" component={ ProCardBoxStack }
                options={{
                    title: '프로카드 박스',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="SwingCompareStack" component={ SwingCompareStack } 
                options={{
                    title: '스윙영상 비교',
                    headerShown: false,
                }}
            />
            <Drawer.Screen name="MySwingVideoStack" component={ MySwingVideoStack } 
                options={{
                    title: '나의 스윙영상',
                    headerShown: false,
                }}
            />
            <Drawer.Screen name="RankingStack" component={ RankingStack } 
                options={{
                    title:'랭킹',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="InquiryStack" component={ InquiryStack }
                options={{
                    title: '1:1 문의하기',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="CommunityStack" component={ CommunityStack }
                options={{
                    title: '커뮤니티',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="SwingPositionComparisonImg" component={ SwingPositionComparisonImg }
                options={{
                    title: '프로비교퍼블',
                    headerShown: true
                }}
            />
            <Drawer.Screen name="MyPageStack" component={ MyPageStack } 
                ititialRoutName="MyPage"
                options={{
                    title: '마이페이지',
                    headerShown: false
                }}  
            />
            <Drawer.Screen name="AnalysisGuideStack" component={ AnalysisGuideStack } 
                ititialRoutName="AnalysisGuideStack"
                options={{
                    title: '촬영 가이드',
                    headerShown: false
                }}  
            />

            <Drawer.Screen name="LessonRoomStack" component={ LessonRoomStack } 
                ititialRoutName="LessonRoomStack"
                options={{
                    title: '레슨 룸',
                    headerShown: false
                }}  
            />
            <Drawer.Screen name="LessonProStack" component={ LessonProStack } 
                ititialRoutName="LessonProStack"
                options={{
                    title: '레슨 프로',
                    headerShown: false
                }}  
            />
            <Drawer.Screen name="LessonProRoomStack" component={ LessonProRoomStack } 
                ititialRoutName="LessonProRoomStack"
                options={{
                    title: '레슨 프로룸',
                    headerShown: false
                }}  
            />
            {/* <Drawer.Screen name="Splash" component={ Splash } 
                options={{
                    title:'splashScreen',
                    headerShown: false
                }}
            /> */}
        </Drawer.Navigator>
        ) 
};
export default HomeDraw;

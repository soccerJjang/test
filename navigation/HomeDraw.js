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
                    <UserName style={{marginLeft: 50}}>{user != null && user.nickname != null && user.nickname != "null" ? nickname + " ???" : "?????? ??????" }</UserName>
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
                        <TwoDepthTitle>??????/??????</TwoDepthTitle>
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
                        <TwoDepthTitle>?????? ??????</TwoDepthTitle>
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
                        <TwoDepthTitle>????????? ?????????</TwoDepthTitle>
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
                        <TwoDepthTitle>?????? ?????????</TwoDepthTitle>
                    </RN.TouchableOpacity>
                </TwoDepthLayer>
                <BoundaryLine/>

                {/* ?????? ??? 1011 Start */}
                <TwoDepthLayer>         
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-lessonRoom.png')}/>
                        <OneDepthTitle>?????? ???</OneDepthTitle>
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
                        <TwoDepthTitle>?????? ???</TwoDepthTitle>
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
                        <TwoDepthTitle>?????? ??????</TwoDepthTitle>
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
                        <TwoDepthTitle>?????? ?????????</TwoDepthTitle>
                    </RN.TouchableOpacity>
                </TwoDepthLayer>
                <BoundaryLine />
                {/* ?????? ??? 1011 End */}

                <TwoDepthLayer>         
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-swing.png')}/>
                        <OneDepthTitle>??????</OneDepthTitle>
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
                    <TwoDepthTitle>?????? ??????</TwoDepthTitle>
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
                    <TwoDepthTitle>?????? ??????</TwoDepthTitle>
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
                    <TwoDepthTitle>???????????? ??????</TwoDepthTitle>
                    </RN.TouchableOpacity>
                </TwoDepthLayer>
                <BoundaryLine />


                <TwoDepthLayer>         
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-compare.png')}/>
                        <OneDepthTitle>???????????? ??????</OneDepthTitle>
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
                        <TwoDepthTitle>?????? ????????????</TwoDepthTitle>
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
                        <TwoDepthTitle>?????? ????????????</TwoDepthTitle>
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
                        <OneDepthTitle>???????????? ??????</OneDepthTitle>
                        <DrawIcon source={require('../images/ico-arrow.png')}/>
                    </DrawTouchable>
                </OneDepthLayer> */}
                
                <OneDepthLayer>
                    <DrawTouchable onPress = {() => props.navigation.reset({routes: [{name: 'RankingStack'}]})}>
                        <DrawIcon source={require('../images/ico-rank.png')}/>
                        <OneDepthTitle>??????</OneDepthTitle>
                        <DrawIcon source={require('../images/ico-arrow.png')}/>
                    </DrawTouchable>
                </OneDepthLayer>
                <BoundaryLine/>
                <TwoDepthLayer>
                    <DrawTouchable>
                        <DrawIcon source={require('../images/ico-commu.png')}/>
                        <OneDepthTitle>????????????</OneDepthTitle>     
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
                        <TwoDepthTitle>1:1 ??????</TwoDepthTitle>
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
                        <TwoDepthTitle>????????????</TwoDepthTitle>
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
                    title: '???????????????',
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
                    title:'????????????',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="ProVideoStack" component={ ProVideoStack }
                options={{
                    title: '????????????',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="ProCardBoxStack" component={ ProCardBoxStack }
                options={{
                    title: '???????????? ??????',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="SwingCompareStack" component={ SwingCompareStack } 
                options={{
                    title: '???????????? ??????',
                    headerShown: false,
                }}
            />
            <Drawer.Screen name="MySwingVideoStack" component={ MySwingVideoStack } 
                options={{
                    title: '?????? ????????????',
                    headerShown: false,
                }}
            />
            <Drawer.Screen name="RankingStack" component={ RankingStack } 
                options={{
                    title:'??????',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="InquiryStack" component={ InquiryStack }
                options={{
                    title: '1:1 ????????????',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="CommunityStack" component={ CommunityStack }
                options={{
                    title: '????????????',
                    headerShown: false
                }}
            />
            <Drawer.Screen name="SwingPositionComparisonImg" component={ SwingPositionComparisonImg }
                options={{
                    title: '??????????????????',
                    headerShown: true
                }}
            />
            <Drawer.Screen name="MyPageStack" component={ MyPageStack } 
                ititialRoutName="MyPage"
                options={{
                    title: '???????????????',
                    headerShown: false
                }}  
            />
            <Drawer.Screen name="AnalysisGuideStack" component={ AnalysisGuideStack } 
                ititialRoutName="AnalysisGuideStack"
                options={{
                    title: '?????? ?????????',
                    headerShown: false
                }}  
            />

            <Drawer.Screen name="LessonRoomStack" component={ LessonRoomStack } 
                ititialRoutName="LessonRoomStack"
                options={{
                    title: '?????? ???',
                    headerShown: false
                }}  
            />
            <Drawer.Screen name="LessonProStack" component={ LessonProStack } 
                ititialRoutName="LessonProStack"
                options={{
                    title: '?????? ??????',
                    headerShown: false
                }}  
            />
            <Drawer.Screen name="LessonProRoomStack" component={ LessonProRoomStack } 
                ititialRoutName="LessonProRoomStack"
                options={{
                    title: '?????? ?????????',
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

import * as React from "react";
import * as RN from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { 
    AnalysisDrawTab,
    AnalysisSwingTab,
    ProSwingTab, 
    RankingTab,
    MyPageTab,
    AnalysisDrawRearTab,
    AnalysisSwingPartViewTab,
    LessonRoomTab,
} from './Tab';

import AnalysisDrawing from '../screens/analysis_draw/AnalysisDrawing';
import AnalysisCanvas from "../screens/analysis_draw/AnalysisCanvas";

import AnalysisList from '../screens/analysis_list/AnalysisList';
import AnalysisSwing from '../screens/analysis_list/AnalysisSwing';
import AnalysisSwingSelect from '../screens/analysis_list/AnalysisSwingSelect';
import AnalysisSwingShoot from '../screens/analysis_list/AnalysisSwingShoot';
import AnalysisSwingDetail from '../screens/analysis_list/AnalysisSwingDetail';
import AnalysisSwingDetailSwipe from "../screens/analysis_list/AnalysisSwingDetailSwipe";

import CameraTest from "../screens/analysis_list/CameraTest";

import Login from '../screens/login/Login';
import KakaoWebView from "../screens/login/KakaoWebView";
import NaverWebView from "../screens/login/NaverWebView";
import SnsJoin from "../screens/login/SnsJoin";
import FindPwdStep1 from '../screens/login/FindPwdStep1';
import FindPwdStep2 from '../screens/login/FindPwdStep2';
import FindPwdStep3 from '../screens/login/FindPwdStep3';
import FindPwdSuccess from '../screens/login/FindPwdSuccess';
import Join from "../screens/login/Join";
import JoinSuccess from "../screens/login/JoinSuccess";

import ProSortList from '../screens/pro_swing/ProSortList';
import ProView from "../screens/pro_swing/ProView";
import ProVideo from "../screens/pro_swing/ProVideo";

import ProVideoList from '../screens/pro_swing/ProVideoList';
import ProVideoView from "../screens/pro_swing/ProVideoView";

import ProCardBoxList from '../screens/pro_swing/ProCardBoxList';
import ProCardBoxView from "../screens/pro_swing/ProCardBoxView";

import SwingCompareList from "../screens/swing_compare/SwingCompareList";
import SwingCompareView from "../screens/swing_compare/SwingCompareView";
import SwingCompareAnalysis from "../screens/swing_compare/SwingCompareAnalysis";

import MyPage from '../screens/my_page/MyPage';
import { Foundation } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";
import AnalysisSwingRearProCard from "../screens/analysis_list/AnalysisSwingRearProCard";
import MainTotalView from "../components/MainTotalView";
import AnalysisAdmob from "../screens/analysis_list/AnalysisAdmob";
import RankingDailyList from "../screens/ranking/RankingDailyList";
import Inquiry from '../screens/community/Inquiry';
import Community from '../screens/community/Community';
import CommunityWrite from '../screens/community/CommunityWrite';
import CommunityView from "../screens/community/CommunityView";
import SwingPositionComparisonImg from "../screens/swing_compare/SwingPositionComparisonImg";
import AnalysisSwingCameraSelect from "../screens/analysis_list/AnalysisSwingCameraSelect";
import MySwingList from "../screens/swing_compare/MySwingList";
import MySwingVideo from "../screens/swing_compare/MySwingVideo";
import * as ScreenOrientation from 'expo-screen-orientation';
import Profile from "../screens/my_page/Profile";
import Version from "../screens/my_page/Version";
import AnalysisGuide from "../screens/analysis_list/AnalysisGuide";
import LessonRoomList from "../screens/lesson_room/LessonRoomList";
import LessonRoomDetail from "../screens/lesson_room/LessonRoomDetail";
import LessonRoomChat from "../screens/lesson_room/LessonRoomChat";
import LessonRoomRegist from "../screens/lesson_room/LessonRoomRegist";
import LessonOption from "../screens/lesson_room/LessonOption";
import LessonRoomVideo from "../screens/lesson_room/LessonRoomVideo";
import LessonProRoomList from "../screens/lesson_pro_room/LessonProRoomList";
import LessonProRoomDetail from "../screens/lesson_pro_room/LessonProRoomDetail";
import LessonProRoomChat from "../screens/lesson_pro_room/LessonProRoomChat";
import LessonProRoomVideo from "../screens/lesson_pro_room/LessonProRoomVideo";
import LessonProList from "../screens/lesson_pro/LessonProList";
import LessonProLessonList from "../screens/lesson_pro/LessonProLessonList";
import LessonProLessonDetail from "../screens/lesson_pro/LessonProLessonDetail";
import LessonProVideo from "../screens/lesson_pro/LessonProVideo";
import ProGolfer from "../screens/apply/ProGolfer";
import Point from "../screens/my_page/Point";
import BuyPoints from "../screens/online_lesson/BuyPoints";
import Perchase from "../screens/online_lesson/Perchase";
import { StackActions, useIsFocused, useNavigation, useNavigationState, useRoute } from "@react-navigation/native";

const AnalysisDrawNav = createStackNavigator();
const AnalysisListNav = createStackNavigator();
const AnalysisViewNav = createStackNavigator();
const LoginNav = createStackNavigator();
const RankingNav = createStackNavigator();
const ProSwingNav = createStackNavigator();
const ProVideoNav = createStackNavigator();
const ProCardBoxNav = createStackNavigator();
const ProSwingCompareStackNav = createStackNavigator();
const MySwingVideoStackNav = createStackNavigator();
const MyPageNav = createStackNavigator();
const InquiryNav = createStackNavigator();
const CommunityNav = createStackNavigator();
const GuideNav = createStackNavigator();
const LessonProNav = createStackNavigator();

export const AnalysisListStack = (props) => {
    const data = props.data;
    return (
        <AnalysisListNav.Navigator
            initialRouteName="AnalysisList" 
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF',
                title: "Golf AI Analysis",
                headerTitleAlign: 'center',
                headerRight : () => (
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
            }}
        >
            <AnalysisListNav.Screen name="AnalysisList" component={ AnalysisList } />
            <ProSwingNav.Screen name="AnalysisListProView" component={ProView}/>
            <ProVideoNav.Screen name="ProVideoView" component={ProVideoView} />
            <ProSwingNav.Screen name="ProVideo" component={ProVideo}  />

            <AnalysisListNav.Screen name="AnalysisSwing" component={ AnalysisSwing } />
            <AnalysisListNav.Screen name="AnalysisSwingSelect" component={ AnalysisSwingSelect } />
            <AnalysisListNav.Screen name="AnalysisSwingCameraSelect" component={ AnalysisSwingCameraSelect } />
            <AnalysisListNav.Screen name="AnalysisSwingShoot" component={ AnalysisSwingShoot } options={{
                headerStyle : { backgroundColor : "black" } }}/>
            <AnalysisListNav.Screen name="AnalysisSwingDetail" component={ AnalysisSwingDetail } />
            <AnalysisListNav.Screen name="AnalysisSwingDetailSwipe" component={ AnalysisSwingDetailSwipe } />             
            <AnalysisListNav.Screen name="AnalysisSwingTab" component={ AnalysisSwingTab } />
            <AnalysisListNav.Screen name="CameraTest" component={ CameraTest } options={{
                headerStyle : { backgroundColor : "black", }, }}/>
            <AnalysisListNav.Screen name="AnalysisAdmob" component={ AnalysisAdmob } 
                options={{ title:'광고영상', headerShown: false }}
            />
            <AnalysisListNav.Screen name="AnalysisSwingRearProCard" children={ ()=> <AnalysisSwingRearProCard/>} />           
            <AnalysisListNav.Screen name="AnalysisProfile" children={ ()=> <Profile/>} /> 
        </AnalysisListNav.Navigator>
    )
}

export const AnalysisViewStack = (props) => {
    const data = props.data;
    return(
        <AnalysisViewNav.Navigator 
            initialRouteName="TotalView"     
            screenOptions={{headerShown:false}}

        >
            <AnalysisViewNav.Screen name="TotalView" children={ ()=> <MainTotalView data={data}/>}/>
            <AnalysisViewNav.Screen name="PartView" children={ ()=> <AnalysisSwingPartViewTab data={data}/>}/>
            <AnalysisViewNav.Screen name="ProView" children={ ()=> <AnalysisSwingRearProCard data={data}/>}/>
            <AnalysisViewNav.Screen name="ProVideo" component={ ProVideo } />
        </AnalysisViewNav.Navigator>
    );
};

export const AnalysisGuideStack = (props) => {

    return(

        <GuideNav.Navigator 
        initialRouteName="AnalysisGuide"     
        screenOptions={{
            headerShown:true,
            headerBackVisible:true,     
            headerTitleAlign: 'center', 
            headerTitle: '촬영 가이드',      
            
            headerRight : () => (
                // <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
            ),
            headerLeft : () => (


                RN.Platform.OS == 'android' ? 
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{display: 'flex', flexDirection : 'row', alignItems: 'center', marginLeft : 10}}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>                
                :
                // <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{display: 'flex', flexDirection : 'row', alignItems: 'center'}}>
                    <Ionicons name="chevron-back-outline" size={35} color="white" />
                    <RN.Text style={{color:'white', fontSize: 18}}>Back</RN.Text>
                </TouchableOpacity>
            ),
            
            
        }}
        >
        <GuideNav.Screen name="AnalysisGuide" 
            options={{ headerStyle : { backgroundColor : "black" }, headerTintColor: '#FFFFFF' }} 
            children={ ()=> <AnalysisGuide/>}
        />        
    </GuideNav.Navigator>
    )
}


export const AnalysisDrawStack = ({navigation}) => {

    return (
        <AnalysisDrawNav.Navigator
            initialRouteName="AnalysisDrawing"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                title: "보조선 그리기",
                headerRight : () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
            }}
        >
            <AnalysisDrawNav.Screen name="AnalysisDrawing" component={ AnalysisDrawing } />
            <AnalysisDrawNav.Screen name="AnalysisDrawRearTab" component={AnalysisDrawRearTab} />
            <AnalysisDrawNav.Screen name="AnalysisDrawTab" component={ AnalysisDrawTab } />
            <AnalysisDrawNav.Screen name="AnalysisCanvas" component={ AnalysisCanvas } />
        </AnalysisDrawNav.Navigator>
    );
}

export const LoginStack = ({navigation}) => {

    return (
        <LoginNav.Navigator
            initialRouteName="Login"
            
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerRight : () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
            }}
        >
            <LoginNav.Screen name="Login" component={ Login } options={{ title: "로그인" }}/>
            <LoginNav.Screen name="KakaoWebView" component={ KakaoWebView } options={{ title: "로그인" }} />
            <LoginNav.Screen name="NaverWebView" component={ NaverWebView } options={{ title: "로그인" }} />
            <LoginNav.Screen name="SnsJoin" component={ SnsJoin } options={{ title: "회원가입"}} />
            <LoginNav.Screen name="Join" component={ Join } options={{ title: "회원가입" }} />
            <LoginNav.Screen name="JoinSuccess" component={ JoinSuccess } options={{ title: "회원가입" }}/>
            <LoginNav.Screen name="FindPwdStep1" component={ FindPwdStep1 } options={{ title: "비밀번호 찾기" }} />
            <LoginNav.Screen name="FindPwdStep2" component={ FindPwdStep2 } options={{ title: "비밀번호 찾기" }} />
            <LoginNav.Screen name="FindPwdStep3" component={ FindPwdStep3 } options={{ title: "비밀번호 찾기" }} />
            <LoginNav.Screen name="FindPwdSuccess" component={ FindPwdSuccess } options={{ title: "비밀번호 찾기" }} />
        </LoginNav.Navigator>
    )
}

export const ProSwingStack = (props) => {
    const navigation = props.navigation;
    const user = props.route.params.data;
    const pro = props.route.params.pro;
    return(
        <ProSwingNav.Navigator  
            screenOptions={{ 
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF', 
                headerTitleAlign: 'center',
                title: "프로스윙",
                headerRight : () => (
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
                
            }}>
            <ProSwingNav.Screen name="proSwing" component={ProSortList} initialParams={{ user: user }} />
            <ProSwingNav.Screen name="ProView" component={ProView} initialParams={{userData: user, data: pro}}/>
            <ProVideoNav.Screen name="ProVideoView" component={ProVideoView} />
            <ProSwingNav.Screen name="ProVideo" component={ProVideo} initialParams={{user: user}} />
        </ProSwingNav.Navigator>
    )   
}

export const ProVideoStack = (props) => {
    return (
        <ProVideoNav.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                title: "프로 영상",
                headerRight : () => (
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
            }}>
            <ProVideoNav.Screen name="ProVideoList" component={ProVideoList} />
            <ProVideoNav.Screen name="ProVideoView" component={ProVideoView} />
            <ProVideoNav.Screen name="ProVideo" component={ProVideo} />
        </ProVideoNav.Navigator>
    )
}

export const ProCardBoxStack = (props) => {
    return (
        <ProCardBoxNav.Navigator
            initialRouteName="ProCardBoxList"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                title: '프로카드 박스',
                headerRight : () => (
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{marginRight: 25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
            }}>
            <ProCardBoxNav.Screen name="ProCardBoxList" component={ProCardBoxList} />
            <ProCardBoxNav.Screen name="ProCardBoxView" component={ProCardBoxView} />
            <ProSwingNav.Screen name="ProView" component={ProView} />
            <ProVideoNav.Screen name="ProVideoList" component={ProVideoList} />
            <ProVideoNav.Screen name="ProVideoView" component={ProVideoView} />
            <ProVideoNav.Screen name="ProVideo" component={ProVideo} />
        </ProCardBoxNav.Navigator>
    )
}

export const SwingCompareStack = (props) => {
    const user = props.route.params.data;
    const mode = props.route.params.mode;

    React.useEffect(()=> {

        console.log("swingcomparestack", user);
        return ()=> {
            (async () => {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
                await ScreenOrientation.unlockAsync();
            })();
        }
    },[])


    return(
        <ProSwingCompareStackNav.Navigator
            initialRouteName="SwingCompareList"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171C61',                                        
                },                
                headerTitleAlign: 'center',
                headerTintColor: '#FFFFFF',
                title: mode == 'default' ? ' 표준스윙 영상 비교' : '프로스윙 영상 비교',
                headerRight: () => (
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                ) 
            }}
        >
            <ProSwingCompareStackNav.Screen name="SwingCompareList" component={ SwingCompareList } initialParams={{ user: user, mode }} />            
            <ProSwingCompareStackNav.Screen name="SwingPositionComparisonImg" component={ SwingPositionComparisonImg } initialParams={{ user: user, mode }} />
            <ProSwingCompareStackNav.Screen name="SwingCompareView" component={ SwingCompareView } initialParams={{ user: user, mode }} options={{ headerShown: false }}/>
            <ProSwingCompareStackNav.Screen name="SwingCompareAnalysis" component = { SwingCompareAnalysis } />
        </ProSwingCompareStackNav.Navigator>
    )
}


export const MySwingVideoStack = (props) => {
    const user = props.route.params.data;
    const mode = props.route.params.mode;
    return(
        <MySwingVideoStackNav.Navigator
        initialRouteName="MySwingList"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTitleAlign: 'center',
                headerTintColor: '#FFFFFF',
                title: '나의 스윙영상',
                headerRight: () => (
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                ) 
            }}
        >
            <MySwingVideoStackNav.Screen name="MySwingList" component={ MySwingList } initialParams={{ user: user, mode }} />                        
            <MySwingVideoStackNav.Screen name="MySwingVideo" component={ MySwingVideo } initialParams={{ user: user, mode }} />
        </MySwingVideoStackNav.Navigator>
    )
}

export const RankingStack = ({navigation}) => {
    return(
        <RankingNav.Navigator 
            initialRouteName="Daily"
            screenOptions={{ 
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTitleAlign: 'center',
                headerTintColor: '#FFFFFF', 
                title: "랭킹",
                headerRight : () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
        
            }}>                
            <RankingNav.Screen name="Daily" component={ RankingDailyList } />
            <RankingNav.Screen name="Weekly" component={ RankingDailyList } />
            <RankingNav.Screen name="Monthly" component={ RankingDailyList } />
        </RankingNav.Navigator>
    )    
}

export const MyPageStack = ({navigation}) => {
    return(
        <MyPageNav.Navigator 
            screenOptions={{ 
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerRight : () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginRight:25}}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
            }}>
            <MyPageNav.Screen name="MyPage" component={MyPage} options={{ title: "마이페이지" }} />            
            <MyPageNav.Screen name="MyPageTab" component={MyPageTab} options={{ title: "내 정보관리" }} />
            <MyPageNav.Screen name="Point" component={Point} options={{ title: "포인트관리" }} />
            <MyPageNav.Screen name="BuyPoints" component={BuyPoints} options={{ title: "포인트충전" }} />
            <MyPageNav.Screen name="Perchase" component={Perchase} options={{ title: "결제" }} />
            <MyPageNav.Screen name="Version" component={Version} options={{ title: "버전확인" }} />
        </MyPageNav.Navigator>
    )
}

export const InquiryStack = (props) => {
    const user = props.route.params.data;
    return(
        <InquiryNav.Navigator
            initialRouteName="Inquiry"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerRight : () => (
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{ marginRight:25 }}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
            }}>
                <InquiryNav.Screen name="Inquiry" component={ Inquiry } initialParams={{user: user}} options={{ title: "커뮤니티" }} />
        </InquiryNav.Navigator>
    )
}


export const CommunityStack = (props) => {
    return(
        <CommunityNav.Navigator
            initialRouteName="Community"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerRight : () => (
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{ marginRight:25 }}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
            }}>
                <CommunityNav.Screen name="Community" component={ Community }  options={{ title: "커뮤니티" }} />
                <CommunityNav.Screen name="CommunityView" component={ CommunityView } options={{ title: "커뮤니티" }} />
                <CommunityNav.Screen name="CommunityWrite" component={ CommunityWrite }  options={{ title: "게시글 작성" }} />
        </CommunityNav.Navigator>
    )
}

export const LessonRoomStack = (props) => {
    const [state, setState] = React.useState(false)
    const [Chat, setChat] = React.useState(false)
    const [title, setTitle] = React.useState("")

    const user = props.route.params.data;
    const navigation = useNavigation()
    const route = useRoute()
    const popAction = StackActions.pop(1)
    // const popAction = StackActions.push({routeName: 'LessonRoomList'})
    return(
        <LessonProNav.Navigator
            initialRouteName="LessonRoomTab"
            screenListeners={{state: (e)=> {
                (e?.data?.state?.routes[0]?.state?.routes[0]?.state?.routes.slice(-1)[0]?.name === "LessonRoomRegist") ||
                (e?.data?.state?.routes[0]?.state?.routes[0]?.state?.routes.slice(-1)[0]?.name === "LessonOption") ||
                (e?.data?.state?.routes[0]?.state?.routes[0]?.state?.routes.slice(-1)[0]?.name === "LessonRoomDetail") ||
                (e?.data?.state?.routes[0]?.state?.routes[0]?.state?.routes.slice(-1)[0]?.name === "LessonRoomChat") ||
                (e?.data?.state?.routes[0]?.state?.routes[0]?.state?.routes.slice(-1)[0]?.name === "ProVideo") || 
                (e?.data?.state?.routes[0]?.state?.routes[0]?.state?.routes.slice(-1)[0]?.name === "LessonRoomVideo") || 
                (e?.data?.state?.routes[0]?.state?.routes[0]?.state?.routes.slice(-1)[0]?.name === "BuyPoints") || 
                (e?.data?.state?.routes[0]?.state?.routes[0]?.state?.routes.slice(-1)[0]?.name === "Perchase") || 
                (e?.data?.state?.routes[0]?.state?.routes[1]?.state?.routes.slice(-1)[0]?.name === "LessonRoomRegist") ||
                (e?.data?.state?.routes[0]?.state?.routes[1]?.state?.routes.slice(-1)[0]?.name === "LessonOption") ||
                (e?.data?.state?.routes[0]?.state?.routes[1]?.state?.routes.slice(-1)[0]?.name === "LessonRoomDetail") ||
                (e?.data?.state?.routes[0]?.state?.routes[1]?.state?.routes.slice(-1)[0]?.name === "LessonRoomChat") ||
                (e?.data?.state?.routes[0]?.state?.routes[1]?.state?.routes.slice(-1)[0]?.name === "ProVideo") ||
                (e?.data?.state?.routes[0]?.state?.routes[1]?.state?.routes.slice(-1)[0]?.name === "LessonRoomVideo") ||
                (e?.data?.state?.routes[0]?.state?.routes[1]?.state?.routes.slice(-1)[0]?.name === "BuyPoints") ||
                (e?.data?.state?.routes[0]?.state?.routes[1]?.state?.routes.slice(-1)[0]?.name === "Perchase") ?
                    setState(true)
                :
                    setState(false),
                (e?.data?.state?.routes[0]?.state?.routes[0]?.state?.routes.slice(-1)[0]?.name === "LessonRoomChat") ||
                (e?.data?.state?.routes[0]?.state?.routes[1]?.state?.routes.slice(-1)[0]?.name === "LessonRoomChat") ?
                    setChat(true)
                :
                    setChat(false)
            }}}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerLeft: () => (state ? <TouchableOpacity onPress={() => 
                    // navigation.
                    // setAaa(true)
                    navigation.dispatch(popAction)
                } style={{ marginLeft: 20 }}><Foundation name="arrow-left" size={18} color="white" /></TouchableOpacity> : null),
                headerRight : () => (
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{ marginRight:25 }}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
            }}>
            <LessonProNav.Screen name="LessonRoomTab" component={ LessonRoomTab }  options={{
                title: title === "" ? "레슨 룸" : title,
            }} initialParams={{ data: user, title: setTitle }} />             
        </LessonProNav.Navigator>
    )
}
export const MyLessonStack = (props) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation()
    const navigationState = useNavigationState(state => state?.routes[0]?.state?.routes?.length)
    if (!isFocused) {
        if (navigationState > 1) {
            navigation.popToTop()
        }
    }

    const user = props.route.params.data;

    return(
        <LessonProNav.Navigator
            initialRouteName="LessonRoomList"
            screenOptions={{
                headerShown: false,
            }}>
            <LessonProNav.Screen name="LessonRoomList" component={ LessonRoomList }  options={{ title: "레슨 룸" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="LessonRoomDetail" component={ LessonRoomDetail }  options={{ title: "레슨 룸" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="LessonRoomChat" component={ LessonRoomChat }  options={{ title: "레슨 룸" }} initialParams={{ user, title: props.route.params.title }} />                 
            <LessonProNav.Screen name="LessonRoomRegist" component={ LessonRoomRegist }  options={{ title: "레슨 룸" }} initialParams={{ user }} />   
            <LessonProNav.Screen name="LessonOption" component={ LessonOption }  options={{ title: "레슨 룸" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="ProVideo" component={ ProVideo }  options={{ title: "레슨 룸" }} initialParams={{ user }} />
            <LessonProNav.Screen name="LessonRoomVideo" component={ LessonRoomVideo }  options={{ title: "레슨 룸" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="BuyPoints" component={BuyPoints} options={{ title: "포인트충전" }} />
            <LessonProNav.Screen name="Perchase" component={Perchase} options={{ title: "결제" }} />
        </LessonProNav.Navigator>
    )
}
export const MyLessonStackCopy = (props) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation()
    const navigationState = useNavigationState(state => state?.routes[1]?.state?.routes?.length)
    if (!isFocused) {
        if (navigationState > 1) {
            navigation.popToTop()
        }
    }

    const user = props.route.params.data;

    return(
        <LessonProNav.Navigator
            initialRouteName="LessonRoomList"
            screenOptions={{
                headerShown: false,
            }}>
            <LessonProNav.Screen name="LessonRoomList" component={ LessonRoomList }  options={{ title: "레슨 룸" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="LessonRoomDetail" component={ LessonRoomDetail }  options={{ title: "레슨 룸" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="LessonRoomChat" component={ LessonRoomChat }  options={{ title: "레슨 룸" }} initialParams={{ user, title: props.route.params.title }} />                 
            <LessonProNav.Screen name="LessonRoomRegist" component={ LessonRoomRegist }  options={{ title: "레슨 룸" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="LessonOption" component={ LessonOption }  options={{ title: "레슨 룸" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="ProVideo" component={ ProVideo }  options={{ title: "레슨 룸" }} initialParams={{ user }} />
            <LessonProNav.Screen name="LessonRoomVideo" component={ LessonRoomVideo }  options={{ title: "레슨 룸" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="BuyPoints" component={BuyPoints} options={{ title: "포인트충전" }} />
            <LessonProNav.Screen name="Perchase" component={Perchase} options={{ title: "결제" }} />
        </LessonProNav.Navigator>
    )
}

export const LessonProStack = (props) => {

    const user = props.route.params.data;
    
    return(
        <LessonProNav.Navigator
            initialRouteName={user.member_type === 'general' ? "LessonProList" : "ApplicationPro"}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#171C61',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
                headerRight : () => (
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{ marginRight:25 }}><Foundation name="list" size={18} color="white" /></TouchableOpacity>
                )
            }}>
            <LessonProNav.Screen name="LessonProList" component={ LessonProList }  options={{ title: "레슨 프로" }} initialParams={{ user }} />
            <LessonProNav.Screen name="ApplicationPro" component={ ProGolfer }  options={{ title: "레슨 프로" }} initialParams={{ user }} />
            <LessonProNav.Screen name="LessonProLessonList" component={ LessonProLessonList }  options={{ title: "레슨 프로" }} initialParams={{ user }} />
            <LessonProNav.Screen name="LessonProVideo" component={ LessonProVideo }  options={{ title: "레슨 프로" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="LessonProLessonDetail" component={ LessonProLessonDetail }  options={{ title: "레슨 프로" }} initialParams={{ user }} />
        </LessonProNav.Navigator>
    )
}

export const LessonProRoomStack = (props) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation()
    const navigationState = useNavigationState(state => state?.routes[0]?.state?.routes?.length)
    if (!isFocused) {
        if (navigationState > 1) {
            navigation.popToTop()
        }
    }

    const user = props.route.params.data;

    return(
        <LessonProNav.Navigator
            initialRouteName="LessonProRoomList"
            screenOptions={{
                headerShown: false,
            }}>
            <LessonProNav.Screen name="LessonProRoomList" component={ LessonProRoomList }  options={{ title: "레슨 프로룸" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="LessonProRoomDetail" component={ LessonProRoomDetail }  options={{ title: "레슨 프로룸" }} initialParams={{ user }} />                 
            <LessonProNav.Screen name="LessonProRoomChat" component={ LessonProRoomChat }  options={{ title: "레슨 프로룸" }} initialParams={{ user, title: props.route.params.title }} />
            <LessonProNav.Screen name="ProVideo" component={ ProVideo }  options={{ title: "레슨 프로룸" }} initialParams={{ user }} />
            <LessonProNav.Screen name="LessonProRoomVideo" component={ LessonProRoomVideo }  options={{ title: "레슨 프로룸" }} initialParams={{ user }} />
        </LessonProNav.Navigator>
    )
}

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
    TwoDepthTapCustom,
    ThreeDepthTapCustom,
    TwoDepthTapMyPageCustom,
    TwoDepthTapProSwingCustom,
    TwoDepthTapRankingCustom,
    TwoDepthTapLessonRoomCustom
} from './TabCustom';

import ProSortList from '../screens/pro_swing/ProSortList';
import RankingDailyList from '../screens/ranking/RankingDailyList';
import RankingMonthlyList from '../screens/ranking/RankinMonthlyList';
import RankingWeeklyList from '../screens/ranking/RankinWeeklyList';

import Profile from '../screens/my_page/Profile';
import Setting from '../screens/my_page/Setting';
import { Header } from '@react-navigation/stack';
import { WhiteText } from '../styled-components/login/Login';
import { AnalysisViewStack, LessonRoomStack, MyLessonStack, MyLessonStackCopy } from './Stack';
import MainTotalView from '../components/MainTotalView';
import MainPartView from '../components/MainPartView';
import AnalysisSwingRearProCard from "../screens/analysis_list/AnalysisSwingRearProCard";
import DrawingView from '../components/DrawingView';
import { View } from 'react-native';
import AIReport from '../screens/analysis_list/AIReport';
import AnalysisSwingConfirmCard from '../screens/analysis_list/AnalysisSwingConfirmCard';
import React, { useEffect, useState } from 'react';
import { set } from 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import { AnalysisDrawingRight } from '../styled-components/analysis_draw/AnalysisDrawing';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { article } from '../api/article';
import { procard } from '../api/procard';

const AnalysisDrawRearNav = createMaterialTopTabNavigator();

export const AnalysisDrawTab = ({route}) => {
    return (
    <AnalysisDrawNav.Navigator tabBar= {props => <TwoDepthTapCustom {...props} />}
        initialRouteName='AnalysisDrawRearTab'>
        <AnalysisDrawNav.Screen name="AnalysisDrawRearTab" children={ () => <AnalysisDrawRearTab data={route.params}/> } 
            options = {{ title: 'REAR' }} />
    </AnalysisDrawNav.Navigator>
    )
}

export const AnalysisDrawRearTab = ({route}) => {
    const viewData = route.params;
    return (
        <AnalysisDrawRearNav.Navigator tabBar= {props => <ThreeDepthTapCustom {...props} />}
            initialRoutName='Adress'>
            <AnalysisDrawRearNav.Screen name="Adress" children={ ()=> <DrawingView data={{...viewData, type : "address", idx: 1}}/> } 
                options={{ title: '어드레스' }} />
              <AnalysisDrawRearNav.Screen name="TakeBack" children={ ()=> <DrawingView data={{...viewData, type : "take_away", idx: 2}}/>}
                options={{ title: '테이크 어웨이'}} />
            <AnalysisDrawRearNav.Screen name="BackSwing" children={ ()=> <DrawingView data={{...viewData, type : "back_swing", idx: 3}}/>}
                options={{ title: '백스윙'}} />
            <AnalysisDrawRearNav.Screen name="Top" children={ ()=> <DrawingView data={{...viewData, type : "back_swing_top", idx: 4}}/>}
                options={{ title: '백스윙 탑' }} />
            <AnalysisDrawRearNav.Screen name="DownSwing" children={ ()=> <DrawingView data={{...viewData, type : "down_swing", idx: 5}}/>}
                options={{ title: '다운스윙' }} />
            <AnalysisDrawRearNav.Screen name="Impact" children={ ()=> <DrawingView data={{...viewData, type : "impact", idx: 6}}/>}
                options={{ title: '임팩트' }} />
            <AnalysisDrawRearNav.Screen name="Release" children={ ()=> <DrawingView data={{...viewData, type : "release", idx: 7}}/>}
                options={{ title: '릴리즈' }} />
            <AnalysisDrawRearNav.Screen name="Finish" children={ ()=> <DrawingView data={{...viewData, type : "finish", idx: 8}}/>}
                options={{ title: '피니쉬' }} />
        </AnalysisDrawRearNav.Navigator>
    )
}
const AnalysisSwingPartViewNav = createMaterialTopTabNavigator();
export const AnalysisSwingPartViewTab = (props) => {
    const [data, setData] = React.useState(null);
    const [swingKind, setSwingKind] = React.useState(null);
    const [similarProList, setSimilarProList] = React.useState(null);
    const [proCardBoxList, setProCardBoxList] = React.useState(null);

    useEffect(() => {
        if(props.userId) {
            (async () => {
                let userData = await SecureStore.getItemAsync('userData');
                userData = JSON.parse(userData);
                let userId = props.userId;
                if(userId) {
                    const resultData = await article.analysisView(userId)
                    .then(res => {
                        setData(res);
                    })
                    if(userData) {
                        await procard.selectProCardBoxList(userData.user_no)
                        .then((json) => {
                            const proCardBoxReduce = json.reduce((acc, current) => {
                                if(acc.findIndex(({ pro_name }) => pro_name === current.pro_name) === -1) {
                                    acc.push(current);
                                }
                                return acc;
                            },[]);
                            setSimilarProList(proCardBoxReduce);
                            setProCardBoxList(proCardBoxReduce);
                        });
                    }
                }
            })();
        } else {
            setData(props.data);
            setSwingKind(props.type);
            setSimilarProList(props.similarProList);
            setProCardBoxList(props.proCardBoxList);
        }

    }, []);
  
    if(data) {
        return (
            <AnalysisSwingPartViewNav.Navigator tabBar= {props => <ThreeDepthTapCustom {...props} />} initialRoutName='Adress'>
                <AnalysisSwingPartViewNav.Screen name="Adress" children={ () => <MainPartView data={{...data}} type={'address'} swingKind={swingKind} idx={1} proCardBoxList={proCardBoxList}/> } 
                    options={{ title: '어드레스' }} />
                  <AnalysisSwingPartViewNav.Screen name="TakeBack" children={ () => <MainPartView data={{...data}}  type={'take_away'} swingKind={swingKind} idx={2} proCardBoxList={proCardBoxList}/> }
                    options={{ title: '테이크 어웨이'}}/>
                <AnalysisSwingPartViewNav.Screen name="BackSwing" children={ () => <MainPartView data={{...data}} type={'back_swing'} swingKind={swingKind} idx={3}  proCardBoxList={proCardBoxList}/> }
                    options={{ title: '백스윙'}} />
                <AnalysisSwingPartViewNav.Screen name="Top" children={ () => <MainPartView data={{...data}} type={'back_swing_top'} swingKind={swingKind} idx={4}  proCardBoxList={proCardBoxList}/> }
                    options={{ title: '백스윙 탑'}} />
                <AnalysisSwingPartViewNav.Screen name="DownSwing" children={ () => <MainPartView data={{...data}} type={'down_swing'} swingKind={swingKind} idx={5}  proCardBoxList={proCardBoxList}/> }
                    options={{ title: '다운스윙'}} />
                <AnalysisSwingPartViewNav.Screen name="Impact" children={ () => <MainPartView data={{...data}} type={'impact'} swingKind={swingKind} idx={6}  proCardBoxList={proCardBoxList}/> }
                    options={{ title: '임팩트' }} />
                <AnalysisSwingPartViewNav.Screen name="Release" children={ () => <MainPartView data={{...data}} type={'release'} swingKind={swingKind} idx={7}  proCardBoxList={proCardBoxList}/> }
                    options={{ title: '릴리즈' }} />
                <AnalysisSwingPartViewNav.Screen name="Finish" children={ () => <MainPartView data={{...data}} type={'finish'} swingKind={swingKind} idx={8}   proCardBoxList={proCardBoxList}/> }
                    options={{ title: '피니쉬' }} />
            </AnalysisSwingPartViewNav.Navigator>
        )
    } else {
        return null;
    }
  
}

const AnalysisDrawNav = createMaterialTopTabNavigator();
const AnalysisSwingNav = createMaterialTopTabNavigator();

// 목록보기 -> 총평, 상세보기
export const AnalysisSwingTab = (props) => {
    const [data, setData] = useState(props.route.params.data);
    const [userId, setUserId] = useState(props.route.params.userId);
    const navigation = useNavigation();
    useEffect(async() => {
    }, []);

    if(userId) {
        return (
            <AnalysisSwingNav.Navigator 
                tabBar= {props => 
                <TwoDepthTapCustom {...props} />
            }
            >
                <AnalysisSwingNav.Screen name="AnalysisSwingConfirmCard" children={ ()=> <AnalysisSwingConfirmCard userId={userId} data={data} />} 
                    options = {{ title: 'AI진단', swipeEnabled : true }} />            
                <AnalysisSwingNav.Screen name="AnalysisSwingDetail" children={ () => <MainTotalView userId={userId} /> } 
                    options = {{ title: '총평', swipeEnabled : true }} />            
                <AnalysisSwingNav.Screen name="AnalysisSwingDetailSwipe" children={ ()=> <AnalysisSwingPartViewTab userId={userId} data={data} />} 
                    options = {{ title: '상세보기', swipeEnabled : true }} />
                <AnalysisSwingNav.Screen name="AIReport" children={ ()=> <AIReport data={data}/>} 
                />                                                
            </AnalysisSwingNav.Navigator>
        )
    }else {
        return null;
    }

}

/* 

0517 수정 - 랭킹 스크린 내부에서 분석화면을 넣기위해 Tab 제거 
const RankingNav = createMaterialTopTabNavigator();
export const RankingTab = (props) => {
    return(
        <RankingNav.Navigator 
            initialRoutName='Daily'>
            <RankingNav.Screen name="Daily" component={ RankingDailyList } />
            <RankingNav.Screen name="Weekly" component={ RankingWeeklyList } />
            <RankingNav.Screen name="Monthly" component={ RankingMonthlyList } />
        </RankingNav.Navigator>
    )    
}
*/
const MyPageNav = createMaterialTopTabNavigator();
export const MyPageTab = (props) => {
    return(
        <MyPageNav.Navigator tabBar= {props => <TwoDepthTapMyPageCustom {...props} />}
            initialRouteName='Profile'>
            <MyPageNav.Screen name="Profile" component={Profile} />
            <MyPageNav.Screen name="Setting" component={Setting} />
        </MyPageNav.Navigator>
    )
}

const LessonRoomNav = createMaterialTopTabNavigator();
export const LessonRoomTab = (props) => {
    const [Chat, setChat] = React.useState(false)
    const [data, setData] = useState(props.route.params.data);
    return(
        <LessonRoomNav.Navigator tabBar= {props => Chat ? null : <TwoDepthTapLessonRoomCustom {...props} />}
            screenOptions={{swipeEnabled: Chat ? false : true}}
            initialRouteName='MyLesson'
            screenListeners={{state: (e)=> {
                (e?.data?.state?.routes[0]?.state?.routes.slice(-1)[0]?.name === "LessonRoomChat") ||
                (e?.data?.state?.routes[1]?.state?.routes.slice(-1)[0]?.name === "LessonRoomChat") ?
                    setChat(true)
                :
                    setChat(false)
            }}}
        >
            <LessonRoomNav.Screen name="MyLesson" component={MyLessonStack} initialParams={{ data: data, title: props.route.params.title }} />
            <LessonRoomNav.Screen name="OpenLesson" component={MyLessonStackCopy} initialParams={{ data, title: props.route.params.title }} />
        </LessonRoomNav.Navigator>
    )
}




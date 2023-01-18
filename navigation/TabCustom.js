import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ScrollView } from 'react-native';
import {
    CommonBackground,
    CommonContainer,
    CommonTwoDepthTabView,
    CommonTwoDepthTabTextView,
    CommonTwoDepthTabText,
    CommonThreeDepthTabView,
    CommonThreeDepthBackground,
    TwoDepthTabOn,
    ThreeTabItem,
    ThreeTabText,
} from '../styled-components/Common';

import { 
    RankingHeader, 
    RankingGraph, 
    RankingTab, 
    RankingPreface, 
    RankingTriangle,
    PrefaceText,
    RankingHeaderTitle,
    RankingHeaderSub, 
    Pentagon,
    GraphText1,
    GraphText2,
    GraphText3,
    GraphText4,
    GraphText5,
    RankingTabList,
    RankingTabListOn,
    RankingTabMenu,
    RankingTabTextOn,
    RankingTabText,
    } from '../styled-components/ranking/RankingDailyList';
import { processColor } from 'react-native-reanimated';
import { WhiteText } from '../styled-components/login/Login';
import { documentDirectory } from 'expo-file-system';

export const TwoDepthTapCustom = (props) => {
    let index = props.navigationState.index;
    let routeName = props.navigationState.routeNames;
    let navigation = props.navigation;
    let goScreen = (screenName)  => {
        navigation.navigate(screenName);
    } 

    return (
        <CommonTwoDepthTabView>
            <CommonTwoDepthTabTextView
                onPress={() => goScreen(routeName[0])}><Text style={{ color: '#FFFFFF' }}>AI진단</Text>
                { (index === 0) ? <TwoDepthTabOn/> : null }
            </CommonTwoDepthTabTextView>
            <CommonTwoDepthTabTextView
                onPress={() => goScreen(routeName[1])}><Text style={{ color: '#FFFFFF' }}>총평</Text>
                { (index === 1) ? <TwoDepthTabOn/> : null }
            </CommonTwoDepthTabTextView>
            <CommonTwoDepthTabTextView 
                onPress={() => goScreen(routeName[2])}><Text style={{ color: '#FFFFFF' }}>상세보기</Text>
                { (index === 2) ? <TwoDepthTabOn/> : null }
            </CommonTwoDepthTabTextView>
            <CommonTwoDepthTabTextView 
                onPress={() => goScreen(routeName[3])}><Text style={{ color: '#FFFFFF' }}>AI Report</Text>
                { (index === 3) ? <TwoDepthTabOn/> : null }
            </CommonTwoDepthTabTextView>
        </CommonTwoDepthTabView>
    )
}

export const ThreeDepthTapCustom = (props) => {

    const list = useRef();
    let index = props.navigationState.index;
    let routeName = props.navigationState.routeNames;
    let navigation = props.navigation;
    let tabName = ['어드레스', '테이크 어웨이', '백스윙', '백스윙 탑', '다운스윙', '임팩트', '릴리즈', '피니쉬']
    let goScreen = (screenName) => {
        navigation.navigate(screenName);
    }
    
    setTimeout(()=> {
        list.current?.scrollToIndex({index, animated: true})
    }, 500);
    
    return (
        <CommonThreeDepthBackground>
            <CommonThreeDepthTabView>
                <FlatList
                    ref={list}
                    style={{marginHorizontal: 10}}
                    data={routeName}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item })=> {                        
                        return(    
                            <ThreeTabItem
                                key={item}
                                style={(index === routeName.indexOf(item))?{ color: '#fff', backgroundColor: '#171C61'}: {}} 
                                onPress={() => goScreen(item)}
                            >
                                <Text style={(index === routeName.indexOf(item))? { color: '#fff' } : { color: 'black'}}>{tabName[routeName.indexOf(item)]}</Text>
                            </ThreeTabItem>
                        );
                    }}
                />
            </CommonThreeDepthTabView>
        </CommonThreeDepthBackground>
    )
}


export const TwoDepthTapMyPageCustom = (props) => {
    let index = props.navigationState.index;
    let routeName = props.navigationState.routeNames;
    let navigation = props.navigation;
    let goScreen = (screenName)  => {
        navigation.navigate(screenName);
    } 

    return (
        <CommonTwoDepthTabView>
            <CommonTwoDepthTabTextView 
                onPress={() => goScreen(routeName[0])}><Text style={{ color: '#FFFFFF' }}>설정</Text>
                 {
                (index === 0)
                ?<TwoDepthTabOn/>
                :null
                }
            </CommonTwoDepthTabTextView>
            <CommonTwoDepthTabTextView 
                onPress={() => goScreen(routeName[1])}><Text style={{ color: '#FFFFFF' }}>관리</Text>
                 {
                (index === 1)
                ?<TwoDepthTabOn/>
                :null
                }
            </CommonTwoDepthTabTextView>
        </CommonTwoDepthTabView>
    )
}

export const TwoDepthTapProSwingCustom = (props) => {
    let index = props.navigationState.index;
    let routeName = props.navigationState.routeNames;
    let navigation = props.navigation;
    let goScreen = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <CommonTwoDepthTabView>
            <CommonTwoDepthTabTextView 
                onPress={() => goScreen(routeName[0])}><Text style={{ color: '#FFFFFF' }}>SORT</Text>
                 {
                (index === 0)
                ?<TwoDepthTabOn/>
                :null
                }
            </CommonTwoDepthTabTextView>
            <CommonTwoDepthTabTextView 
                onPress={() => goScreen(routeName[1])}><Text style={{ color: '#FFFFFF' }}>FILTER</Text>
                 {
                (index === 1)
                ?<TwoDepthTabOn/>
                :null
                }
            </CommonTwoDepthTabTextView>
        </CommonTwoDepthTabView>
    )
}

export const TwoDepthTapLessonRoomCustom = (props) => {
    let index = props.navigationState.index;
    let routeName = props.navigationState.routeNames;
    let navigation = props.navigation;
    let goScreen = (screenName)  => {
        console.log(screenName,"screenName")
        navigation.navigate(screenName);
    } 

    return (
        <CommonTwoDepthTabView>
            <CommonTwoDepthTabTextView 
                onPress={() => goScreen(routeName[0])}><Text style={{ color: '#FFFFFF' }}>나의 레슨</Text>
                 {
                (index === 0)
                ?<TwoDepthTabOn/>
                :null
                }
            </CommonTwoDepthTabTextView>
            <CommonTwoDepthTabTextView 
                onPress={() => goScreen(routeName[1])}><Text style={{ color: '#FFFFFF' }}>전체 레슨</Text>
                 {
                (index === 1)
                ?<TwoDepthTabOn/>
                :null
                }
            </CommonTwoDepthTabTextView>
        </CommonTwoDepthTabView>
    )
}



const styles = StyleSheet.create({
    chart: {
        flex: 1,
        backgroundColor: "#171C61",
    }
  });
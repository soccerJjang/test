import React from 'react';
import * as RN from 'react-native';
import * as RQ from 'react-query';
import * as CM from '../../styled-components/Common';
import * as ST from '../../styled-components/analysis_draw/AnalysisDrawing';
import * as SecureStore from 'expo-secure-store';
import * as NV from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { article } from '../../api/article';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { AnalysisBoxView, AnalysisBoxView02, Border, BottomText, BottomText02, BoxBottomView, BoxBottomView02, BoxTopView, IcoStar, Score, ScoreBox, ScoreDate, ScoreIcon } from '../../styled-components/analysis_list/AnalysisList';


const SwingCompareList = (props) => {

    const [userData, setUserData] = React.useState(null); 
    const navigation = NV.useNavigation();
    const isFocused = useIsFocused();
    const route = useRoute();

    React.useEffect( () => {
        (async () => {
            const getUserData = await SecureStore.getItemAsync('userData').then();
            setUserData(JSON.parse(getUserData));
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        })();

        
    }, [])

    React.useEffect(async ()=> {
        if(isFocused) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            await ScreenOrientation.unlockAsync();
        }

    }, [isFocused])
    
    const { isLoading, error, data } = RQ.useQuery(['proSwingCompareList', userData], article.analysisList, { 
        enabled : !!userData,
        onSuccess : (data) => {
            
        }
    });

    const swingCompareView = (id, imagePath, data, fullDataLength) => {

        navigation.navigate("SwingPositionComparisonImg", {id, imagePath, data, fullDataLength});        
    }

    if(data) {

    
    return (
        <CM.CommonBackground>
            <ST.DrawingContainer>
                <CM.TitLarge style={{ marginBottom: 24, marginLeft: 20 }}>{route.params.mode == 'default' ? '표준스윙 영상 비교' : '프로스윙 영상 비교'}</CM.TitLarge>
                {userData != null && Array.isArray(data) && data.length > 0? <RN.FlatList windowSize={1} data={data} keyExtractor={ (item, idx) => { return "SwingCompare" + item.id + idx } } renderItem={ ( {item} ) =>                     
                
                    <AnalysisBoxView02
                        style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}
                        onPress={ () => swingCompareView(item.id, item.img_path, item, data.length) }
                    >
                    <BoxTopView onPress={ () => swingCompareView(item.id, item.img_path, item, data.length) }>
                        <RN.View
                            
                        >
                            <ScoreBox>
                                <Score>{JSON.parse(item.total_score_comment)[1]}점</Score>
                                <RN.View style={{ width: 8 }}></RN.View>
                                <ScoreDate>{dateFormat(new Date(item.date))}</ScoreDate>
                            </ScoreBox>
                            <ScoreIcon>
                                {
                                    [1,2,3,4,5].map( (star, idx) => {
                                        if(idx <= JSON.parse(item.total_score_comment)[0]-1){
                                            return <IcoStar key={ star + item.date + "_" +idx }  source={require('../../images/ico-stars-yellow.png')}/>            
                                        }else{                                    
                                            return  <IcoStar key={star + item.date + "_" +idx} source={require('../../images/ico-stars-gray.png')}/>            
                                        }
                                    })
                                }    
                                
                            </ScoreIcon>
                        </RN.View>                        
                    </BoxTopView>
                    <Border />
                    <BoxBottomView02>
                        <BottomText02 style={{color:"#060606", fontSize:12 }}>
                            {
                                [1].map((none ,noneidx) => {
                                    if(item.type.indexOf('F') >= 0) {
                                        return "Front"
                                    }else if(item.type.indexOf('R') >= 0) {
                                        return "Rear"
                                    }             
                                })
                            }
                        </BottomText02>
                        <RN.Text style={{ color: "#EEEEEE", marginLeft: 10, marginRight:10}}>|</RN.Text>                        
                        <BottomText02 style={{color:"#060606", fontSize:12}}>
                            {
                                [1].map((none ,noneidx) => {
                                    if(item.type.indexOf('D') >= 0) {
                                        return "Driver"
                                    }else if(item.type.indexOf('I') >= 0) {
                                        return "Iron"
                                    }                                     
                                })
                            }    
                        </BottomText02>                                                                               
                    </BoxBottomView02>
                </AnalysisBoxView02>


            }/>  
            : 
                <CM.GettingReady>
                    <RN.Image style={{ width: 89, height: 89 }} source={ require("../../images/img-gettingReady.png")}/>
                    <RN.Text style={{ marginTop: 26 , color: '#777', fontSize: 20, fontWeight: '700' }}>분석된 데이터가 없습니다.</RN.Text>
                </CM.GettingReady>  
            }        
            </ST.DrawingContainer>
        </CM.CommonBackground>
    )
    } else {
        return null;
    }
}

const dateFormat = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}
export default SwingCompareList;


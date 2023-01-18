import React from 'react';
import * as RN from 'react-native';
import * as CM from '../../styled-components/Common';
import * as ST from '../../styled-components/analysis_list/AnalysisSwingRear';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import Config from 'react-native-config';
import { RankingBasicBox } from '../../styled-components/ranking/RankingDailyList';

const AnalysisSwingFront = (props) => {

    const BASE_URL = 'http://localhost:5006';

    const [detail, setDetail] = React.useState(false);
    const [shadow, setShadow] = React.useState({});
    const [detailCard, setDetailCard] = React.useState(false);
    const [proCard,  setProCard] = React.useState(false);
    const [photo, setPhoto] = React.useState([]);
    const [photoDetailInfo, setPhotoDetailInfo] = React.useState([]);

    React.useEffect(() => {
        RN.Platform.OS === 'ios' 
        ? setShadow({
            shadowColor: "#000", 
            shadowOpacity: 0.1, 
            shadowOffset: { width: 0, height: 5 }, 
            shadowRadius: 10 
        })
        : setShadow({
            elevation: 15,
        })

        setPhotoDetailInfo([
            {
                all: {
                    HEAD: [ { REar:[565, 402] } ],
                    SHOULDER : [ { LShoulder:[565, 503] }],
                    ARM : [ { RElbow: [352, 402] } ],
                    PELVIS: [ { LHip: [405, 695] }, 
                               { LEG: [{ Rshin: [355, 1005]}] }],
                
                }
            }
        ])
    },[]);

    React.useEffect(() => {
        let server = '';
        let all, add, tAwa, bSwi, bSwT, dSwi, imp, rels, fin = null;

        (async () => {
            // 이미지를 경로에서 한번에 가져오는 방법을 모르겠당 ..
            server = `${BASE_URL}/file/file/imageDownloadTest?imgType=all`;
            await FileSystem.downloadAsync(server, FileSystem.cacheDirectory + 'all.jpg')
                .then(data => {
                    all = data.uri;
                    console.log('Finishied all downloading to ', data.uri);
                })
                .catch(error => {
                    console.error(error);
                })
                all = await FileSystem.getInfoAsync(all);

                server = `${BASE_URL}/file/file/imageDownloadTest?imgType=address`;
                console.log(server);
                await FileSystem.downloadAsync(server, FileSystem.cacheDirectory + 'address.jpg')
                    .then(data => {
                        add = data.uri;
                        console.log('Finishied address downloading to ', data.uri);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    add = await FileSystem.getInfoAsync(add);

                server = `${BASE_URL}/file/file/imageDownloadTest?imgType=take_away`;
                await FileSystem.downloadAsync(server, FileSystem.cacheDirectory + 'take_away.jpg')
                    .then(data => {
                        tAwa = data.uri;
                        console.log('Finishied take_away downloading to ', data.uri);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    tAwa = await FileSystem.getInfoAsync(tAwa);
    
                server = `${BASE_URL}/file/file/imageDownloadTest?imgType=back_swing`;
                await FileSystem.downloadAsync(server, FileSystem.cacheDirectory + 'back_swing.jpg')
                    .then(data => {
                        bSwi = data.uri;
                        console.log('Finishied back_swing downloading to ', data.uri);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    bSwi = await FileSystem.getInfoAsync(bSwi);
    
                server = `${BASE_URL}/file/file/imageDownloadTest?imgType=back_swing_top`;
                await FileSystem.downloadAsync(server, FileSystem.cacheDirectory + 'back_swing_top.jpg')
                    .then(data => {
                        bSwT = data.uri;
                        console.log('Finishied back_swing_top downloading to ', data.uri);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    bSwT = await FileSystem.getInfoAsync(bSwT);

                server = `${BASE_URL}/file/file/imageDownloadTest?imgType=down_swing`;
                await FileSystem.downloadAsync(server, FileSystem.cacheDirectory + 'down_swing.jpg')
                    .then(data => {
                        dSwi = data.uri;
                        console.log('Finishied down_swing downloading to ', data.uri);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    dSwi = await FileSystem.getInfoAsync(dSwi);
    
                server = `${BASE_URL}/file/file/imageDownloadTest?imgType=impact`;
                await FileSystem.downloadAsync(server, FileSystem.cacheDirectory + 'impact.jpg')
                    .then(data => {
                        imp = data.uri;
                        console.log('Finishied impact downloading to ', data.uri);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    imp = await FileSystem.getInfoAsync(imp);
    
                server = `${BASE_URL}/file/file/imageDownloadTest?imgType=release`;
                await FileSystem.downloadAsync(server, FileSystem.cacheDirectory + 'release.jpg')
                    .then(data => {
                        rels = data.uri;
                        console.log('Finishied release downloading to ', data.uri);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    rels = await FileSystem.getInfoAsync(rels);
    
                server = `${BASE_URL}/file/file/imageDownloadTest?imgType=finish`;
                await FileSystem.downloadAsync(server, FileSystem.cacheDirectory + 'finish.jpg')
                    .then(data => {
                        fin = data.uri;
                        console.log('Finishied finish downloading to ', data.uri);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    fin = await FileSystem.getInfoAsync(fin);
            
                    setPhoto([all, add, tAwa, bSwi, bSwT, dSwi, imp, rels, fin]);
            })();
    },[]);
    return ( 
        <CM.CommonBackground>
                <ST.AnalysisSwingRearContainer>
                        <ST.RankTit>RANK 01</ST.RankTit>
                        <ST.TextView>
                            <ST.TextLeft>
                                GREAT!{"\n"}
                                아주 훌륭해요! 
                            </ST.TextLeft>
                            <RN.View>
                                <ST.ScoreText>80점</ST.ScoreText>
                                <ST.RankText>상위0.01%</ST.RankText>
                            </RN.View>
                        </ST.TextView>
                        {
                        (!detail)
                        ?<ST.BoxShadow style={{ marginLeft: 20, marginRight: 20, marginBottom: 20, borderRadius: 16, background: '#fff', elevation: 10, shadowColor: "#000", shadowOpacity: 0.5, shadowOffset: { width: 0, height: 5 }, shadowRadius: 16 }}>
                            <ST.ImageView>
                                <ST.RearImage source={photo.length == 0 ? require('../../images/golf.png') : {uri : photo[0].uri}} />
                                <ST.RearDetailButton onPress={() => setDetail(!detail)}>
                                    <RN.Text style={{color: '#fff', fontSize: 14}}>상세평가보기</RN.Text>
                                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#fff" />
                                </ST.RearDetailButton>
                                    {
                                    (detailCard)
                                    ?<ST.RearDetailBox style={shadow}>
                                        <ST.RearDetailTit>수준급이에요!</ST.RearDetailTit>
                                        <ST.RearDetailText>머리의 위치가 어드레스 및 백스윙탑, 임팩트 등 스윙 전반에 걸쳐 매우 안정적으로 좋습니다.
                                        머리 움직임은 밀접한 관계가 있으니 척추각을 잘 유지할 수 있도록 노력해 주세요.</ST.RearDetailText>
                                        <ST.DetailCloseBtn><AntDesign name="close" size={24} color="#fff" />닫기</ST.DetailCloseBtn>
                                    </ST.RearDetailBox>
                                    : null
                                    }
                            </ST.ImageView>
                        </ST.BoxShadow>
                        :
                        <Swiper
                        showsPagination={false}
                        loop={false}
                        height={700}
                        >
                            {
                                photo.map((item, i) => { 
                                return<ST.BoxShadow style={{ marginLeft: 20, marginRight: 20, marginBottom: 20, borderRadius: 16, background: '#fff', elevation: 10, shadowColor: "#000", shadowOpacity: 0.5, shadowOffset: { width: 0, height: 5 }, shadowRadius: 16 }}>
                                    <ST.ImageView>
                                        <ST.RearImage source={{uri : item.uri}} />
                                        <ST.RearDetailButton>
                                            <RN.Text style={{color: '#fff', fontSize: 14}}>상세평가보기</RN.Text>
                                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#fff" />
                                        </ST.RearDetailButton>
                                    </ST.ImageView>
                                    {
                                        // 좌표도 이미지별로 찍어줘야 하는데 어떻게 세팅 하 지.. ?
                                    (i == 0)
                                    ?<RN.View style={{
                                        padding: 20,
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,
                                        backgroundColor: "rgba(92, 238, 167, 0.5)",
                                        stroke: "#5CEEA7",
                                        position: "absolute",
                                        left: 100,
                                        top: 130,
                                    }} />
                                    : (i == 1)
                                    ?<RN.View style={{
                                        padding: 20,
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,
                                        backgroundColor: "rgba(92, 238, 167, 0.5)",
                                        stroke: "#5CEEA7",
                                        position: "absolute",
                                        left: 100,
                                        top: 150,
                                    }} />
                                    :<RN.View style={{
                                        padding: 20,
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,
                                        backgroundColor: "rgba(92, 238, 167, 0.5)",
                                        stroke: "#5CEEA7",
                                        position: "absolute",
                                        left: 100,
                                        top: 160,
                                    }} />
                                }
                                </ST.BoxShadow>
                                })
                            }
                        </Swiper>
                        }
                    </ST.AnalysisSwingRearContainer>
                        <ST.ProCardBox onPress={() => setProCard(!proCard)} style={shadow}>
                            <ST.ProCardTit><RN.Text style={{color: '#222', fontSize: 16, fontWeight: '700' }}>프로카드 박스</RN.Text><RN.View style={{ width: 7 }}></RN.View><ST.ProCardBadge><RN.Text style={{color: '#fff', fontSize: 12 }}>8명</RN.Text></ST.ProCardBadge></ST.ProCardTit>
                            {
                                (proCard)?
                            <ST.ProCardCon>
                                <ST.ShotListBox>
                                    <ST.ShotList>
                                        <ST.ShotListImg source={require('../../images/img-shot01.png')}/>
                                        <ST.ShotListChk><Feather name="check" size={24} color="#fff"/></ST.ShotListChk>
                                    </ST.ShotList>
                                    <ST.ShotListName>한국인</ST.ShotListName>
                                </ST.ShotListBox>
                                <ST.ShotListBox>
                                    <ST.ShotList>
                                        <ST.ShotListImg source={require('../../images/img-shot01.png')}/>
                                    </ST.ShotList>
                                    <ST.ShotListName>타이거{"\n"}우즈</ST.ShotListName>
                                </ST.ShotListBox>
                                <ST.ShotListBox>
                                    <ST.ShotList>
                                        <ST.ShotListImg source={require('../../images/img-shot01.png')}/>
                                    </ST.ShotList>
                                    <ST.ShotListName>타이거{"\n"}우즈</ST.ShotListName>
                                </ST.ShotListBox>
                                <ST.ShotListBox>
                                    <ST.ShotList>
                                        <ST.ShotListImg source={require('../../images/img-shot01.png')}/>
                                    </ST.ShotList>
                                    <ST.ShotListName>한국인</ST.ShotListName>
                                </ST.ShotListBox>
                                <ST.ShotListBox>
                                    <ST.ShotList>
                                        <ST.ShotListImg source={require('../../images/img-shot01.png')}/>
                                    </ST.ShotList>
                                    <ST.ShotListName>한국인</ST.ShotListName>
                                </ST.ShotListBox>
                            </ST.ProCardCon>
                            :
                            <RN.View/>
                            }
                            <ST.OpenBtn source={require('../../images/ico-OpenBtn.png')}/>
                        </ST.ProCardBox>
            </CM.CommonBackground>
    ) 
const Circle = styled.View`
margin: 0 auto;
padding: 20px;
width: 50px;
height: 50px;
border-radius: 50px;
background-color: "#5CEEA7";
`
}

export default AnalysisSwingFront;


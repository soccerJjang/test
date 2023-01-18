import React , {useMemo , useRef,useCallback} from 'react';
import * as RN from 'react-native';
import styled from "styled-components";
import { article } from '../../api/article';
import { ScrollView, TouchableOpacity ,View} from 'react-native-gesture-handler';
import { CommonBackground, CommonContainer,Tit,PageButtonOn,PrivacyWrap,Wrap } from '../../styled-components/Common';
import { ProfileImg,ProfileBox,ProfileFirst,ProfileTitle,ProfileBtn,ProfileTwo, ProfileBirth, ProfileBody,ProfileNum,ProfileText,StoryCont,StoryText,Awards,AwardsCont,AwardsList,AwardsList2,Wins,Tour,VideoCont,VideoBox,VideoBox1,VideoBox2,VideoList,VideoImg,VideoSub,VideoTit,VideoSubImg,VideoSubNum,VideoSubDay,ProfileImgBox,ProfileRightBox,ProFileHeartBtn,PageButtonOn1,ButtonText,PrivacyCon,CloseBtn, ProfilePhoto,ProPopupView, ProPopupText, ProPopupImg, ProPopupBtn, ProPopupBtnText,ProViewWrap,ProPopupStar
} from '../../styled-components/pro_swing/ProView';
import * as SecureStore from 'expo-secure-store';
import * as VideoThumbnails from 'expo-video-thumbnails';



const ProView = (props) => {
    const BASE_URL = 'http://211.55.64.43:5006'
    const data = props.route.params.data;    
    const user = props.route.params.userData;
    const navigation = props.navigation;

    const video = React.useRef(null);
    
    const [proStatusCnt, setProStatusCnt] = React.useState(data.cnt);
    const [proCardStatus, setProCardStatus] = React.useState(false);

    React.useEffect(() => {   
        const userData = new Promise((resolve, reject) => {
            SecureStore.getItemAsync("userData");
            resolve(SecureStore.getItemAsync("userData"));
        })
        .then((res) => {
            return JSON.parse(res)}
        )
        .then((res) => {
            return article.selectProCardStatus(res.user_no, data.name);
        })
        .then((res) => {
            if(res.message) {
                setProCardStatus(false);
            } else {
                setProCardStatus(true);
            }  
        });
        
    },[])

    const insertProCardStatus = (info) => {
        let proNm = data.name;
        let userNo = user.user_no;
        let result = '';

        if(info === 'insert') {  
            (async () => {
                await article.insertProCardStatus(proNm, userNo)
                .then(res => result = res);

                if(result.message === 'success') {
                    setProCardStatus(true);
                    setProStatusCnt(proStatusCnt + 1);
                }
            })();
        }

        if(info === 'delete') {
            (async () => {
                await article.deleteProCardStatus(proNm, userNo)
                .then(res => result = res);

                if(result.message === 'success') {
                    setProCardStatus(false);
                    setProStatusCnt(proStatusCnt - 1);
                }
            })();
        }

    }

    const goToVideoList = (proData) => {
        if(data.videoCnt == 0) {
            RN.Alert.alert("등록된 동영상이 없습니다.");
            return false;
        }
        props.navigation.navigate("ProVideoView", {data: data});
    }

    return (
        
        <Wrap>
         <ScrollView>        
        <ProfileImgBox >
        <ProfileImg source={{uri: `http://223.130.132.180:5009/upload/${data.photo}`}}></ProfileImg> 
        </ProfileImgBox>
        <ProViewWrap>  
            {/* border Shadow */}
                <ProfileBox>
                    <ProfileFirst>
                        <ProfileTitle>{data.name}</ProfileTitle>
                        <ProfileRightBox>
                        <ProFileHeartBtn style={{ width: 18, height: 18 }} source={require('../../images/ico-heartOn.png')}></ProFileHeartBtn>
                        <ProfileBtn>{proStatusCnt}개</ProfileBtn>
                        </ProfileRightBox>
                    </ProfileFirst>

                    <ProfileTwo>
                        <ProfileBirth> 
                            <ProfileNum>{data.birth}</ProfileNum>
                            <ProfileText>born</ProfileText>
                        </ProfileBirth>
                        <ProfileBody>
                            <ProfileNum>{data.height}cm {(data.weight)? data.weight+'kg':''}</ProfileNum>
                            <ProfileText>Body</ProfileText>    
                        </ProfileBody> 
                    </ProfileTwo>
                </ProfileBox>
                    {/* border Shadow end*/}
                <StoryCont>
                    <Tit>스토리</Tit>
                    <StoryText>{data.ment}</StoryText>
             </StoryCont>
                <Awards>
                    <Tit>수상</Tit>
                    <AwardsCont>
                        <AwardsList>
                            <Tour>{data.competition1}</Tour>
                            <Wins>{data.count1}</Wins>
                        </AwardsList>
                        <AwardsList2>
                            <Tour>{data.competition2}</Tour>
                            <Wins>{data.count2}</Wins>
                        </AwardsList2>
                        <AwardsList>
                            <Tour>{data.competition3}</Tour>
                            <Wins>{data.count3}</Wins>
                        </AwardsList>
                    </AwardsCont>
                </Awards>

                <RN.TouchableOpacity style={{marginTop: 30}} onPress={() => goToVideoList(data)}>
                    <SwingRearCommentBox  style={{ marginTop: 30,  elevation: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 ,}}>
                        <Comment1>{data.name}의 {"\n"}영상보러 가기</Comment1>
                        <Comment2></Comment2>
                        <InfoBtn onPress={() => goToVideoList(data)}><RN.Text style={{ color: "#fff", fontSize: 12, textAlign: 'center', paddingTop:14,paddingBottom:14}}>영상보기</RN.Text></InfoBtn>
                    </SwingRearCommentBox>
                </RN.TouchableOpacity>


                    <VideoCont>                
                        {
                            (proCardStatus) 
                            ? <PageButtonOn1 style={{ backgroundColor : "grey"}} onPress={() => insertProCardStatus("delete")}><ButtonText style={{ color : "white"}}> 취소</ButtonText></PageButtonOn1> 
                            : <PageButtonOn1 onPress={() => insertProCardStatus("insert")}><ButtonText>좋아요</ButtonText></PageButtonOn1>
                        }
                    </VideoCont>
          </ProViewWrap> 
          </ScrollView>
          </Wrap>
    
 
          
    

    ) 
}
const Comment1 = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: #1A1D1E;
`
const Comment2 = styled.Text`
    font-size: 16px;
    color: #000;
    font-weight: 300;
`
const InfoBtn = styled.TouchableOpacity`
    width: 81px;
    background: #000;
    border-radius: 6px;
    background-color: #171C61;
`
const SwingRearCommentBox = styled.View`    
    padding: 29px 20px 28px 20px;
    border-radius: 20px;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export default ProView;
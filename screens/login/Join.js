import React, { useCallback, useRef, useMemo, useState, useEffect }  from "react";
import { Alert, Text, Image,ScrollView,TouchableOpacity, View, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { CommonBackground, CommonContainer,Wrap, CloseBtn } from '../../styled-components/Common';
import {
    JoinContainer,
    BorderBox,
    BorderBoxOn,
    AgreeAll,
    AgreeAllOn,
    AgreeList,
    LookBtn,
    BlackText,
    WhiteText,
    PrivacyCon,
    PrivacyTit,
    PrivacyText,
    LoginText,
    JoinButton,
    JoinOrText,
    TextInput,
    IconChkAll,
    IconChkGray,
    IconChkNavy,
    TextInputWrap,
    IcoEye,
    IcoEyeN,
    DuplicateBox,
    DuplicateValue,
    DuplicateCheckBtn,
    JoinOrText02
} from '../../styled-components/login/Login';
import CustomBackdrop from "./JoinCustomBackDrop";
import { signApi } from "../../api/sign";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import SelectDropdown from "react-native-select-dropdown";
import { sub } from "react-native-reanimated";

const Join = ({navigation}) => {
    // 회원정보 
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [rePwd, setRePwd] = useState('');
    const [nickname, setNickname] = useState('');
    const [subscriptionPath, setSubscriptionPath] = useState('');
    // const [phone, setPhone] = useState('');
    const [sns, setSns] = useState({type : null, token : null});
    const [showFirstPwd, setShowFirstPwd] = useState(false);
    const [showSecondPwd, setShowSecondPwd] = useState(false);
    const [memberType, setMemberType] = useState("general");

    // 멤버타입 리스트 
    const memberTypeList = ["일반" , "프로골퍼"];

    // 이메일 정규표현식 
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    // 전화번호 정규표현식 
    const phoneRegExp = /^[0-9]*$/;

    // 닉네임 정규표현식 (특수문자 x)
    const nicknameRegExp = /[^\w\sㄱ-힣]|[\_]/g;


    // 소셜 회원가입  

        // 카카오
        const kakaoLogin = async () => {
            try {
                const test = await KakaoSDK.init("f25af9ec5cbfd319f827e4b8e377c06c")
                const tokens = await KakaoSDK.login();
                console.log("토큰 시작")
                console.log(tokens);

                if(tokens.access_token) {
                    return setSns({
                        type : "kakao",
                        token : tokens.access_token
                    });
                }

            } catch (e) {
                console.log("카카오에러 ");
                console.log(e);
            }
        }
        useEffect(() => {
        
        }, [sns])

    // 약관동의 
    const [progress, setProgress]= useState([false,false,false,false]);

    const changeProgress = useEffect(()=> {
                
    }, [progress])

    const agreement01 = useRef();
    const agreement02 = useRef();
    const agreement03 = useRef();

    // BottomSheet range variables
    //const snapPoints = useMemo(() => [ "1", "35%", "75%", "90%"], []);
    const snapPoints = useMemo(() => [ "1", "90%", "90%", "90%"], []);

    // BottomSheet range change method
    const handleSheetChange = useCallback((index) => {          
        console.log();
    }, []);

    // agreement click event
    const handleSnapPress = useCallback((index, agreement) => {
    agreement.current?.snapToIndex(index);
    }, []);

    const changeAllAgree = () => {
        if(progress[0]){
            setProgress([false,false,false,false]);
            
        }else if(!progress[0]) {
            setProgress([true,true,true,true]);
        }
    }

    const changeAgree = (index) => {
        let agree = [...progress];
        if(agree[index]){
            agree[index] = false;
        }else if(!agree[index]) {
            agree[index] = true;
        }

        console.log(agree[1], agree[2]);
        if(agree[1] && agree[2] && agree[3] ) {
            agree[0] == true;
        } 

        setProgress([...agree]);        
    }

    const goSubmit = async () => {

        if(!id){
            Alert.alert("이메일을 입력해주세요");
            return false;
        }else if(!id.match(emailRegExp)) {
            Alert.alert("이메일을 형식을 맞춰주세요");
            return false;
        }else if(!pwd) {
            Alert.alert("비밀번호를 입력해주세요");
            return false;
        }else if(!rePwd) {
            Alert.alert("비밀번호 확인을 입력해주세요");
            return false;
        }else if(!nickname) {
            Alert.alert("닉네임을 입력해주세요");
            return false;
        }else if(nickname.match(nicknameRegExp)) {
            Alert.alert("닉네임에 문자만 입력해주세요");
            return false;
        }else if(!subscriptionPath) {
            Alert.alert("가입경로를 선택해주세요.");
            return false;
        }
        
        /*
        else if(!phone) {
            Alert.alert("연락처를 입력해주세요");
            return false;
        }
        */

        /*
        else if(!phone.match(phoneRegExp)){
            Alert.alert("연락처는 숫자만 입력해주세요.");
            return false;
        }*/

        if(pwd != rePwd) {
            Alert.alert("비밀번호를 다르게 입력했습니다.");
            return false;
        }

        let progressStatus = true
        progress.find((data, index) => {            
            if(index > 0 && index < 3 &&!data) {                     
                progressStatus = false;
                return false;
            }
        })

        if(!progressStatus) {
            Alert.alert("약관동의가 완료되지 않았습니다.");
            return false;   
        }
        

        // 아이디 중복체크 
        const checkId = await signApi.checkId(id);
        
        if(!checkId) {            
            Alert.alert("아이디가 중복되었습니다.");
            return false;
        }else {
            console.log("중복된 아이디가 없다.");
        }

        // 닉네임 중복 체크 
        const checkNickname = await signApi.checkNickname(nickname);

        if(checkNickname) {

            console.log("중복된 닉네임이 없다.");
            const user = {id, pwd, nickname, memberType, subscriptionPath, progress};
            const insertId = await signApi.insertId(user);
            
            if(insertId){
                navigation.navigate('JoinSuccess', { memberType } );

            }else {                
                Alert.alert("회원가입에 실패했습니다.");    
                return false;
            }
        }else {
            Alert.alert("닉네임이 중복되었습니다.");
            return false;
        }
        
    }

    const checkEmailDuplicate =  async (email) => {

        if(email && email.match(emailRegExp)) {
            const result = await signApi.checkId(email);
            if(result) {
                Alert.alert("사용 가능한 이메일입니다. ");
            }else {
                Alert.alert("사용 불가능한 이메일입니다. ");
            }            
        }else if(email && !email.match(emailRegExp)) {            
            Alert.alert("이메일을 형식을 맞춰주세요.");
        }else {
            Alert.alert("이메일을 입력해주세요 ");
        }
    }

    const checkNicknameDuplicate =  async (nickname) => {

        if(nickname && !nickname.match(nicknameRegExp)) {
            const result = await signApi.checkNickname(nickname);
            if(result) {
                Alert.alert("사용 가능한 닉네임입니다. ");
            }else {
                Alert.alert("사용 불가능한 닉네임입니다. ");
            }
            
        }else if(nickname && nickname.match(nicknameRegExp)) {
            Alert.alert("닉네임에 문자만 입력해주세요");
            return false;
        }else {
            Alert.alert("닉네임을 입력해주세요 ");
            return false;
        }
    }

    return (
        <Wrap>
            <CommonBackground>
                <JoinContainer>
            <CommonContainer>
                    <ScrollView>
                        {/* 로그인 Start */}
                        <LoginText>이메일</LoginText>
                        <DuplicateBox>
                            <DuplicateValue placeholder="이메일을 입력하세요"  placeholderTextColor="#ccc" onChangeText={ (text) => setId(text.replace(/ /g, ''))}></DuplicateValue>
                            <DuplicateCheckBtn onPress={() => checkEmailDuplicate(id).catch((e)=> {alert(e)})}>중복확인</DuplicateCheckBtn>
                        </DuplicateBox>

                        <LoginText>비밀번호</LoginText>
                        <TextInputWrap>
                        <TextInput placeholder="비밀번호" 
                            placeholderTextColor="#ccc" 
                            onChangeText={(text)=>setPwd(text)} 
                            secureTextEntry={showFirstPwd ? false : true}
                            maxLength={15}
                        ></TextInput>
                        <TouchableOpacity onPress={()=>{showFirstPwd ? setShowFirstPwd(false) : setShowFirstPwd(true)}}>
                            {
                                showFirstPwd ? <IcoEye><Image style={{ width: "100%", height: "100%" }} source={require('../../images/ic_eye01.png')}/></IcoEye> : <IcoEyeN><Image style={{ width: "100%", height: "100%" }} source={require('../../images/ic_eye02.png')}/></IcoEyeN>
                            }
                        </TouchableOpacity>
                        </TextInputWrap>

                        <LoginText>비밀번호 확인</LoginText>
                        <TextInputWrap>
                            <TextInput placeholder="비밀번호 확인" 
                                placeholderTextColor="#ccc" 
                                onChangeText={(text)=>setRePwd(text)} 
                                secureTextEntry={showSecondPwd ? false : true} 
                                maxLength={15}
                            ></TextInput>
                            <TouchableOpacity onPress={()=>{showSecondPwd ? setShowSecondPwd(false) : setShowSecondPwd(true)}}>
                                {
                                    showSecondPwd ? <IcoEye source={require('../../images/ic_eye01.png')}><Image  style={{ width: "100%", height: "100%" }} source={require('../../images/ic_eye01.png')}/></IcoEye> : <IcoEyeN><Image style={{ width: "100%", height: "100%" }} source={require('../../images/ic_eye02.png')}/></IcoEyeN>
                                }                               
                            </TouchableOpacity>
                        </TextInputWrap>

                        <LoginText>닉네임</LoginText>                
                        <DuplicateBox>
                            <DuplicateValue placeholder="닉네임을 입력하세요" placeholderTextColor="#ccc" onChangeText={ (text) => setNickname(text)} maxLength={15}></DuplicateValue>
                            <DuplicateCheckBtn onPress={() => checkNicknameDuplicate(nickname)}>중복확인</DuplicateCheckBtn>
                        </DuplicateBox>
                        
                        <LoginText>가입경로</LoginText>
                        <SelectDropdown 
                            data={["때제배 홈페이지 광고", "파가니카 홈페이지 광고", "골프몬 홈페이지 광고", "KB금융 임직원 및 소개", "sns 광고", "기타"]}
                            defaultValue={subscriptionPath}
                            onSelect={(selectedItem, index) => {
                                setSubscriptionPath(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            defaultButtonText={"선택"}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                            renderDropdownIcon={isOpened => {                                                            
                                return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} color={'#444'} size={13} />;
                            }}
                        />
                        {/* <LoginText>연락처</LoginText>
                        <TextInput placeholder="전화번호를 입력하세요" placeholderTextColor="#ccc" onChangeText={(text)=>setPhone(text)}keyboardType="numeric" maxLength={12}></TextInput>                 */}

                        
                        {/* 회원유형 Start 1011 */}
                        <LoginText>회원유형</LoginText>
                        <SelectDropdown
                            data={memberTypeList}
                            defaultValue={"일반"}
                            onSelect={(selectedItem, index) => {
                                if(selectedItem == "일반") {
                                    setMemberType("general");
                                }else if(selectedItem == "프로골퍼") {
                                    setMemberType("pro");   
                                }                            
                            }}
                            defaultButtonText={'선택'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={isOpened => {                                                            
                                return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} color={'#444'} size={13} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                         />
                        {/* 회원유형 End 1011 */}
                    </ScrollView>    
                        
                {/*
                <PageButton>회원가입</PageButton>
                <PageButtonOn>회원가입</PageButtonOn>
                */}
                
            </CommonContainer>
                    {/* 약관동의 Start */}
                        {/*
                            <ConTitle>스크린고에 대한</ConTitle>
                            <ConTitle>이용약관 동의</ConTitle>
                        */}
                        {console.log(progress)}
                        { progress[0] || (progress[1] && progress[2] && progress[3]) ? 
                            <TouchableOpacity onPress={changeAllAgree}><BorderBoxOn style={{ marginLeft: 20, marginRight: 20, elevation: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }}><AgreeAllOn><IconChkAll><Image style={{ width: "100%", height: "100%" }} source={require('../../images/ico-chkAll.png')}/></IconChkAll></AgreeAllOn><WhiteText>스크린고 이용약관 전체 동의</WhiteText></BorderBoxOn></TouchableOpacity> : 
                            <TouchableOpacity onPress={changeAllAgree}><BorderBox style={{ marginLeft: 20, marginRight: 20 }}><AgreeAll></AgreeAll><BlackText>스크린고 이용약관 전체 동의</BlackText></BorderBox></TouchableOpacity>
                        }                                               
                            <AgreeList style={{ marginLeft: 20, marginRight: 20 }}>
                                <TouchableOpacity onPress={()=> changeAgree(1)}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        {progress[1] ? <IconChkNavy><Image style={{ width: "100%", height: "100%" }} source={require('../../images/ico-chkOrange.png')}/></IconChkNavy> : <IconChkGray><Image style={{ width: "100%", height: "100%" }} source={require('../../images/ico-chkGray.png')}/></IconChkGray>}
                                        <View style={{width: 10}}/><Text>&#91;필수&#93; 개인정보 취급방침</Text></View>
                                </TouchableOpacity>
                                <LookBtn onPress={() => { handleSnapPress(1, agreement01)}}>보기</LookBtn>                                
                            </AgreeList>
                            <AgreeList style={{ marginLeft: 20, marginRight: 20 }}>
                                <TouchableOpacity onPress={()=> changeAgree(2)}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        {progress[2] ? <IconChkNavy><Image style={{ width: "100%", height: "100%" }}  source={require('../../images/ico-chkOrange.png')}/></IconChkNavy> : <IconChkGray><Image style={{ width: "100%", height: "100%" }} source={require('../../images/ico-chkGray.png')}/></IconChkGray>}
                                        <View style={{width: 10}}/><Text>&#91;필수&#93; GolfAI 이용약관</Text></View>
                                </TouchableOpacity>
                                <LookBtn onPress={() => { handleSnapPress(1, agreement02)}}>보기</LookBtn>                
                            </AgreeList>
                            <AgreeList style={{ marginLeft: 20, marginRight: 20 }}>
                                <TouchableOpacity onPress={()=> changeAgree(3)}>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        {progress[3] ? <IconChkNavy><Image style={{ width: "100%", height: "100%" }} source={require('../../images/ico-chkOrange.png')}/></IconChkNavy> : <IconChkGray><Image style={{ width: "100%", height: "100%" }} source={require('../../images/ico-chkGray.png')}/></IconChkGray>}
                                        <View style={{width: 10}}/><Text>&#91;선택&#93; 마케팅 광고 활용 동의</Text></View>
                                </TouchableOpacity>
                                <LookBtn onPress={() => {handleSnapPress(1, agreement03)}}>보기</LookBtn>                                
                            </AgreeList>
            {/* 약관동의 End */}
            {progress[0] || (progress[1] && progress[2])  ? <JoinButton style={{ marginLeft: 20, marginRight: 20 , elevation: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }} agree={true} onPress={goSubmit}><JoinOrText02>회원가입</JoinOrText02></JoinButton> :
                            <JoinButton onPress={goSubmit} style={{ marginLeft: 20, marginRight: 20 }} agree={false}><JoinOrText>회원가입</JoinOrText></JoinButton>
                        }
                        {/* <JoinOrText>또는</JoinOrText>
                        <SnsContainer>
                            <TouchableOpacity onPress={kakaoLogin}><ImgKakao source={require('../../images/img-kakao.png')}/></TouchableOpacity>
                            <TouchableOpacity onPress={()=>promptAsync({showInRecents: true })}><ImgNaver style={{marginLeft:16}} source={require('../../images/img-naver.png')}/></TouchableOpacity>                                                                                
                        </SnsContainer> */}
                </JoinContainer>
            </CommonBackground>
        {/* BottomSheet Start*/}                        
        <BottomSheet
            ref={agreement01}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            animateOnMount={false}
            enableHandlePanningGesture={false}
            enableContentPanningGesture={false}  
            backdropComponent={CustomBackdrop}                                          
        >                                
            <PrivacyCon>        
            
                <PrivacyTit>개인정보 취급방침</PrivacyTit>
                <ScrollView>
                <PrivacyText>                    
                (주)스크린GO는 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 개인정보 보호 규정을 준수합니다. 해당 개인정보취급방침은 2022년 7월 15일부터 시행됩니다. (버전 1.0.20)
1. 총칙
(주)스크린GO(이하 '회사'라고 합니다.)는 이용자가 “골파이” 앱에서 제공하는 서비스(이하 '서비스'라고 합니다.)를 이용하면서 제공하는 개인정보를 귀중하게 생각하고 있고, 이용자가 제공한 개인정보가 적절하게 보호될 수 있도록 통신비밀보호법, 정보통신망 이용촉진 및 정보보호에 관한 법률 등의 관련 법령을 준수하는 등 최선을 다하고 있습 니다.
회사는 개인정보보호정책을 통하여 이용자들이 제공하는 개인정보가 어떠한 용도와 방식으로 수집, 이용되고 있고, 개인정보보호를 위하여 어떠한 조치가 취해지고 있는지 이용자들에게 알려드립니다.
회사의 개인정보 보호정책은 법령변경, 회사 내부적인 방침변경 등으로 인하여 수시로 개정될 수 있습니다.
2. 수집하는 개인정보의 수집항목, 목적, 이용기간
가) 수집하는 개인정보의 항목: 이용자는 기본적인 서비스 이용을 위한 필수 정보와 이용자 각자의 기호와 필요에 맞는 서비스를 제공받기 위한 선택 정보를 입력하여야 합니다.
(1) 회원 가입시 수집하는 정보 (회원 탈퇴 시 삭제)
- 필수 정보 : 이름, 아이디(이동전화번호), 패스워드, 생년월일, 성별, 평균타수 등
(2) 경품 등의 당첨 결과 안내 및 배송 관련 필요한 정보 (배송완료 시 삭제)
- 받는 사람의 이름, 우편번호, 주소, 연락전화번호, 이동전화번호 등
(3) 서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다. (회원 탈퇴 시 삭제)
- 서비스 이용 기록, 불량 이용 기록 등
나) 개인정보 수집 및 이용목적 상세
(1) 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
콘텐츠 제공, 특정 맞춤 서비스 제공, 물품배송 또는 청구서 등 발송, 본인인증, 구매 및 요금결제, 요금추심 (2) 회원관리
회원제 서비스 제공, 개인식별, (주)프로스타일 이용약관 위반 회원에 대한 이용제한 조치, 서비스의 원활한 운영에 지장을 미치는 행위 및 서비스 부정이용 행위 제재, 가입 및 가입횟수 제한, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달, 회원탈퇴 의사의 확인
(3) 회원 이용 골프관련 시설(스크린골프장, 실외골프장 등)의 정보 전송 대행
골프관련 시설 서비스 이용 예약, 결제, 휴업 고지 등 이용 처리 및 안내를 위한 이름, 이동전화번호 전송 대행 (4) 신규 서비스 개발 및 마케팅/광고에의 활용
신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트 정보 및 참여기회 제공, 광고성 정보 제공, 접속빈도 파악, 회원의 서비스 이용에 대한 통계
다) 보유 및 이용기간 상세
이용자가 회사의 회원으로서 회사에 제공하는 서비스를 이용하는 동안 회사는 이용자들의 개인정보를 계속적으로 보유하며 서비스 제공 등을 위해 이용합니다.
다만, 이용자가 자신의 개인정보를 직접 삭제하거나 회사에 가입해지 등을 요청한 경우에는 이용자의 개인정보는 파 기됩니다.
그리고, 일시적인 목적(설문조사, 이벤트, 본인확인 등)으로 제공받은 개인정보는 그 목적이 달성되면 파기됩니다. 다만, 회사는 불량 회원의 부정한 이용의 재발을 방지하기 위해, 이용계약 해지일로부터 1년간 해당 회원의 부정이 용기록, 중복가입확인정보를 보유할 수 있으며, 회원이 서비스 이용기간 중에 직접 공개한 게시글의 경우 이용계약 해지 후 해당 회원의 별도 요청이 있는 경우 신속히 삭제합니다.
또한, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 다음과 같이 일정기간 이용자의 개인정보를 보유 할 수 있습니다.
수집항목(보존이유) : 보존기간
1.계약 또는 청약철회 등에 관한 기록(전자상거래 등에서의 소비자보호에 관한 법률) : 5년 2.대금결제 및 재화 등의 공급에관한 기록(전자상거래 등에서의 소비자보호에 관한 법률) : 5년 3.소비자의 불만 또는 분쟁처리에 관한 기록(전자상거래 등에서의 소비자보호에 관한 법률) : 3년 4.표시, 광고에 관한 기록(전자상거래 등에서의 소비자보호에 관한 법률) : 6개월
5.방문에 관한 기록(통신비밀보호법) : 3개월
라) 개인정보 수집방법
회사는 다음과 같은 방법으로 개인정보를 수집합니다.
- 홈페이지, 서면양식, 팩스, 전화, 상담 게시판, 이메일, 이벤트 응모, 배송요청 - 애플리케이션 회원가입
3. 개인정보 파기절차 및 방법
회사는 이용자의 개인정보 수집 및 이용목적이 달성되거나, 보유 및 이용기간이 경과된 후에는 해당 정보를 지체
없이 파기합니다.
회사의 개인정보 파기절차 및 방법은 다음과 같습니다.
가) 파기절차
- 이용자가 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기되어집니다.
- 동 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의 다른 목적으로 이용되지 않습니다.
나) 파기방법
- 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
- 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
4. 회사가 수집한 개인정보의 공유 및 제공
회사는 이용자들의 개인정보를 고지한 범위 내에서 사용하고, 이용자의 사전 동의 없이는 그 범위를 초과하여 이
용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.

- 이용자들이 사전에 공개에 동의한 경우
- 서비스 제공에 따른 요금정산을 위하여 필요한 경우
- 홈페이지에 게시한 이용약관 및 기타 회원 서비스 등의 이용약관 또는 운영원칙을 위반한 경우
- 회사 서비스를 이용하여 타인에게 정신적, 물질적 피해를 줌으로써 그에 대한 법적인 조치를 취하기 위하여 개인 정보를 공개해야 한다고 판단되는 충분한 근거가 있는 경우
- 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
- 이용자의 서비스 이용에 따른 불만사항 및 문의사항(민원사항)의 처리를 위하여 고객센터를 운영하는 전문업체에 해당 민원사항의 처리에 필요한 개인정보를 제공하는 경우
- 회사가 제공하는 서비스를 통하여 거래가 성사된 경우 상품, 경품 배송 등 필요한 업무처리를 위해 입점업체 또는 배송업체에 배송정보(이름, 주소, 전화번호)를 제공하는 경우
- 영업의 양수 등으로 인하여 이용자의 개인정보 이전이 필요한 경우, 회사는 정보통신망 이용촉진 및 정보보호에 관한 법률 등 관계법률에서 규정한 절차와 방법에 따라 개인정보 이전에 관한 사실 등을 고지하며, 이용자에게는 개인정보 이전에 관한 동의 및 철회권을 부여합니다.
성별, 연령별 기타 특정 조건의 집단에 대한 광고 게재 및 발송 시에도 이용자들의 개인정보는 광고를 의뢰한 개인 이나 기업 등에 제공되지 않습니다.
5. 개인정보의 취급위탁 및 제공
가)개인정보의 취급위탁
회사는 현재 개인정보의 취급위탁을 하지 않고 있습니다. 다만, 향후 서비스 향상을 위해서 개인정보를 위탁할 수
있으며, 그러한 경우 이용자에 대하여 위탁처리기관, 업무내용 및 개인정보의 보유 및 이용기간 등을 명확히 공지하 는 등 관계법령을 준수합니다.
나)개인정보의 제공
- 공유받는자 : (주)스크린GO 및 회원의 원할한 서비스 이용상 필요한 골프관련 시설 및 티칭프로
- 공유하는 항목 : 회원정보(회원명,회원 휴대폰번호, 평균타수)
- 공유받는 자의 이용 목적 : 서비스(제품) 제공(전송), 취소, 환불, 고객상담 등 정보통신서스제공계약 및 전자상거 래(통신판매)계약의 이행을 위해 필요한 업무의 처리
- 보유 및 이용기간 : 서비스 제공기간(관계법령의 규정에 의하여 보존할 필요가 있는 경우 및 사전 동의를 득한 경 우 해당 보유 기간)
6. 이용자 자신의 개인정보 관리(열람, 정정, 삭제 등)에 관한 사항
이용자 또는 법정대리인은 언제든지 설치된 골파이 앱을 이용하여 등록되어 있는 자신의 개인정보를 조회하거나
수정할 수 있으며 가입해지를 요청할 수도 있습니다. 회원들의 개인정보 조회 및 수정을 위해서는 메뉴에서 아이디 와 비밀번호를 사용하여 로그인(LOG-IN) 한 후, 아이디(ID) 및 이름을 제외한 모든 입력사항을 수정할 수 있습니 다.

7. 개인정보 수집, 이용, 제공에 대한 동의철회
이용자는 회원가입 등을 통한 개인정보의 수집, 이용, 제공에 대하여 가입시 동의한 내용을 언제든지 철회할 수 있
습니다. 동의철회는 회사 골파이 앱 상의 '내정보관리' > '회원탈퇴' 페이지 내에서 하시거나 회사의 개인정보관리책 임자 및 담당자에게 서면, 전화, 전자우편 등으로 연락하시면 즉시 개인정보 삭제 등에 필요한 조치를 취하겠습니 다.
8. 개인정보 자동 수집 장치의 설치·운영 및 거부
가) 쿠키(cookie)의 운영에 관한 사항
이용자들에게 특화된 맞춤서비스를 제공하기 위해서 회사는 이용자들의 정보를 저장하고 수시로 불러오는 '쿠키
(cookie)'를 사용합니다. 쿠키는 웹회사를 운영하는데 이용되는 서버(HTTP)가 이용자의 컴퓨터 브라우저에게 보내 는 소량의 정보이며 이용자들의 컴퓨터 내의 하드디스크에 저장되기도 합니다. 회사는 이용자들에게 적합하고 보다 유용한 서비스를 제공하기 위해서 쿠키를 이용하여 아이디에 대한 정보를 찾아냅니다. 쿠키는 이용자의 컴퓨터는 식 별하지만 이용자를 개인적으로 식별하지는 않습니다. 쿠키를 이용하여 이용자들이 방문한 회사의 각 서비스 등을 파 악하여 더욱 편리한 서비스를 만들어 제공할 수 있고, 이용자에게 최적화된 정보를 제공할 수 있습니다. 이용자들은 쿠키에 대하여 사용여부를 선택할 수 있습니다. 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용할 수도 있 고, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키의 저장을 거부 할 경우에는 쿠키허용 설정이 필요한 회사 일부 서비스는 이용할 수 없습니다.
나) 쿠키 설정 거부 방법
이용자는 쿠키 설치에 대해 거부할 수 있습니다. 단, 쿠키 설치를 거부하였을 경우 로그인이 필요한
일부 서비스의 이용이 어려울 수 있습니다. (설정방법, IE 기준)웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정 보 > 사이트 차단
9. 개인정보 관련 보호대책
가) 개인정보의 기술적/관리적 보호대책
회사는 이용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확
보를 위하여 다음과 같은 기술적/관리적 대책을 강구하고 있습니다. 나) 비밀번호 암호화
회원 비밀번호는 복호화되지 않도록 일방향 암호화되어 저장 및 관리되고 있습니다.
따라서, 이용자는 비밀번호를 누구에게도 알려주시면 안됩니다. 이를 위하여 회사는 이용자가 컴퓨터의 사용을 마치 신 후 온라인상에서 로그아웃(LOG-OUT)하시고 웹브라우저를 종료하도록 권장합니다.
특히, 다른 사람과 PC를 공유하여 사용하거나 공공장소(회사나 학교, 도서관, 인터넷 게임방 등)에서 이용한 경우에 는 개인정보가 다른 사람에게 알려지는 것을 막기 위해 위와 같은 절차가 더욱 필요할 것입니다.
이용자 본인의 부주의나 인터넷상의 문제로 ID, 비밀번호 등 개인정보가 유출하여 발생된 문제에 대하여는 회사는 일체의 책임을 지지 않습니다
다) 해킹 등에 대비한 대책
회사는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하 고 있습니다.
개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고, 최신 백신프로그램을 이용하여 이용자들의 개인정보나 자료가 누출되거나 손상되지 않도록 방지하고 있으며, 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하 게 전송할 수 있도록 하고 있습니다. 그리고 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으

며, 기타 시스템적으로 보안성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다. 라) 취급 직원의 최소화 및 교육
회사의 개인정보관련 취급 직원은 담당자에 한정시키고 있고 이를 위한 별도의 비밀번호를 부여하여 정기적으로 갱신하고 있으며, 담당자에 대한 수시 교육을 통하여 개인정보취급방침의 준수를 항상 강조하고 있습니다.
10. 이용자 및 법정대리인의 권리와 그 행사방법
가) 이용자는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
- 회사가 보유하고 있는 개인정보 열람요구(이름, 전화번호, 타수, 기타 정보) - 오류 등이 있을 경우 정정 요구(이름, 전화번호, 타수, 기타 정보)
- 삭제요구(이름, 전화번호, 타수, 기타 정보)
- 처리정지 요구
- 개인정보 이용 철회를 위한 탈퇴요구
나) 제1항에 따른 권리 행사는 회사에 대해 전화, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없 이 조치하겠습니다.
- 고객센터 : 031-217-7273
- 이메일 : qa@screego.net
다) 이용자가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까 지 당해 개인정보를 이용하거나 제공하지 않습니다.
라) 만 14세 미만 아동의 경우, 제1항에 따른 권리 행사는 이용자의 법정대리인이나 위임을 받은 자등 대리인을 통 하여 하실 수 있습니다. 이 경우, 법정대리인은 이용자의 모든 권리를 가집니다.
마) 이용자는 정보통신망법, 개인정보보호법 등 관계법령을 위반하여 회사가 처리하고 있는 이용자 본인이나 타인의 개인정보 및 사생활을 침해하여서는 아니됩니다.
바) 회원탈퇴
- 골파이 앱 : 더보기 > 내정보관리 > 회원탈퇴
이용자가 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 개인정보를 이용 또는 제공하지 않습니다.
11. 광고성 정보전송에 관한 사항
회사는 이용자의 명시적인 수신거부의사에 반하여 영리목적의 광고성 정보를 전송하지 않습니다. 회사는 이용자가
광고성 정보 등에 대한 전자우편 전송에 대한 동의를 한 경우 전자우편의 제목란 및 본문란에 다음과 같이 이용자 가 쉽게 알아 볼 수 있도록 조치합니다.
- 전자우편의 제목란 : 광고라는 문구를 제목란에 표시하며 전자우편 본문란의 주요 내용을 표시합니다.
- 전자우편의 본문란 : 회원이 수신거부의 의사표시를 할 수 있는 전송자의 명칭, 전자우편주소, 전화번호 및 주소 를 명시합니다.
그 내용은 아래와 같습니다.

전송자의 명칭 : (주)스크린GO
전자우편주소 : 16502
주소 : 경기도 수원시 영통구 월드컵로199. 아주대캠퍼스 플라자 805호 전화번호: 031-217-723
팩스나 이동전화 문자서비스 등 전자우편 이외의 방법을 통해 영리목적의 광고성 정보를 전송하는 경우에는 전송내 용 처음에 '광고' 문구를 표기하고 전송내용 중에 전송자의 연락처를 명시하도록 조치합니다.
12.개인정보관리책임자 및 담당자의 연락처
회사는 이용자가 서비스를 이용하시며 발생하는 개인정보보호 관련 민원을 신속히 처리하기 위해 아래와 같이 개 인정보관리책임자 및 개인정보보호 담당자를 지정하여 운영하고 있습니다.
기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
- 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)
- 대검찰청 첨단범죄수사단 (www.spo.go.kr / 02-3480-3571) - 경찰청 사이버안전국 (www.ctrc.go.kr / 국번없이 182)
개인정보보호담당자
성명 : 권라영 담당
소속 : 경영관리지원부 전화 : 031-217-7273 메일 : qa@screengo.net
개인정보보호책임자
성명 : 황용철 대표
소속 : (주)스크린GO 전화 : 031-217-7273 메일 : qa@screengo.net
13. 개정 등
개인정보취급방침의 개정 시에는 개정안의 시행일을 기준으로 최소 7일전부터 홈페이지의 '공지사항'을 통해 고지 할 것입니다.
-공고일자:2022년 7월 5일 - 시행일자 : 2022년 7월 15일
                </PrivacyText>
                </ScrollView>
                <CloseBtn onPress={() => agreement01.current?.close()}><MaterialIcons name="close" size={24} color="black" />닫기</CloseBtn>
            </PrivacyCon>
        </BottomSheet>
        <BottomSheet
            ref={agreement02}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            animateOnMount={true}
            enableHandlePanningGesture={false}  
            enableContentPanningGesture={false}  
            backdropComponent={CustomBackdrop}                 
        >                
            <PrivacyCon>        
                <PrivacyTit>GolfAI 이용약관</PrivacyTit>
                <ScrollView>
                <PrivacyText>
                (주)스크린GO는 회원님들의 개인정보 보호에 대한 안전과 관계법령의 규정을 반영하여 약관을 제정하였습니다. 해당 이용약관은 2022년 7월 15일부터 시행됩니다. (버전 1.0.20)
제1장 총칙 제1조 (목적)
본 약관은 주식회사 스크린GO 및 스크린GO에서 제공/운영하는 스마트폰 등 이동통신기기를 통해 제공되는 골파이 모바일 애플리케이션(이하 “골파이 앱”)을 통해서 제공되는 고객 관련 서비스(이하 “서비스”라 함)를 하나의 ID(이하 “아이디”라 함)와 PASSWORD(이하 “비밀번호”라 함)로 이용함에 있어 회사 및 회원의 제반 권리, 의무, 관련 절차 등을 규정하는데 그 목적이 있습니다.
제2조 (용어의 정의)
본 약관에서 사용하는 주요 용어의 정의는 다음과 같습니다.
1. “웹사이트”란 회원이 온라인을 통해 서비스를 이용할 수 있는 “회사”의 인터넷 사이트(주요 포탈사이트 내 스크 린GO 운영 카페, 밴드 등 포함)들을 말하며, 추후 변동될 수 있습니다.
2. “이용자”란 “웹사이트”에 접속하여 본 약관에 따라 “웹사이트”가 제공하는 서비스를 받거나 골파이 앱을 통해 회 사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.
3. “회원”이란 웹사이트를 통해 본 약관에 정해진 가입 절차에 따라 가입하여 정상적으로 웹사이트와 골파이 앱 및 서비스를 이용할 수 있는 권한 및 회원 ID를 부여 받은 고객을 말합니다.
단, 회원 가입 시 본인인증 절차를 거치지 않은 경우 “회사”가 제공하는 서비스 중 일부가 제한됩니다
4. “비회원”이란 회원으로 가입하지 않고 회사가 제공하는 서비스를 이용하는 사람을 말합니다.
5. "휴면회원"이란 본 약관에 정해진 바에 따라 서비스 이용이 정지된 회원을 말합니다.
6. 회원 ID (이하 “아이디”라 함)란 회원의 식별 및 서비스 이용을 위하여 회원의 신청에 따라 회사가 회원별로 부 여하는 회원별 휴대폰 고유번호 또는 고유한 문자와 숫자의 조합을 말하며, 필요에 따라 규정이 변동될 수 있습니 다.
7. PASSWORD (이하 “비밀번호”라 함)는 회원 아이디로 식별되는 회원의 본인여부를 검증하고 로그인을 하기 위 해, 회원 아이디와 함께 회원이 설정하여 회사에 등록한 고유한 문자와 숫자의 조합을 말합니다.
8. “티칭프로”란 회사가 서비스를 제공하기로 승인한 골파이의 앱 및 웹사이트에서 영리를 목적으로 서비스를 제공 하는 회원을 말합니다.
9. “골프레슨”이라 함은 회원이 웹사이트 및 골파이 앱을 통해 회사와 제휴 관계에 있는 티칭프로와 골프레슨을 예 약할 수 있는 서비스를 말합니다.
10. 스크린GO는 제휴 업체 또는 제휴가맹점(이라 “제휴가맹점”이라 함)은 스크린GO 서비스를 제공하기 위해 회사 와 계약하여 서비스를 제공하는 자를 말합니다.
11. “게시물” 이란 회사나 회원이 웹사이트 및 골파이 앱 내에서 게시한 글, 사진, 각종 파일, 링크 등을 말합니다. 12. “필드 부킹”이라 함은 회원이 홈페이지를 통해 회사와 제휴 관계에 있는 골프장을 예약할 수 있는 서비스를 말
합니다.
13. “온라인 몰(Mall)” 이란 (이하 “몰”이라 함) 회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공 하기 위해 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 몰의 종류는 추후 변동될 수 있습니다.
약관에서 사용하는 용어 중 약관 제2조에서 정의되지 않은 용어의 의미는 일반적인 거래관행에 의합니다.
제3조 (회원제의 운영)
1. 회원은 단 하나의 계정(아이디, 비밀번호)를 통해 본 약관 제2조에 기재한 “웹사이트” 및 "골파이 앱"의 서비스 를 이용할 수 있습니다.
2. 회사는 웹사이트의 특정 서비스를 제공하기 위해 회원에게 별도 또는 추가적인 가입 절차를 요청할 수 있으며, 이러한 특정 서비스를 이용할 경우 해당 “웹사이트” 및 서비스에 대한 이용약관 또는 세칙이 본 약관보다 우선하여 적용됩니다.
3. 회사는 회원이 “웹사이트”를 쉽게 이용할 수 있도록 회원제도를 관리하며, “웹사이트” 또는 “서비스”를 개선, 변 경할 수 있습니다.
4. 회원제가 적용이 되는 “웹사이트”에 대한 정보는 “웹사이트” 초기 화면에 공지하거나 회원에서 전자우편으로 알 릴 수 있으며, 별도 약관으로 명시하지 않는 한 본 약관이 적용됩니다.
제4조 (약관의 명시, 효력 및 개정)
1. 회사는 약관의 내용과 상호 및 대표자 성명, 영업장 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 모사전송번호, 전자우편주소, 사업자등록번호, 통신판매업신고번호, 개인정보관리책임자등을 이용자 가 확인할 수 있도록 홈페이지 초기 서비스 화면에 게시합니다. 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
2. 회사는 관련 법령을 위배하지 아니하는 범위 내에서 약관의 내용을 변경할 수 있습니다.
3. 회사가 약관을 변경하는 경우 적용일자, 개정사유를 명시하여 현행약관과 함께 홈페이지에 그 적용일자 7일 이 전부터 적용일자 전일까지 약관변경사실을 공지하면, 약관변경의 효력이 발생합니다. 다만 회원에게 불리하게 약관 내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지하고 회원에게 개별적으로 전자우편을 전 송하는 방법으로 고지합니다.
4. 회원은 변경된 약관에 대해 동의하지 않을 권리가 있으며, 변경된 약관에 동의하지 않을 경우 회사 또는 회원은 서비스 이용계약을 해지할 수 있습니다.
5. 회사가 약관을 개정할 경우에는 개정 약관 공지 또는 고지 후 개정 약관의 적용에 대한 회원의 동의 여부를 확 인합니다. 개정 약관 공지 또는 고지 시 회원이 동의 또는 거부의 의사표시를 하지 않으면 승낙한 것으로 간주하겠 다는 내용도 함께 공지 또는 고지한 경우에는 회원이 약관 시행일까지 거부 의사를 표시하지 않는다면 개정 약관에 동의한 것으로 간주할 수 있습니다.
제5조 (서비스의 종류 및 제공 등)
1. 회사가 제공하는 서비스의 종류는 다음과 같습니다. 가) AI 스윙 자세 분석 및 온라인 레슨 서비스

나) 골프관련 시설(스크린골프장, 골프장 등) 이용을 위한 예약 서비스
다) 전국 스크린골프장 업체에 대한 정보 제공과 사용자의 현재 위치에서 주변 업체의 정보를 제공
라) 골프레슨 예약을 위한 티칭프로의 위치정보 및 상세 정보 제공
마) 기타 “회사”가 직접 또는 제휴사와 공동으로 진행하는 이벤트 서비스 등 “이용자”에게 제공하는 일체의 서비스
2. 서비스 제공은 회사의 업무상 또는 기술상 특별한 사정이 없는 한 연중무휴, 1일 24시간 운영을 원칙으로 합니 다.
3. 회사는 시스템 정기점검, 증설, 교체 및 또는 운영상의 상당한 이유가 있는경우 서비스를 일시적으로 중단할 수 있습니다.
4. 회사는 긴급한 시스템 점검, 증설, 교체, 설비장애, 고장, 통신투절, 서비스 이용의 폭주, 국가비상상태, 정전, 천 재지변 등 부득이한 사유가 발생한 경우 사전 예고없이 일시적으로 서비스의 전부 또는 일부를 중단할 수 있습니 다.
5. 회사는 서비스의 개편 등 서비스 운영상 필요하다고 판단되는 경우 회원에게 사전 고지한 후 서비스의 전부 또 는 일부를 제공 중단할 수 있습니다..
6. 회사는 회원에게 이메일이나 서신, SMS,전화 등의 방법을 이용하여 서비스 이용에 필요가 있다고 인정되는 각종 정보를 제공할 수 있습니다.
7. 회사가 회원에 대하여 통지하는 경우 회원이 회사에 등록한 이메일이나 전자쪽지(Push 및 SMS) 등으로 할 수 있습니다.
8. 회사는 불특정 다수의 회원에게 통지를 해야할 경우 Push 공지 및 공지 게시판을 통해 개별통지에 갈음할 수 있습니다. 다만, 회원의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별 통지를 합니다.
제6조 (스크린GO 서비스 개요)
1. 회사 및 참여사가 본 약관에 정해진 바에 따라 회원에게 제공하는 스크린GO 서비스는 아래와 같습니다. 가) 마일리지 적립 서비스
회원은 회사 및 참여사에서 지정한 상품 또는 서비스 구입 시 또는 이벤트 등에 의해 마일리지를 적립 받을 수 있 습니다. 단, 회사 및 참여사의 결정에 따라 제외 될 수 있습니다.
나) 마일리지 사용 서비스
회원은 적립된 마일리지를 사용하여 회사 및 참여사에서 지정한 상품 또는 서비스를 구입할 수 있습니다. 다) 할인 서비스
회원은 회사와 참여사에서 상품 또는 서비스 구입 시에 회사 및 참여사의 정책에 따라 상품 구매액의 일부를 할인 받으실 수 있습니다.
라) 기타 서비스
2. 회사와 참여사는 상기 각 호의 서비스 이외에도 추가적인 서비스를 개발하여 회원에게 제공할 수 있습니다.
3. 회원에게 제공되는 서비스는 회사의 영업정책이나 참여사의 사정에 따라 변경될 수 있습니다.
제2장 서비스의 이용 제7조 (이용계약의 성립)
1. 이용계약은 이용자가 이용계약 내용에 동의하여 회사에 서비스 이용신청(회원 가입신청)을 하고, 회사가 이용자 의 서비스 이용신청을 승낙함으로써 성립됩니다.

제8조 (서비스 이용 신청/ 회원가입)
1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원 가입을 신청하며 회원가입계약의 성립 시기는 회사의 승낙이 회원에게 도달한 시점으로 합니다.
2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합 니다.
가. 등록 내용에 허위, 기재누락, 오기가 있는 경우
나. 기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우 다. 회사의 서비스 운영에 막대한 손해를 끼치는 것으로 확인된 경우
라. 법령 또는 약관을 위배하여 이용계약이 해지된 적이 있는 이용자가 신청하는 경우 마. 서비스와 경쟁관계에 있는 자가 악의적인 이용을 목적으로 이용신청을 하는 경우 바. 기타 이 약관에 위배되거나 위법 또는 도박, 영리추구, 미풍양속 저하 등의 부정한
이용신청임이 확인된 경우
3. 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 회사에
방법으로 그 변경사항을 알려야 합니다. 다만, 아이디는 원칙적으로 변경이 불가하며 부득이한 사유로 변경하고자 하는 경우에는 해당 아이디를 해지 신청하고 재차 서비스 이용신청을 하여야 합니다.
4. 회사는 회원을 등급별로 구분하여 이용시간, 이용회수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니 다.
5. 회원의 아이디는 실사용 휴대폰번호당 1개의 아이디를 사용하게 됩니다.
6. 이용자의 회원 가입 절차 완료 이후 제8조 제2항 각호에 속한 사유가 발견된 경우 이용승낙을 철회할 수 있습 니다.
제9조 (서비스 이용제한)
1. 회사는 다음과 같은 사유가 있는 이용자에게 회사가 제공하는 서비스의 일부 또는 전부를 제한, 초기화, 이용계 약 해지 등의 조치를 취할 수 있습니다.
가) 회원정보에 허위사실을 등록하거나, 타인의 아이디, 비밀번호 등 개인정보를 도용하는 경우
나) 아이디를 타인과 거래하거나 타인에게 제공하는 경우
다) 다른 이용자를 희롱 또는 위협하거나, 특정 이용자에게 지속적으로 고통 또는 불편을 주는 경우
라) 회사가 제공하는 클라이언트 프로그램을 임의로 변경하거나, 서버를 해킹 또는 해킹시도 하는 경우, 웹사이트
또는 게시된 정보의 일부 또는 전체를 임의로 변경하는 경우
마) 공공질서, 미풍양속 위배 등 제9조 2항에 해당하는 게시물을 게시하는 경우
바) 회사가 제공하는 서비스를 통해 얻은 정보를 회사의 승낙 없이 서비스 이용 외의 목적으로 복제하거나, 이를
출판 및 방송 등에 사용 또는 제3자에게 제공하는 경우
사) 회사의 직원, 운영자 또는 관계자를 사칭, 허위사실을 유포하거나, 고의로 서비스를 방해하는 등 정상적인 서
비스 운영에 방해를 하는 경우
아) 정보통신 윤리위원회 등 관련 공공기관의 시정 요구가 있는 경우
자) 3개월 이상 서비스를 이용한 적이 없는 경우
차) 이벤트 당첨을 목적으로 회원탈퇴, 재가입을 반복하거나 비정상적인 방법으로 회사 시스템을 위조 또 위조 시
도를 하는 경우
카) 기타 관련법령, 약관을 포함한 회사가 정한 제반 규정을 위반하는 경우
2. 이용자가 게시한 게시물의 내용에 대한 권리와 책임은 이용자에게 있으며, 다음 사유에 해당하는 게시물의 경우 회원의 사전 동의 없이 임시 게시중단, 수정, 삭제, 이동, 등록거부 등의 조치를 취할 수 있습니다.
가) 본 약관에 위배되거나 상용 또는 불법, 음란, 저속하다고 판된되는 게시물 게시나 이미지 등을 사용하는 경우
대하여 회원정보 수정 등의

나) 다른 회원 또는 제3자를 비방, 모욕하거나 중상모략으로 명예를 훼손한 경우 다) 회사에서 규정한 게시기간이나 용량을 초과한 경우
라) 공공질서, 미풍양속에 위반되는 내용을 유포하거나 링크시킨 경우
마) 불법복제, 해킹을 조장하는 내용의 게시물을 게재한 경우
바) 개인정보유포, 범죄와 결부, 위법한 내용의 게시물을 게재한 경우
사) 제3자의 저작권 등 지적재산권을 침해한 경우
아) 사적인 정치적 판단이나 종교적 견해의 내용으로 회사가 서비스 성격에 부합하지 않는다고 판단하는 경우 자) 회사의 서비스 운영 목적에 반하여 특정 대상의 광고 또는 선전을 하는 경우
차) 타인의 정보를 도용하거나 사칭, 허위사실 유포를 하는 경우
카) 동일 내지 유사한 내용의 게시물이나 댓글을 연속으로 등록하는 도배 행위를 하는 경우
타) 서비스 제공 목적이나 게시판 목적에 위배되는 내용을 게재하는 경우
파) 기타 관계법령에 위배된다고 판단되는 경우
3. 회사는 제3자로부터 게시물 등이 명예훼손, 지적재산권 침해 등의 문제가 있으므로 게시 중단 등의 조치를 취할 것을 요청받은 경우, 객관적으로 게시물상의 문제가 있다고 판단되면 게시물의 임시 게시중단 또는 삭제의 조치를 취할 수 있습니다.
4. 게시물이 임시 게시중단 된 경우 게시물을 등록한 회원은 회사에게 게시물의 재게시(전송재개)를 요청할 수 있 고, 회사는 재게시 요청이 정당하다고 판단되는 경우 재게시 조치를 할 수 있습니다. 단, 게시중단 요청자와 게시물 등록자 간의 판결, 조정, 화해, 합의 등이 이루어진 경우 회사는 해당 결정에 따라 게시물의 게시여부를 결정하게 됩니다.
5. 회사는 서비스 이용제한 사유에 속하는 회원에게 회원제재(서비스 이용제재)를 할 수 있으며, 회원제재는 게시물 이나 댓글 등록 금지 또는 로그인 이용 금지 등의 조처가 포함될 수 있습니다.
제10조 (이용계약의 해지/ 회원탈퇴)
1. 회원 또는 회사는 이 약관에서 정한 절차에 따라 이용계약을 해지할 수 있습니다. 2. 회원의 해지
가) 회원이 이용계약을 해지하고자 하는 경우, 언제든지 회사가 정한 회원탈퇴 절차를 통해 회사에 해지 의사를 통 지함으로써 이용계약을 해지할 수 있습니다. 다만, 아래와 같은 회원탈퇴신청이 불가능한 사유가 존재하는 경우 케 이스별로 탈퇴불가 사유를 해결 후 진행할 수 있습니다.
나) 회원의 해지의사가 회사에 도달한 때에 이용계약은 종료 됩니다.
다) 회사가 정한 회원탈퇴 절차를 통해 이용계약의 해지한 회원은 회원가입 절차와 관련조항에 따라 회원으로 재가 입할 수 있습니다. 단, 경품이나 이벤트 중복 당첨 등의 부정한 목적으로 회원탈회 후 재가입을 신청하는 경우, 회 사는 재가입을 승낙하지 않을 수 있습니다.
3. 회사의 해지
회사는 다음과 같은 경우 이용계약을 해지할 수 있습니다. 이 경우 사전에 해당 회원에게 이메일, 전화 등의 방법 을 통하여 해지사유를 밝혀 해지의사를 통지하며, 회원에게 소명의 기회를 부여할 수 있습니다. 단, 다)항의 경우 통보 없이 해지할 수 있습니다.
가) 약관 제8조 2항에서 정하고 있는 이용신청의 승낙거부사유가 있음이 확인된 경우
나) 약관 제9조에서 정하고 있는 이용제한의 사유가 있는 경우
다) 회원에게 파산, 금치산, 한정치산, 회생, 파산의 결정 또는 선고가 있거나 사망, 실종신고, 해산, 부도 등 정상적 서비스 이용을 불가능하게 하거나 곤란하게 하는 사유가 발생한 경우

라) 기타, 회원이 약관에 위배되는 행위를 하는 경우
4. 이용계약 해지와 관련하여 발생한 손해는 이용계약이 종료된 해당 회원이 책임을 부담하며 회사는 일체의 책임 을 지지 않습니다.
제3장 마일리지
제11조 (마일리지 적립)
1. 스크린GO 마일리지(이하 “마일리지”라 함)란 다음 각 호의 마일리지를 말하며, 모든 마일리지는 이자를 지급하 지 않습니다.
가) 적립형 마일리지 : 이용자가 회사 또는 참여사에서 상품을 구매하거나 서비스를 이용하고 그에 따른 대금을 결 제하였을 때 또는 이벤트에 참여하였을 때 회사 또는 참여사가 무상으로 발행한 마일리지
나) 충전형 마일리지 : 회사가 발행하고 회원이 카드 및 현금 등 직접 충전(구매)할 수 있는 마일리지
제12조 (마일리지 서비스 정지 및 해지)
회사는 본 약관 9조 1항의 내용으로 의심되거나 확인된 경우에는 즉시 마일리지 서비스 정지 및 해지 절차를 진
행할 수 있습니다.
제13조 (마일리지 사용 및 환급)
1. 마일지는 골프레슨 결제시만 사용 가능하고 일부 회사가 지정한 서비스 및 상품 구매에 사용할 수 있습니다. 2. 마일리지 환급은 충전형 마일리지인 경우 회사가 정한 환급수수료를 제외한 금액을 지급할 수 있습니다.
단, 별도의 환급수수료 기준이 없는 경우 15%를 공제한 후 지급합니다(카드결제 시 수수료 추가 차감하고 지급)
제14조 (마일리지 정정, 취소, 유효기간 및 소멸)
1. 회사는 본 약관 12조의 내용으로 정지된 경우 정확하게 파악한 후 정정, 취소 및 소멸 절차를 진행할 수 있습니 다.
2. 마일리지의 유효기간은 24개월입니다.
3. 마일리지는 발생일로부터 2년 경과시 자동 소멸됩니다
제4장 티칭프로 제15조 (권리와 의무)
1. 티칭프로 자격증 및 경력 사항 등 허위 사실이나 타인의 정보를 도용한 경우는 즉시 회원자격 정지 및 해지처리 할 수 있습니다.
2. 티칭프로는 본인 서비스 지역의 골퍼 회원이 신청한 골프레슨을 최대한 빠르게 성실히 확정지어야 합니다.
3. 티칭프로는 확정된 골프레슨 예약을 성실히 수행하여야 하며 그렇지 아니한 경우에는 회사가 정한 규정에 따라 페널티가 부과될 수 있습니다. 단, 별도 규정이 없을 시에는 아래 규정이 적용됩니다.
가. 레슨 예약이 확정된 이후 사전 협의 없이 일방적 취소나 나타나지 않는 경우 즉시 자격 정지 및 징계

나. 골퍼 회원(블랙컨슈머 제외)의 레슨 만족도가 20% 미만인 경우는 레슨비 100% 환불로 레슨 수당 부지급 다. 골퍼 회원(블랙컨슈머 제외)의 레슨 만족도가 40% 미만인 경우는 레슨비 50% 환불로 레슨 수당 50% 지급 라. 레슨 만족도는 골퍼회원이 평가한 만족도와 티칭프로의 레슨이력 입력 등 종합적으로 판단하여 결정
4. 골프 레슨을 성실히 수행한 경우에는 레슨비의 80%를 레슨 수당으로 지급 받는다.
가. 당월 발생한 레슨 수당은 익월 10일 지급한다.
나. 마일리지나 할인 포인트 등 적용시에는 80% 부담한다 (레슨수당에서 차감된 마일리지(포인트,할인 등) 80%
를 차감하고 지급)
제5장 홈페이지
제16조 (홈페이지 개요)
1. 회사는 회원에게 서비스를 제공하기 위하여 본 약관 제2조 1항에 정의한 홈페이지에 속한 웹사이트들을 운영하 며, 회원이 홈페이지를 이용하는데 있어 본 약관의 조항들을 적용합니다.
2. 홈페이지를 이용하고자 하는 회원은 본 약관 제7조, 제8조 에서 명시된 방법으로 회원가입 후 이용이 가능합니 다.
제17조 (홈페이지 서비스의 이용 및 중단)
회사는 본 약관 제5조와 제9조에 해당하는 경우 서비스 제공의 전부 또는 일부를 제한하거나 중지할 수 있습니다.
제18조 (게시물의 저작권)
1. 회사가 작성한 게시물 또는 저작물에 대한 저작권 등의 일체의 지적재산권은 회사에 귀속합니다.
2.회원이 서비스 내에서 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 단, 회사는 서비스의 운영, 전시, 전송, 배포, 홍보의 목적으로 회원의 별도의 허락 없이 무상으로 저작권법에 규정하는 공정한 관행에 합치되게 합리 적인 범위 내에서 회원이 등록한 게시물을 사용할 수 있습니다.
3.회사는 전항 이외의 방법으로 회원의 게시물을 이용하고자 하는 경우 사전에 회원으로부터 전화, 팩스, 전자우편 등의 방법을 이용하여 동의를 얻어야 합니다.
4.회원이 이용계약 해지를 한 경우 본인 계정에 기록된 게시물 일체가 삭제될 수 있습니다.
제19조 (회사의 의무)
1.회사는 회원이 희망한 서비스 제공 개시일에 특별한 사정이 없는 한 서비스를 이용할 수 있도록 합니다. 2.회사는 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 멸실된 때에는 부득이한 사유가 없는 한 지체 없이 설비를 수리 또는 복구합니다.
3.회사는 개인정보 보호정책을 공시하고, 회원의 개인정보를 보호하기 위하여 노력합니다.
4.회사는 회원으로부터 제기되는 의견이나 불만이 객관적으로 정당하다고 인정되는 경우 적절한 절차를 거쳐 즉시 처리합니다. 다만, 즉시 처리가 곤란한 경우에는 회사는 회원에게 그 사유와 처리일정을 통보하여야 합니다.
제20조 (회원의 의무)
1. 회원은 회원가입 신청, 회원정보 변경시 모든 사항을 사실에 근거하여 본인의 진정한 정보로 작성하여야 합니다. 2.회원이 허위 또는 타인의 정보를 등록할 경우 회원은 이용계약과 이용계약에 부수하여 발생되는 일체의 권리를

주장할 수 없습니다.
3.회원은 관계법령, 약관, 개별약관 등, 공지사항 등을 준수하여야 합니다.
4.회원은 회사의 업무에 방해되는 행위, 회사의 명예를 손상시키는 행위, 타인에게 피해를 주는 행위를 하여서는 아니됩니다.
5.회원은 제반정보가 변경되는 경우 회원정보변경 등의 방식으로 즉시 회사에 알려야 하고, 만약 회원이 이러한 고지의무를 게을리하여 발생되는 손해에 대하여는 회사는 책임을 부담하지 아니합니다.
6.회원은 회사의 사전 승낙없이 서비스를 이용하여 영업활동을 할 수 없고, 그 영업활동의 결과에 대해 회사는 책 임을 지지 않습니다. 또한, 이와 같은 회원의 영업활동으로 인하여 회사가 손해를 입은 경우 회사는 당해 회원에 대 한 서비스 이용을 제한하고, 손해배상 등을 청구할 수 있습니다.
7.회원은 회사의 명시적 동의가 없는 한 서비스의 이용권한, 기타 이용계약상의 지위를 제3자에게 양도, 증여, 담 보 제공하는 등의 일체의 처분행위를 할 수 없습니다.
8.회원은 회사 및 제3자의 지적재산권을 포함한 제반 권리를 침해하거나 제9조 제1항, 제2항 각 호에 해당하는 행위를 해서는 안됩니다.
제21조 (광고게재 및 광고주와의 거래)
1.회사가 회원에게 서비스를 제공할 수 있는 서비스 투자기반의 일부는 광고게재를 통한 수익으로부터 나오는바, 회원은 서비스 이용시 노출되는 광고게재에 대해 동의합니다.
2.서비스 상에 게재되어 있거나 서비스를 통한 광고주의 판촉활동에 의하여 회원과 광고주간의 거래가 발생되는 경우 회사는 그 거래로 인하여 발생되는 손해에 대하여는 아무런 책임을 부담하지 아니합니다.
제6장 개인정보 보호
제22조 (개인정보의 보호 및 사용)
1. 회사는 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.
2. 회사는 회원가입시 계약이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 계 약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.
3. 회사는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.
4. 회사는 수집된 개인정보를 목적외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 다만, 관련 법령에 달 리 정함이 있는 경우에는 예외로 합니다.
5. 회사가 제3항과 제4항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보관리 책임자의 신원(소속, 성명 및 전화번호, 기타 연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공 관련사항(제공받은자, 제공목적 및 제공할 정보의 내용) 등 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제22조제2항이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다.
6. 이용자는 언제든지 회사가 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 회사는 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다. 이용자가 오류의 정정을 요구한 경우에는 회사는 그 오류 를 정정할 때까지 당해 개인정보를 이용하지 않습니다.
7. 회사는 개인정보 보호를 위하여 이용자의 개인정보를 취급하는 자를 최소한으로 제한하여야 하며 이용자의 개인 정보의 분실, 도난, 유출, 동의 없는 제3자 제공, 변조 등으로 인한 이용자의 손해에 대하여 모든 책임을 집니다.
8. 회사 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당 해 개인정보를 지체 없이 파기합니다.

9. 회사는 개인정보의 수집?이용?제공에 관한 동의란을 미리 선택한 것으로 설정해두지 않습니다. 또한 개인정보의 수집,이용,제공에 관한 이용자의 동의거절시 제한되는 서비스를 구체적으로 명시하고, 필수수집항목이 아닌 개인정 보의 수집,이용,제공에 관한 이용자의 동의 거절을 이유로 회원가입 등 서비스 제공을 제한하거나 거절하지 않습니 다.
제7장 기타
제23조 (약관 외 준칙 및 관련 법령과의 관계)
1. 이 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따릅니다.
2. 회사가 제공하는 구매 서비스를 통하여 거래한 경우, 전자상거래등에서의 소비자보호에관한법률 등 관련 법령이 해당 거래 당사자에게 우선적으로 적용되고, 거래 당사자는 이 약관의 규정을 들어 거래 상대방에 대하여 면책을 주장할 수 없습니다.
3. 회사는 필요한 경우 서비스 내의 개별항목에 관한 개별약관, 운영원칙(이하 “개별약관”이라 함)을 정할 수 있고, 약관과 개별약관의 내용이 상충되는 경우에는 개별약관 등의 내용이 우선 적용 됩니다.
4. 회원은 이 약관 및 개별약관의 내용에 변경이 있는지 여부를 주시하여야 하며, 변경사항의 공지가 있을 시에는 이를 확인하여야 합니다.
제24조 (면책조항)
1.회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지, 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임을 부담하지 않습니다.
2.회사는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임을 부담하지 않습니다.
3.회사는 회원의 컴퓨터 오류에 의해 손해가 발생하거나 회원이 전자우편 주소를 비롯한 신상정보를 부실하게 기 재하여 손해가 발생된 경우 책임을 부담하지 않습니다.
4.회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 부담하지 않고, 서비스를 이용하면서 얻은 자료로 인한 손해에 대하여 책임을 지지 않습니다.
5.회사는 회원이 서비스에 게재한 각종 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 대하여 책임을 부담하지 않 고, 서비스를 매개로 회원 상호간 및 회원과 제3자 간에 발생된 분쟁에 대하여 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임을 부담하지 않습니다.
6.회사는 회원의 게시물 등록 전에 사전심사 하거나 상시적으로 게시물의 내용을 확인 또는 검토하여야 할 의무가 없습니다.
7. 회사는 무료로 제공하는 서비스의 이용과 관련하여 개인정보보호정책에서 정하는 내용에 위반하지 않는한 어떠 한 손해도 책임지지 않습니다.
제25조 (분쟁해결)
1. 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리부서 를 운영합니다.
2. 회사는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란 한 경우에는 이용자에게 그 사유와 처리일정을 통보해 드립니다.
3. 회사와 이용자간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.

제26조 (준거법 및 관할법원)
1.회사와 이용자간에 제기된 소송은 대한민국법을 준거법으로 합니다.
2. 본 약관에 의한 서비스 이용과 관련한 제반 분쟁 및 소송은 민사소송법상의 관할법원에 제기합니다.
준수사항1. 모바일 사용조건
애플리케이션 사용함. 회사는 이 애플리케이션을 개인적인 용도로만 사용할 권리를 회원에게 드립니다. 회원은
(가) 이 애플리케이션이나 이 애플리케이션과 관련된 정보나 소프트웨어를 변경, 복사, 공개, 라이선스, 판매 또는 상업화해서는 안 되고, (나) 이 애플리케이션에 대한 권리를 임대, 대여 또는 양도해서는 안 되고, (다) 어떤 식으로 든 회사나 회사앱에 손상을 끼치거나 또는 누군가가 회사나 회사앱을 사용하거나 즐기는 것을 간섭할 수 있는 방법 으로 이 애플리케이션을 사용해서는 안 됩니다. 회원은 모든 관련 법령을 준수하여 이 애플리케이션을 사용해야 합 니다. 회원은 이 애플리케이션을 사용할 때는 적용 가능한 제3자 합의 조건을 준수해야 합니다(예, 무선 데이터 서 비스 계약). 이 사용 조건을 위반하면 당신의 이 애플리케이션 사용 권리는 즉시 종료됩니다.
지적 재산. 회사는 특허, 저작권, 영업 비밀, 상표 또는 부정경쟁방지법 상의 모든 권리를 포함한 애플리케이션에 대한 모든 권리, 타이틀과 이해 관계, 그리고 모든 어플, 개정, 연장, 복구를 포함한 그 밖의 모든 재산권을 가지고 있거나 또는 사용권한을 부여받고 있습니다. 회원은 변경, 적용, 번역, 파생 작업 준비, 디컴파일, 리버스 엔지니어, 해체 또는 그 밖에 이 애플리케이션으로부터 소스 코드를 끌어 내려고 해서는 안 되며, 이 애플리케이션에 포함된 회사의 저작권 통지, 상표 또는 그 밖의 재산권 통지를 제거, 변경 또는 모호하게 해서는 안 됩니다.
보증 부인. 회사는 회원이 이 애플리케이션을 사용한 결과로 입은 피해에 대해 책임을 지지 않습니다. 이 애플리케 이션과 이 애플리케이션으로 이용하는 서비스는 “있는 그대로” 그리고 “이용 가능한 상태로” 제공됩니다. 회사는 상 품성, 특정 목적 부합성, 재산권 비침해성, 그리고 이 애플리케이션의 보안, 신뢰, 시기적절, 성능 등을 포함하나 이 에 한정되지 않는 모든 명시적, 묵시적, 법령상의 보증을 법령이 허용하는 최대 범위에서 명시적으로 부인합니다. 이 애플리케이션을 사용함으로써 회원의 하드웨어 장비에 생기는 피해나 데이터 손실에 대해 회원이 전적으로 책임 을 부담합니다. 이 애플리케이션의 Bid 업데이트와 그 밖의 통지 기능은 실시간으로 발생하지 않을 수 있습니다. 그 런 기능은 회원의 물리적인 장소나 회원의 무선 데이터 서비스 제공자의 네트웤에서 기인하는 지연이나 대기 시간 등을 포함하나 이에 한정되지 않는 회사의 통제를 벗어난 지연이 있을 경우 그에 따릅니다.
책임 제한. 회사는 이 애플리케이션의 사용 또는 부정 사용에 대해 회원이나 애플리케이션 사용자에게 책임을 지지 않습니다. 이러한 책임 제한은 (가) 그런 클레임이 보증, 계약, 불법행위 또는 그 밖의 어떤 원인을 근거로 하든, (회사가 그런 피해의 가능성을 고지 받았다 하더라도) 직접, 간접, 우연, 부수적, 특별, 예시, 징벌적 피해를 포함하 며 (나) 이 애플리케이션의 사용 또는 부정 사용, 신뢰 또는 이 애플리케이션의 중단, 중지, 종료로부터 피해가 발생 한 경우(제3자가 야기한 피해 포함)에도 적용되며 (다) 제한된 치유책의 본질적인 목적의 실패에도 불구하고 법이 허용하는 최대 범위에서 적용됩니다. 그리고, 회원은 결과적인 손실 이윤, 특별, 간접, 부수적 손해를 회사로부터 회 복하려고 하지 않습니다. 어떤 지역은 손해의 제외나 보증의 부인을 허용하지 않으므로 그런 제외와 부인은 회원에 게 적용되지 않을 수도 있습니다. 그러므로 만약 회사가 어떤 이유로든 책임이 있다고 밝혀질 경우, 회사의 회원이 나 제3자에 대한 책임은 최대 골프레슨 결재금액에 한정됩니다.

면책. 회원은 제3자가 회원의 행위나 회원의 이 애플리케이션의 사용 그리고 이 개인정보보호 정책과 사용 조건, 관련 법률과 규정의 위반과 직간접적으로 관련하여 제기하는 클레임으로부터 회사나 그 모회사, 자회사, 책임자, 임 원, 주주, 에이전트, 직원을 면책시키고 피해가 없도록 해야 합니다. 회사는 회원의 면책 의무를 근거로 관련 사안 의 방어와 통제를 회사의 비용으로 떠맡을 수 있는 권리를 보유하지만, 그렇게 하는 것이 회원의 면책 의무를 면제 해 주는 것은 아닙니다.
이 애플리케이션 또는 사용 조건의 변경. 회사는 때때로 이 애플리케이션이나 본 사용 조건을 변경할 권리를 가지 고 있습니다. 중요한 변경은 새로운 사용자에 대해 즉시 효력을 발생하고 기존 사용자에 대해서는 통지 후 30일 경 과 후에 효력을 발생합니다. 회원이 변경에 동의하지 않으면 이 애플리케이션을 삭제하고 이용을 중단하십시오. 30 일 통지 기간 이후에 이 애플리케이션을 사용하는 것은 그러한 변경에 동의하였음을 의미합니다.
추가 조항. 애플리케이션이 설치되는 모바일 기기에 따라 회원에게 적용되는 추가 조항입니다. iOS - Apple
1. 이 사용 조건은 회원과 회사 사이의 합의이지 회원과 애플사와의 합의가 아닙니다. 애플사는 애플리케이션과 그 내용에 대하여 책임을 지지 않습니다.
2. 회사는 회원이 소유하거나 관리하는 iOS 제품에서만 그리고 앱 스토어 서비스 조건에 규정된 사용 규칙이 허용 하는 대로만 애플리케이션을 사용할 권리를 회원에게 부여합니다.
3. 애플사는 애플리케이션과 관련하여 그 어떠한 유지 보수 서비스를 제공할 의무가 없습니다.
4. 애플사는 그 어떤 제3자 지적 재산 침해 클레임의 조사, 방어, 화해, 면제에 대하여 책임을 지지 않습니다.
5. 애플사는 애플리케이션 또는 애플리케이션의 소유 및/또는 사용과 관련하여 (a) 제조물 책임 클레임, (b) 애플리 케이션이 법률 또는 규제 요구사항을 준수하지 못한다는 클레임, (c) 소비자 보호 또는 유사한 법령 상의 클레임 등 회원이나 제3자의 클레임을 취급할 책임이 없습니다.
6. 애플리케이션이 적용 가능한 품질보증을 준수하지 못한 경우, 회원은 애플사에 통지할 수 있고, 애플사는 회원에 게 애플리케이션 구매 금액을 환불해 줄 것이며; 법률이 허용하는 최대 한도 내에서 애플사는 애플리케이션과 관련 하여 그 어떤 보증 의무도 부담하지 않습니다.
7. 애플과 애플의 자회사는 이 사용 조건의 제3자 수혜자이며, 회원이 이 사용 조건을 수용하면 제3자 수혜자로서 의 애플사는 회원에게 이 사용 조건을 실행할 권리를 가지게 됩니다(그리고, 그런 권리를 수용한 것으로 간주됩니 다).
Windows - Microsoft
1. 이 사용 조건은 회원과 회사 사이의 합의이지 회원과 마이크로소프트와의 합의가 아닙니다. 마이크로소프트와
네트웤 운영자(윈도우폰 마켓플레이스 과금 서비스 제공)의 사용 조건과 개인정보보호 정책은 회원의 애플리케이션 사용에 적용되지 않습니다.
2. 회원은 회원이 개인적으로 소유 또는 관리하고 회원의 윈도우 마켓플레이스 계정 윈도우 라이브 아이디와 연관 된 기기 다섯개까지 애플리케이션 카피 한 개를 설치 또는 사용할 수 있습니다. 회원은 회원이 소유 또는 관리하지 않는 기기에 애플리케이션 카피를 설치하거나 사용할 수 없습니다.
3. 마이크로소프트, 회원의 기기 제조자, 회원의 무선통신 제공자는 애플리케이션에 대한 지원 서비스를 제공할 책 임이 없습니다.
4. 마이크로소프트 그리고 애플리케이션이 배포되는 네트웤 업체인 무선통신 제공자, 각각의 계열사와 공급사(총칭

하여 “부인 배포자”)는 애플리케이션 하에서 또는 애플리케이션과 관련하여 명시적인 보증을 제공하지 않습니다. 회 원 소재국의 법률에서 허용하는 범위 내에서 “부인 배포자”는 상업성, 특수목적 적합성 및 비침해성 등의 그 어떠한 묵시적인 보증을 제외합니다.
5. (“부인 배포자”가 회원에게 손해가 생길 가능성을 통지 받았다고 해도) “부인 배포자”가 아닌 회원이 애플리케이 션 사용의 위험을 부담합니다. 회원은 이 사용 조건이 변경할 수 없는 회원 소재국 법률 상의 추가적인 소비자 권 리를 가질 수 있습니다.
6. 법률이 금지하지 않는 범위 내에서, 회원은 “부인 배포자”로부터의 우연적 손해, 손실 이윤, 특별 손해, 간접 손 해 또는 부수적인 손해를 청구할 수 없습니다.
부칙
본 약관은 2022년 7월 15일부터 적용됩니다.
                </PrivacyText>
                </ScrollView>
                <CloseBtn onPress={() => {agreement02.current?.close()}}><MaterialIcons name="close" size={24} color="black" />닫기</CloseBtn>            
            </PrivacyCon>                
        </BottomSheet>

        <BottomSheet
            ref={agreement03}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            animateOnMount={true}
            enableHandlePanningGesture={false}
            enableContentPanningGesture={false}  
            backdropComponent={CustomBackdrop} 
        >                            
            <PrivacyCon>        
                <PrivacyTit>마케팅 광고 활용 동의</PrivacyTit>
                <PrivacyText>                    
(주)스크린GO에서 제공하는 이벤트 및 서비스(제휴서비스 포함) 안내 등 광고성 정보를 받으 시려면 마케팅 목적 이용에 동의하여 주시기 바랍니다.
신규서비스(제품) 개발 및 특화, 맞춤형 서비스 제공, 기능 개선, 인구통계학적 특성에 따른 서비스 제공 및 광고거재, 접속 빈도파악, 이용자 서비스 이용에 대한 통계 시 광고성 정보로 사용됩니다.
*위의 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
그러나, 동의를 거부할 경우 회원 가입 및 일부 서비스 이용이 제한됩니다.
이용 목적
맞춤형 서비스 제공에 따른 마케팅·광고 활용
활용 항목
닉네임, 휴대폰번호, 주소
제공 기간
마케팅·광고 철회 및 탈퇴시 까지
                </PrivacyText>
                <CloseBtn onPress={() => {agreement03.current?.close()}}><MaterialIcons name="close" size={24} color="black" />닫기</CloseBtn>            
            </PrivacyCon>               
        </BottomSheet>
        {/* BottomSheet End*/}        
    </Wrap>
    )
}

const styles = StyleSheet.create({ // picker Style(selectBox)
    dropdown1BtnStyle: {
      width: '100%',
      height: 52,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#EBEBEB',
      marginBottom: 40
    },
    dropdown1BtnTxtStyle: {color: '#666666', textAlign: 'left', fontWeight: "400"},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF',borderRadius: 8},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  });
export default Join;
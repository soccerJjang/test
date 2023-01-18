import * as React from 'react';
import * as RN from 'react-native';
import { View, Text, Image, ScrollView, } from 'react-native';
import styled from "styled-components";
import { CommonBackground } from '../../styled-components/Common';
import { CheckBtn, InfoText, Nickname, NicknameBox, TextInput, UpdateButton, InfoSetWrap } from '../../styled-components/my_page/Profile';
import { 
    ErrorMessage,
    ErrorMessageIcon
} from '../../styled-components/login/Login';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons'; 
import * as SecureStore from 'expo-secure-store';
import { signApi } from '../../api/sign'; // nickname 중복
import { myPageApi } from '../../api/myPage';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { UserImage } from '../../styled-components/Draw';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isTypeNode } from 'typescript';

const Profile = ({navigation}) => {    
    const [user, setUser] = React.useState(null);
    const [beforeNickname , setBeforeNickname] = React.useState(null);
    const [beforePhone, setBeforePhone] = React.useState(null);
    const [verify, setVerify] = React.useState(false);
    const [, updateState] = React.useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = React.useState(null);
    const [profileImage, setProfileImage] = React.useState(null);
    const [confirmVerify, setConfirmVerify] = React.useState(false);
    const [phoneConfirmChk, setPhoneConfirmChk] = React.useState(false);
    
    let setNicknameCheck = false;

    // 닉네임 정규표현식 (특수문자 x)
    const nicknameRegExp = /[^\w\sㄱ-힣]|[\_]/g;

    // 핸드폰번호 11자리
    const phonNumberRegExp = /^[0-9]{3}[0-9]{3,4}[0-9]{4}/;

    // 숫자 정규표현식
    const distanceRegExp = /^[0-9]*$/;

    const getUserData = async() => {
        let userData = null;
        userData = await SecureStore.getItemAsync("userData"); 
        
        if(userData) {
            userData = JSON.parse(userData);
            setUser(userData);
            setBeforeNickname(userData.nickname);
            setBeforePhone(userData.phone);
            if(userData.phone != null && userData.phone != '') {
                setConfirmVerify(true);
            }
        }else {
            navigation.navigate("Login");
        }
    };

    React.useEffect(() => {
        getUserData();

        (async () => {
            if(Platform.OS === "android") {
                await RN.PermissionsAndroid.requestMultiple([
                    RN.PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    RN.PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ]).then((result) => {
                    if(result['android.permission.WRITE_EXTERNAL_STORAGE']
                    && result['android.permission.READ_EXTERNAL_STORAGE']
                    === 'granted') {
                        console.log("권한 획득");
                    } else {
                        console.log("권한 거절");
                    }
                });
            } else {
                const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
                setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');    
            }
        })();

        return (async() => {
            
        });
    },[])

    const checkPhoneAlert = () => {
        if(user.phone == null || user.phone == "") {
            RN.Alert.alert("핸드폰 번호를 입력해주세요.");
            return false;
        } else {
            if(!phonNumberRegExp.test(user.phone)) {
                RN.Alert.alert("핸드폰 번호 11자리를 입력해주세요.");
                return false;
            }
        }
        RN.Alert.alert(
            "핸드폰 번호를 인증하시겠습니까?", 
            "",        
                [                              
                    {
                    text: "아니요",                              
                    style: "cancel"
                    },
                    { text: "네", onPress: () => checkPhone() }, 
                                                                    
                ],
                { cancelable: false }
        );
    }
    const checkPhone = async() => { 
        if(user != null && user.phone != null) {
            let checkNum = await signApi.checkPhoneNumber(user.phone);
            if(checkNum) {
                RN.Alert.alert("인증 번호가 전송되었습니다.");
                if(await signApi.sendSMS(user.email_id, 'email_id', 'profile', user.phone) == 200) {                    
                    setConfirmVerify(false);
                    setVerify(true);
                    return false;   
                } else {
                    setVerify(false);
                }
            } else {
                RN.Alert.alert("이미 인증된 번호입니다.");
                setConfirmVerify(true);
                setVerify(false);
                return false;
            }
        }
    }

    const checkPhoneVerify = async () => {
        if(await signApi.verifySMS(user.email_id, 'email_id', user.verify_code) == 200) {
            RN.Alert.alert("인증되었습니다.");
            setVerify(false);
            setConfirmVerify(true);
            setBeforePhone(user.phone);
            return false;
        } else {
            RN.Alert.alert("인증번호를 확인해주세요.");
            setConfirmVerify(false);
            return false;
        }
    }

    const checkNickname = async () => {
        if(user.nickname == null || user.nickname == '') {
            RN.Alert.alert("닉네임을 입력해주세요");
            setNicknameCheck = false;
            return false;
        }

        if(user != null && user.nickname != null) {
            if(user.nickname != beforeNickname) {
                if(!user.nickname.match(nicknameRegExp)){
                    if(await signApi.checkNickname(user.nickname)) {
                        RN.Alert.alert("사용 가능한 닉네임입니다.");
                        setNicknameCheck = true;
                        return false;
                    } else {
                        RN.Alert.alert("사용 불가한 닉네임입니다.");
                        setNicknameCheck = false;
                        return false;
                    }
                }else {
                    RN.Alert.alert("닉네임에 문자만 입력해주세요");
                    setNicknameCheck = false;
                    return false;
                }
            } else {
                RN.Alert.alert("사용 가능한 닉네임입니다.");
                setNicknameCheck = true;
                return false;
            }
        }
        
    };

    const updateProfile = async() => {
        let phoneVerify = confirmVerify;
        if(user.phone == '') {
            phoneVerify == true;
        } else {
            if((beforePhone != null && beforePhone != "") && beforePhone != user.phone) {
                RN.Alert.alert("핸드폰 인증을 완료해주세요");
                return false;
            }
        }
        if(!phoneVerify) {
            RN.Alert.alert("핸드폰 인증을 완료해주세요.");
            return false;
        }
        if(user.nickname === beforeNickname) {
            setNicknameCheck = true;
        }

        if(!setNicknameCheck) {
            RN.Alert.alert("닉네임 중복체크를 해주세요.");
            setNicknameCheck = false;
            return false;
        }

        // if(setConfirmVerify && setNicknameCheck) {

            FileSystem.FileSystemUploadOptions = {
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: 'file',
                parameters: {
                    "user_no" : user.user_no,
                    "nickname": user.nickname,
                    "phone": user.phone,
                    "average_score" : user.average_score,
                    "career" : user.career,
                    "driver_distance" : user.driver_distance,
                    "iron_distance" : user.iron_distance,
                    "birth" : user.birth,
                    "gender" : user.gender,
                    "sido" : user.sido,
                    "sigungu" : user.sigungu,
                }
            }
            const server = `http://223.130.132.180:5008/myPage/updateProfileImage`
            let result = '';
            let success = false;
            let body = new Object();

            if(profileImage != null) {
                console.log("test5");
                await FileSystem.uploadAsync(server, profileImage, FileSystem.FileSystemUploadOptions)
                .then((res) => JSON.parse(res.body))
                .then((body) => {
                        success = body.success;
                        return new Object({...user, photo : body.path});
                })
                .then((data) => {
                    setUserData(data)});
            } else {
                result = await myPageApi.updateProfile(user);
                success = result.success;
                setUserData(user);
            }


            if(success){
                RN.Alert.alert("수정완료되었습니다 !");             
            }else {
                RN.Alert.alert("수정실패하였습니다 !");
                return false;
            }
            updateState();       

    };


    const setUserData = async (userData) => {
        await SecureStore.setItemAsync("userData", JSON.stringify(userData));
    };

    const profileImageChange = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if(!result.cancelled) {
            setProfileImage(result.uri);
        }

    }
    
    // picker data(select box)
    const careerList = ["1~3년", "3~5년", "5년~10년", "10년 이상"];
    const averageDistanceList = ["100M 이하", "100~150M", "150~200M", "200M 이상"];
    const genderList = ["남성", "여성"];
    const [sido, setSido] = React.useState(user != null && user.sido != null ? user.sido : ''); 
    const sigungu = {
        "서울특별시" : [ "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구" ],
        "경기도" : [ "수원시 장안구", "수원시 권선구", "수원시 팔달구", "수원시 영통구", "성남시 수정구", "성남시 중원구", "성남시 분당구", "의정부시", "안양시 만안구", "안양시 동안구", "부천시", "광명시", "평택시", "동두천시", "안산시 상록구", "안산시 단원구", "고양시 덕양구", "고양시 일산동구",
                "고양시 일산서구", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시 처인구", "용인시 기흥구", "용인시 수지구", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군",
                "양평군" ],
        "인천광역시" : [ "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군" ],
        "강원도" : [ "춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군" ],
        "충청북도" : [ "청주시 상당구", "청주시 서원구", "청주시 흥덕구", "청주시 청원구", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군" ],
        "충청남도" : [ "천안시 동남구", "천안시 서북구", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군" ],
        "대전광역시" : [ "대덕구", "동구", "서구", "유성구", "중구" ],
        "세종특별자치시" : [ "세종특별자치시" ],
        "전라북도" : [ "전주시 완산구", "전주시 덕진구", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군" ],
        "전라남도" : [ "목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군" ],
        "광주광역시" : [ "광산구", "남구", "동구", "북구", "서구" ],
        "경상북도" : [ "포항시 남구", "포항시 북구", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군" ],
        "경상남도" : [ "창원시 의창구", "창원시 성산구", "창원시 마산합포구", "창원시 마산회원구", "창원시 진해구", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군" ],
        "부산광역시" : [ "강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군" ],
        "대구광역시" : [ "남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군" ],
        "울산광역시" : [ "남구", "동구", "북구", "중구", "울주군" ],
        "제주특별자치도" : [ "서귀포시", "제주시" ]
    }

    let yearList = [];
    let scoreList = new Array();
    const year = new Date().getFullYear();
    for(let i = 0; i <100; i++) {
        yearList.push(year - i);
    }
    for(let i = 60; i <= 150; i++) {
        scoreList.push(i);
    }
    if(user) {
    return (
        <>
        <CommonBackground>
            <InfoSetWrap showsVerticalScrollIndicator={false}>
                <RN.ScrollView> 
                    <ProfileSetBox onPress={profileImageChange}>
                        {
                            (profileImage == null) 
                            ? <ProfileImg style={{ width: '100%', height: '100%' }} source={user != null && user.photo != null ? {uri: `http://223.130.132.180:5008${user.photo.replace("/home/dev1/data/screengo_api", "/screengo")}`} : require('../../images/img-ProfileImg.png') } />
                            : <ProfileImg style={{ width: '100%', height: '100%' }} source={{uri : profileImage}} />
                        }
                        
                        <SetBtn><Image style={{ width: '100%', height: '100%' }} source={require('../../images/ico-SetBtn.png')} /></SetBtn>
                    </ProfileSetBox>
                    <InfoText>이메일</InfoText>
                    <TextInput editable={false}>
                            {user != null && user.email_id != null && user.email_id != "null" ? user.email_id : ""}
                    </TextInput>

                    <InfoText>닉네임</InfoText>
                    <NicknameBox>
                        <Nickname onChangeText={ (text) => setUser({...user, nickname:text})}>{user != null && user.nickname != null ? user.nickname : ""}</Nickname>
                        <TouchableOpacity onPress={checkNickname}>
                            <CheckBtn>중복확인</CheckBtn>
                        </TouchableOpacity>
                    </NicknameBox>
                        <TitBox>
                            <InfoText>핸드폰 번호 </InfoText>
                            <ErrorMessage style={{ marginTop: 0 }}>
                                <ErrorMessageIcon><Image style={{ width: '100%', height: '100%' }} source={require('../../images/ico-Warning.png')}/></ErrorMessageIcon>
                                <View style={{width: 5}}></View>
                                <Text style={{fontSize: 12, fontWeight: '400', color: '#E63312' }}>AI 레포트 이용시 필수</Text>
                            </ErrorMessage>
                        </TitBox>
                        <NicknameBox style={{ marginBottom: 12 }}>
                        <Nickname placeholder="직접입력" placeholderTextColor="#ccc" onChangeText={(text) => setUser({...user, phone : text})}   
                        keyboardType = 'numeric' maxLength={11}>
                            {user != null && user.phone != null && user.phone != "null" ? user.phone : ""}
                        </Nickname>
                        {
                            
                            (!verify) ?
                            <TouchableOpacity onPress={checkPhoneAlert}>
                                <CheckBtn>번호 인증</CheckBtn>
                            </TouchableOpacity>
                            : <TouchableOpacity onPress={() => {RN.Alert.alert('인증번호를 확인해주세요.')}}>
                                <CheckBtn>번호 인증</CheckBtn>
                            </TouchableOpacity>
                            
                        }
                        </NicknameBox>                    
                           {
                            (verify) ?
                            <>
                                <NicknameBox>
                                <Nickname placeholder="번호입력하세요" placeholderTextColor="#ccc"
                                onChangeText={(text) => setUser({...user, verify_code : text})}   
                                keyboardType = 'numeric'
                                ></Nickname>
                                <TouchableOpacity onPress={checkPhoneVerify}>
                                    <CheckBtn style={{ backgroundColor:"#DADADA", color:"#666" }}>인증확인</CheckBtn>
                                </TouchableOpacity>
                                </NicknameBox>
                            </>
                            : null
                           } 
                        
                        <InfoText>평균 타수</InfoText>
                        <SelectDropdown
                            data={scoreList}
                            onSelect={(selectedItem, index) => {
                                setUser({...user, average_score : selectedItem})
                                console.log("평균 타수 changed");
                            }}
                            defaultValue={user != null &&  user.average_score != null ? user.average_score : ""}
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

                        <InfoText>구력</InfoText>
                        <SelectDropdown
                            data={careerList}
                            defaultValue={user != null &&  user.career != null ? user.career : ""}
                            onSelect={(selectedItem, index) => {
                                setUser({...user, career : selectedItem})
                                console.log("구력 changed")
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

                        <InfoText>드라이버 평균 비거리</InfoText>
                        <TextInput placeholder="직접입력" placeholderTextColor="#ccc" onChangeText={(text) => setUser({...user, driver_distance : text})}
                        keyboardType = 'numeric' maxLength={15}>
                            {user != null && user.driver_distance != null && user.driver_distance != "null" ? user.driver_distance : ""}
                        </TextInput>                

                        <InfoText>7번 아이언 평균 비거리</InfoText>
                        <TextInput placeholder="직접입력" placeholderTextColor="#ccc" onChangeText={(text) => setUser({...user, iron_distance : text})}   
                        keyboardType = 'numeric' maxLength={15}>
                            {user != null && user.iron_distance != null && user.iron_distance != "null" ? user.iron_distance : ""}
                        </TextInput>                

                        <InfoText>태어난 해</InfoText>
                        <SelectDropdown
                            data={yearList}
                            defaultValue={user != null && user.birth != null ? user.birth : ""}
                            onSelect={(selectedItem, index) => {
                                setUser({...user, birth : selectedItem});
                                console.log("태어난 해 changed");
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

                        <InfoText>성별</InfoText>
                        <SelectDropdown
                            data={genderList}
                            defaultValue={user != null && user.gender != null ? user.gender : ""}
                            onSelect={(selectedItem, index) => {
                                setUser({...user, gender : selectedItem});
                                console.log("gender changed");
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
                        <InfoText>지역</InfoText>
                        <SelectDropdown 
                            data={Object.keys(sigungu)}
                            defaultValue={user != null && user.sido != "" ? user.sido : sido}
                            onSelect={(selectedItem, index) => {
                                setUser({...user, sido: selectedItem, sigungu: ""})
                                setSido(selectedItem);
                                console.log("sido changed");
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
                        {
                            user != null && user.sido != null && user.sido != '' ?
                            <>
                                <InfoText>시도</InfoText>
                                <SelectDropdown 
                                    data={user != null && user.sido != null ? sigungu[user.sido] : ""}
                                    defaultValue={user != null && user.sigungu != "" ? user.sigungu : sigungu[user.sido][0]}
                                    onSelect={(selectedItem, index) => {
                                        setUser({...user, sigungu: selectedItem})
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
                            </>
                            : null
                        }
                        <TouchableOpacity onPress={updateProfile}>
                            <UpdateButton agree={true} style={{ borderRadius: 12, elevation: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 }} >변경내용 저장</UpdateButton>
                        </TouchableOpacity>
                    </RN.ScrollView>
                </InfoSetWrap>
            </CommonBackground>
            </>
        );
    } else {
        return null;
    }
};


const styles = RN.StyleSheet.create({ // picker Style(selectBox)
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

  const ProfileSetBox = styled.TouchableOpacity`
        position: relative;
        width: 67px;
        height: 66px;
        margin-bottom: 40px;
    `
    const ProfileImg = styled.Image`
        position: absolute;
        top: 0;
        left: 0;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        overflow: hidden;
    `
    const SetBtn = styled.View`
        position: absolute;
        bottom: 0;
        right: 0;
        width: 24px;
        height: 24px;
    `
    const TitBox = styled.View`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `
    

export default Profile;
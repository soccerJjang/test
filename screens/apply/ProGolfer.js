import * as React from 'react';
import * as RN from 'react-native';
import { View } from 'react-native';
import styled from "styled-components";
import { 
    CommonBackground,
    CommonContainer4,
    TitLarge,
    CheckBtn,
    PageButtonScr,
    PageBtnText,
    DimBox,
    LayerBox,
    LayerConBox,
    LayerGreenBt,
    FontSize16,
    CenterText
} from '../../styled-components/Common';
import SelectDropdown from 'react-native-select-dropdown';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { lessonPro } from '../../api/lessonPro';
import { useNavigation } from '@react-navigation/native';



const ProGolfer = () => {    
    // picker data(select box)
    const genderList = ["남성", "여성"];
    const gradeList = ["일반", "세미", "프로", "기타"];
    const career = ["5년 이하", "10년 이하", "15년 이하", "15년 이상"];
    const quality = ["슬라이스", "훅", "그립잡기", "어드레스", "테이크 어웨이", "백스윙", "임팩트", "피니쉬", "스윙", "템포", "비거리", "모름"];

    const refCont = React.useRef();
    const navigation = useNavigation();

    const [user, setUser] = React.useState();
    const [name, setName] = React.useState();
    const [gender, setGender] = React.useState();
    const [grade, setGrade] = React.useState();
    const [period, setPeriod] = React.useState();
    const [awards, setAwards] = React.useState();
    const [point01, setPoint01] = React.useState();
    const [point02, setPoint02] = React.useState();
    const [point03, setPoint03] = React.useState();
    const [area, setArea] = React.useState();
    const [youtube, setYoutube] = React.useState();
    const [instagram, setInstagram] = React.useState();

    const [activityPhotos, setActivityPhotos] = React.useState([]);
    const [movies, setMovies] = React.useState([]);
    const [movies2, setMovies2] = React.useState([]);
    const [profilePhoto, setProfilePhoto] = React.useState([]);

    const getUserData = async() => {
        let userData = null;
        userData = await SecureStore.getItemAsync("userData"); 
        
        if(userData) {
            userData = JSON.parse(userData);
            setUser(userData);        
        }else {
            navigation.navigate("Login");
        }
    };

    const uploadFile = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: false,
            allowsEditing: false,
            aspect: [4,3],
            quality: 1
        });

        
        if(!result.cancelled) {
            
            if(type == 'activityPhotos') {
                console.log("Check activityPhotos");
                console.log(result);
            
                let uploadArray = [...activityPhotos];
                //uploadArray.push(result.base64);
                uploadArray.push(result.uri);
                setActivityPhotos(uploadArray);

            }else if(type == 'movies') {

                if(result.type == 'video') {
                    console.log("Check movies");
                    console.log(result);
    
                    let uploadArray = [...movies];
                    uploadArray.push(result.uri);
                    //uploadArray.push(result);
                    setMovies(uploadArray);
                }else {
                    RN.Alert.alert("동영상 파일만 업로드 가능합니다.");
                }

            }else if(type == 'movies2') {

                if(result.type == 'video') {
                    console.log("Check movies");
                    console.log(result);
    
                    let uploadArray = [...movies2];
                    uploadArray.push(result.uri);
                    //uploadArray.push(result);
                    setMovies2(uploadArray);
                }else {
                    RN.Alert.alert("동영상 파일만 업로드 가능합니다.");
                }


            }else if(type == 'profilePhoto') {                
                console.log("Check profilePhoto");
                console.log(result);

                let uploadArray = [...profilePhoto];
                uploadArray.push(result.uri);
                //uploadArray.push(result);
                setProfilePhoto(uploadArray);
            }        
        }

    };

    const deleteFile = (type, fileIdx) => {
    
        if(type == 'activityPhotos') {
            let deletedArray = [...activityPhotos];
                deletedArray.splice(fileIdx, 1);            
            setActivityPhotos(deletedArray);
    
        }else if(type == 'movies') {
            let deletedArray = [...movies];
                deletedArray.splice(fileIdx, 1);
            setMovies(deletedArray);
    
        }else if(type == 'profilePhoto') { 
            let deletedArray = [...profilePhoto];
                deletedArray.splice(fileIdx, 1);
            setProfilePhoto(deletedArray);               
        }
    }

    const goSubmit = async () => {        

        const applicationInfo = {userNo : user.user_no, name, gender, grade, period, awards, point01, point02, point03, 
            area, youtube, instagram, activityPhotos, movies, movies2, profilePhoto}

        if(name == null || name == '') {
            RN.Alert.alert("이름을 입력해 주세요");
            return false;
        }else if(gender == null || gender == '') {
            RN.Alert.alert("성별을 선택해 주세요");
            return false;
        // }else if(grade == null || grade == '') {
        //     RN.Alert.alert("신청등급을 선택해 주세요");
        //     return false;
        }else if(period == null || period == '') {
            RN.Alert.alert("레슨경력을 선택해 주세요");
            return false;
        }else if(awards == null || awards == '') {
            RN.Alert.alert("수상경력(전문학위)를 입력 해주세요");
            return false;
        }else if(point01 == null || point01 == '') {
            RN.Alert.alert("첫번째 레슨 전문 분야를 선택해 주세요");
            return false;
        }else if(point02 == null || point02 == '') {
            RN.Alert.alert("두번째 레슨 전문 분야를 선택해 주세요");
            return false;
        }else if(point03 == null || point03 == '') {
            RN.Alert.alert("세번째 레슨 전문 분야를 입력해 주세요");
            return false;
        }else if(area == null || area == '') {
            RN.Alert.alert("활동지역을 입력해 주세요");
            return false;
        }else if(activityPhotos.length == 0) {
            RN.Alert.alert("활동사진을 업로드해 주세요");
            return false;
        }else if(movies.length == 0) {
            RN.Alert.alert("정면 동영상을 업로드해 주세요");
            return false;
        }else if(movies2.length == 0) {
            RN.Alert.alert("측면 동영상을 업로드해 주세요");
            return false;
        }else if(profilePhoto.length == 0) {
            RN.Alert.alert("프로필 사진을 업로드해 주세요");
            return false;
        /*
        }else if(youtube == null || youtube == '') {
            RN.Alert.alert("유튜브 링크를 입력해 주세요");
            return false;
        }else if(instagram == null || instagram == '') {
            RN.Alert.alert("인스타그램 링크를 입력해 주세요");
            return false;
        */
        }
        if(youtube == null || youtube == '') {
            applicationInfo.youtube = "";
        }
        if(instagram == null || instagram == '') {
            applicationInfo.instagram = "";
        }

        const result = await lessonPro.sendApplication(applicationInfo);
        console.log(result);
    
        if(result.success){
            RN.Alert.alert(
                "신청이 완료되었습니다.",
                "관리자 승인후 활동이 가능합니다.",
                [
                  {
                    text: "취소",
                    onPress: () => console.log("cancel Pressed!!"),
                    style: "cancel"
                  },
                  { text: "돌아가기", onPress: () => {
                    navigation.navigate("LessonProList")
                  }}
                ]
            );         
        }else if(result.reason == 'duplicate'){
    
            RN.Alert.alert(
                "이미 신청한 사용자입니다.",
                "",
                [
                  {
                    text: "취소",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "돌아가기", onPress: () => navigation.navigate("LessonProList") }
                ]
            );
        } else {
    
            RN.Alert.alert(
                "일시적인 오류 입니다. 잠시후에 다시 시도해주시기 바랍니다.",
                "",
                [
                  {
                    text: "취소",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "돌아가기", onPress: () => navigation.navigate("LessonProList") }
                ]
            );

        }
    }

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

    return (
        <>
            <CommonBackground>
                <CommonContainer4>
                    <TitLarge style={{ marginBottom: 15 }}>레슨 프로</TitLarge>
                    <InfoText>이름</InfoText>
                    <TextInput value={name} onChangeText={(text) => {setName(text)}}></TextInput>
                    <InfoText>성별</InfoText>
                    <SelectDropdown
                        data={genderList}
                        onSelect={() => {}}
                        defaultButtonText={'선택'}
                        buttonTextAfterSelection={(selectedItem, index) => {

                            setGender(selectedItem);
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
                    {/* <InfoText>신청등급</InfoText>
                    <SelectDropdown
                        data={gradeList}
                        onSelect={() => {}}
                        defaultButtonText={'선택'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            setGrade(selectedItem);
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
                    /> */}
                    <InfoText>레슨경력</InfoText>
                    <SelectDropdown
                        data={career}
                        onSelect={() => {}}
                        defaultButtonText={'선택'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            setPeriod(selectedItem);
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
                    <InfoText>수상경력(전문학위)</InfoText>                
                    <TextInput style={{ textAlignVertical: "top", height: 150}} placeholder="내용" placeholderTextColor="#ccc" onChangeText={(text)=>setAwards(text)}                    
                        value={awards}
                        multiline = {true}
                        numberOfLines = {4}
                        underlineColorAndroid="transparent"
                    ></TextInput>
                    <InfoText>레슨 전문 분야</InfoText>                
                    <SelectDropdown
                        data={quality}
                        onSelect={() => {}}
                        defaultButtonText={'선택'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            setPoint01(selectedItem);
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        buttonStyle={styles.dropdown2BtnStyle}
                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                        renderDropdownIcon={isOpened => {                                                            
                            return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} color={'#444'} size={13} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                    <SelectDropdown
                        data={quality}
                        onSelect={() => {}}
                        defaultButtonText={'선택'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            setPoint02(selectedItem);
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        buttonStyle={styles.dropdown2BtnStyle}
                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                        renderDropdownIcon={isOpened => {                                                            
                            return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} color={'#444'} size={13} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                    <TextInput style={{ textAlignVertical: "top", height: 150}} placeholder="내용" placeholderTextColor="#ccc" onChangeText={(text)=>setPoint03(text)}                
                        value={point03}
                        multiline = {true}
                        numberOfLines = {4}
                        underlineColorAndroid="transparent"
                    ></TextInput>
                    <InfoText>활동지역</InfoText>                
                    <TextInput style={{ textAlignVertical: "top", height: 150}} placeholder="내용" placeholderTextColor="#ccc" onChangeText={(text)=>setArea(text)}                
                        value={area}
                        multiline = {true}
                        numberOfLines = {4}
                        underlineColorAndroid="transparent"
                    ></TextInput>

                    <InfoText>활동사진</InfoText>    
                    
                    <TouchableOpacity onPress={()=>{uploadFile("activityPhotos")}} style={{width: '100%', marginBottom:24}}>                        
                        <CheckBtn blueBtn>찾아보기</CheckBtn>
                    </TouchableOpacity>        
                    

                    {
                        activityPhotos.length > 0 ?
                        activityPhotos.map((item,idx) => {
                            return(                            
                                <FileView>
                                    <FileInfoText>{item.substring(item.lastIndexOf("/") + 1, item.length)}</FileInfoText>
                                    <RN.View style={{width: 20}}/>
                                    <TouchableOpacity onPress={()=>{deleteFile("activityPhotos", idx)}}><RN.Text>제거</RN.Text></TouchableOpacity>
                                </FileView>                                                            
                            )
                        })
                        :
                        null
                    }
                
                    <InfoText style={activityPhotos.length > 0 ? {marginTop:24} : {}}>정면 동영상</InfoText>    
                    
                        <TouchableOpacity onPress={()=>{uploadFile("movies")}} style={{width: '100%', marginBottom:24}}>                        
                            <CheckBtn blueBtn>찾아보기</CheckBtn>
                        </TouchableOpacity>                                          

                    {
                        movies.length > 0 ?
                        movies.map((item,idx) => {
                            return(
                                <FileView>
                                    <FileInfoText>{item.substring(item.lastIndexOf("/") + 1, item.length)}</FileInfoText>
                                    <RN.View style={{width: 20}}/>
                                    <TouchableOpacity onPress={()=>{deleteFile("movies", idx)}}><RN.Text>제거</RN.Text></TouchableOpacity>
                                </FileView>
                            )
                        })
                        :
                        null
                    }
                
                    <InfoText style={activityPhotos.length > 0 ? {marginTop:24} : {}}>측면 동영상</InfoText>    
                    
                        <TouchableOpacity onPress={()=>{uploadFile("movies2")}} style={{width: '100%', marginBottom:24}}>                        
                            <CheckBtn blueBtn>찾아보기</CheckBtn>
                        </TouchableOpacity>                                          

                    {
                        movies2.length > 0 ?
                        movies2.map((item,idx) => {
                            return(
                                <FileView>
                                    <FileInfoText>{item.substring(item.lastIndexOf("/") + 1, item.length)}</FileInfoText>
                                    <RN.View style={{width: 20}}/>
                                    <TouchableOpacity onPress={()=>{deleteFile("movies2", idx)}}><RN.Text>제거</RN.Text></TouchableOpacity>
                                </FileView>
                            )
                        })
                        :
                        null
                    }

                    <InfoText style={movies.length > 0 ? {marginTop:24} : {}}>프로필 사진</InfoText>    
                    <TouchableOpacity onPress={()=>{uploadFile("profilePhoto")}} style={{width: '100%', marginBottom:24}}>                    
                        <CheckBtn blueBtn>찾아보기</CheckBtn>
                    </TouchableOpacity> 

                    {
                        profilePhoto.length > 0 ?
                        profilePhoto.map((item,idx) => {
                            return(
                                <FileView>
                                    <FileInfoText>{item.substring(item.lastIndexOf("/") + 1, item.length)}</FileInfoText>
                                    <RN.View style={{width: 20}}/>
                                    <TouchableOpacity onPress={()=>{deleteFile("profilePhoto", idx)}}><RN.Text>제거</RN.Text></TouchableOpacity>
                                </FileView>
                            )
                        })
                        :
                        null
                    }

                    <InfoText style={profilePhoto.length > 0 ? {marginTop:24} : {}}>유튜브 링크</InfoText>
                    <TextInput value={youtube} onChangeText={(text) => setYoutube(text)}></TextInput>
                    <InfoText>인스타그램 링크</InfoText>
                    <TextInput value={instagram} onChangeText={(text) => setInstagram(text)}></TextInput>    
                    <View style={{marginBottom: 20}}>
                        <PageButtonScr onPress={goSubmit} enabled><PageBtnText>승인요청</PageBtnText></PageButtonScr>                          
                    </View>
                </CommonContainer4>
            </CommonBackground>

            <DimBox style={{display:"none"}}> 
                <LayerBox>
                    <LayerConBox style={{ marginTop: 15 }}><CenterText>관리자에게 승인신청이 {"\n"} 완료 되었습니다.</CenterText></LayerConBox>
                    <LayerGreenBt><FontSize16 style={{ fontWeight: "400" }}>확인</FontSize16></LayerGreenBt>
                </LayerBox>   
            </DimBox>
        </>
    )
};

const styles = RN.StyleSheet.create({ // picker Style(selectBox)
    dropdown1BtnStyle: {
        width: '100%',
        height: 52,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EBEBEB',
        marginBottom: 24
    },
    dropdown2BtnStyle: {
        width: '100%',
        height: 52,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EBEBEB',
        marginBottom: 20
    },
    dropdown1BtnTxtStyle: {color: '#666666', textAlign: 'left', fontWeight: "400"},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF',borderRadius: 8},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});

const InfoText = styled.Text`
    margin-bottom: 9px;
    font-size: 14px;
    font-weight: 500;
    color: #1E1E1E;
`
const TextInput = styled.TextInput`
    position: relative;
    width: 100%;
    height: 52px;
    margin-bottom: 24px;
    padding: 14px 18px;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
    font-size: 16px;
    color: #000;
`
const TextInputArea = styled.TextInput`
    position: relative;
    width: 100%;
    height: 52px;
    margin-bottom: 16px;
    padding: 14px 18px;
    border: 1px solid #EBEBEB;
    border-radius: 6px;
    font-size: 16px;
    color: #000;
`

const FileView = styled.View`
    display: flex;
    flex-direction: row;
`;
const FileInfoText = styled.Text`

`


export default ProGolfer;
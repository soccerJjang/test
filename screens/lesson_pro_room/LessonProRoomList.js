import React, { useEffect } from 'react';
import * as RN from 'react-native';
import { View } from 'react-native';
import styled from "styled-components";
import { CheckBtn, InfoText, Nickname, NicknameBox, TextInput, UpdateButton, InfoSetWrap } from '../../styled-components/lesson_room/LessonProList';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { lessonPro } from '../../api/lessonPro';
import { 
    CommonBackground,
    CommonContainer4,
    TitLarge,
    PageButtonOn,
    PageBtnText
 } from '../../styled-components/Common';
 import { lessonRoomApi } from '../../api/lessonRoom';

const LessonProRoomList = ( props ) => {   
    const [user, setUser] = React.useState(props.route.params.user);
    const [lessonType, setLessonType] = React.useState("전체");
    // const [lessonList, setLessonList] = React.useState([{key: "1", title:"1", state:true, img:'!', tag:["a","b"]},{key: "2", title:"1", state:false, img:'!', tag:["a","b"]},{key: "3", title:"1", state:true, img:'!', tag:["a","b"]}]);
    const [lessonList, setLessonList] = React.useState([]);
    // const [lessonProList, setLessonProList] = React.useState(null);
    
    let lessonTypeList = ["전체", "슬라이스", "훅", "그립잡기", "어드레스" , "테이크 어웨이", "백스윙", "임팩트", "피니쉬", "스윙템포", "비거리", "모름"];

    const navigation = props.navigation;

    useEffect(()=> {
        (async () => {
            let list = []
            list = await lessonRoomApi.selectLessonList({userNo: 404})
            console.log(list,"list")
            setLessonList(list)
        })();
        return(()=>{})
    },[])

    return (
        <CommonBackground>
            <CommonContainer4TopScale />
            <SelectDropdownContainer>
                <SelectDropdown
                    data={lessonTypeList}
                    defaultValue={lessonType != null  ? lessonType : ""}
                    onSelect={(selectedItem, index) => {
                        setLessonType(selectedItem);
                        console.log("lesson type changed");
                    }}
                    defaultButtonText={'전체'}
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
            </SelectDropdownContainer>
            <CommonContainer4 style={styles.CommonContainer4}>
                {
                    lessonList ?
                        lessonList.map((data, index)=>{
                            const {key, title, state, img, lessonArea, seq, userNo} = data
                            return(
                                <>
                                    {
                                        lessonType === "전체" ?
                                            <LessonListBtnContainer key={key}
                                                onPress={()=>navigation.navigate("LessonRoomDetail", { seq: seq, userNo: userNo, index: index })}
                                            >
                                                <View style={{flexDirection:'row'}}>
                                                    <Title>{`${index+1}회차 레슨`}</Title>
                                                    {/* <Title>{title}</Title> */}
                                                    {
                                                        state ?
                                                            <OkState><OkStateText>답변완료</OkStateText></OkState>
                                                        :
                                                            <WaitState><WaitStateText>답변대기</WaitStateText></WaitState>
                                                    }
                                                </View>
                                                <ImageContainer>
                                                    
                                                </ImageContainer>
                                                <View style={{flexDirection:'row', marginLeft: 20}}>
                                                    {
                                                        lessonArea?.split(",")?.length === 1 ?
                                                            <TagContainer><TagContainerText>{lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                                        : lessonArea?.split(",")?.length === 2 ?
                                                            <>
                                                                <TagContainer><TagContainerText>{lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                                                <TagContainer><TagContainerText>{lessonArea.split(",")[1]}</TagContainerText></TagContainer>
                                                            </>
                                                        :
                                                            null
                                                    }
                                                </View>
                                            </LessonListBtnContainer>
                                        :
                                            lessonArea.split(",").length === 1 ?
                                                lessonArea.split(",")[0] === lessonType ?
                                                    <LessonListBtnContainer key={key}
                                                        onPress={()=>navigation.navigate("LessonRoomDetail", { seq: seq, userNo: userNo, index: index })}
                                                    >
                                                        <View style={{flexDirection:'row'}}>
                                                            <Title>{title}</Title>
                                                            {
                                                                state ?
                                                                    <OkState><OkStateText>답변완료</OkStateText></OkState>
                                                                :
                                                                    <WaitState><WaitStateText>답변대기</WaitStateText></WaitState>
                                                            }
                                                        </View>
                                                        <ImageContainer>
                                                            
                                                        </ImageContainer>
                                                        <View style={{flexDirection:'row', marginLeft: 20}}>
                                                            {
                                                                lessonArea.split(",").length === 1 ?
                                                                    <TagContainer><TagContainerText>{lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                                                : lessonArea.split(",").length === 2 ?
                                                                    <>
                                                                        <TagContainer><TagContainerText>{lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                                                        <TagContainer><TagContainerText>{lessonArea.split(",")[1]}</TagContainerText></TagContainer>
                                                                    </>
                                                                :
                                                                    null
                                                            }
                                                        </View>
                                                    </LessonListBtnContainer>
                                                :
                                                    null
                                            : lessonArea.split(",").length === 2 ?
                                                lessonArea.split(",")[0] === lessonType ?
                                                    <LessonListBtnContainer key={key}
                                                        onPress={()=>navigation.navigate("LessonRoomDetail", { seq: seq, userNo: userNo, index: index })}
                                                    >
                                                        <View style={{flexDirection:'row'}}>
                                                            <Title>{title}</Title>
                                                            {
                                                                state ?
                                                                    <OkState><OkStateText>답변완료</OkStateText></OkState>
                                                                :
                                                                    <WaitState><WaitStateText>답변대기</WaitStateText></WaitState>
                                                            }
                                                        </View>
                                                        <ImageContainer>
                                                            
                                                        </ImageContainer>
                                                        <View style={{flexDirection:'row', marginLeft: 20}}>
                                                            {
                                                                lessonArea.split(",").length === 1 ?
                                                                    <TagContainer><TagContainerText>{lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                                                : lessonArea.split(",").length === 2 ?
                                                                    <>
                                                                        <TagContainer><TagContainerText>{lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                                                        <TagContainer><TagContainerText>{lessonArea.split(",")[1]}</TagContainerText></TagContainer>
                                                                    </>
                                                                :
                                                                    null
                                                            }
                                                        </View>
                                                    </LessonListBtnContainer>
                                                : lessonArea.split(",")[1] === lessonType ?
                                                    <LessonListBtnContainer key={key}
                                                        onPress={()=>navigation.navigate("LessonRoomDetail", { seq: seq, userNo: userNo, index: index })}
                                                    >
                                                        <View style={{flexDirection:'row'}}>
                                                            <Title>{title}</Title>
                                                            {
                                                                state ?
                                                                    <OkState><OkStateText>답변완료</OkStateText></OkState>
                                                                :
                                                                    <WaitState><WaitStateText>답변대기</WaitStateText></WaitState>
                                                            }
                                                        </View>
                                                        <ImageContainer>
                                                            
                                                        </ImageContainer>
                                                        <View style={{flexDirection:'row', marginLeft: 20}}>
                                                            {
                                                                lessonArea.split(",").length === 1 ?
                                                                    <TagContainer><TagContainerText>{lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                                                : lessonArea.split(",").length === 2 ?
                                                                    <>
                                                                        <TagContainer><TagContainerText>{lessonArea.split(",")[0]}</TagContainerText></TagContainer>
                                                                        <TagContainer><TagContainerText>{lessonArea.split(",")[1]}</TagContainerText></TagContainer>
                                                                    </>
                                                                :
                                                                    null
                                                            }
                                                        </View>
                                                    </LessonListBtnContainer>
                                                :
                                                    null
                                            :
                                                null
                                    }
                                </>
                            )
                        })
                    :
                        null
                }
                <CommonContainer4BottomScale />
            </CommonContainer4>
            <View style={{backgroundColor: 'white', height: 85}}>
                <PageButtonOn onPress={()=>navigation.navigate("LessonRoomRegist")}><PageBtnText>레슨 신청하기</PageBtnText></PageButtonOn>                          
            </View>
        </CommonBackground>      
    )
}

const styles = RN.StyleSheet.create({ // picker Style(selectBox)
    CommonContainer4: {
        paddingTop: 100,
        zIndex: 0
    },
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
const CommonContainer4TopScale = styled.View`
    position: absolute;
    width: 100%;
    height: 75px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    backgroundColor: #FFFFFF;
    zIndex: 1;
`

const SelectDropdownContainer = styled.View`
    position: absolute;
    width: 100%;
    top: 20px;
    paddingHorizontal: 20px;
    zIndex: 2;
`
const Title = styled.Text`
    height: 20px;
    marginLeft: 20px;
    marginTop: 15px;

    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
`
const OkState = styled.View`
    width: 65px;
    height: 20px;
    left: 10px;
    marginTop: 15px;
    background: #000000;
    borderRadius: 50px;
    justifyContent: center;
    alignItems: center
`

const OkStateText = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #FFFFFF;
`

const WaitState = styled.View`
    width: 65px;
    height: 20px;
    left: 10px;
    marginTop: 15px;
    background: #B0B0B0;
    borderRadius: 50px;
    justifyContent: center;
    alignItems: center
`

const WaitStateText = styled.Text`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #FFFFFF;
`

const ImageContainer = styled.Image`
    
    height: 150px;
    marginHorizontal: 20px;
    marginTop: 15px;
    border-radius: 12px;
    background: #d0d0d0
`

const TagContainer = styled.View`
    
    height: 22px;
    marginRight: 10px;
    marginTop: 15px;
    padding: 4px 10px;
    background: #E63312;
    border-radius: 3px;
`

const TagContainerText = styled.Text`
    color: #ffffff
`

const CommonContainer4BottomScale = styled.View`
    height: 100px;
`

const LessonListBtnContainer = styled.TouchableOpacity`
    width: 100%;
    height: 252px;
    marginBottom: 20px;
    
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
`

export default LessonProRoomList;
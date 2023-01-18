import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
    CommonBackground, GettingReady, 
} from '../../styled-components/Common';
import {
    AnalysisContainer,
    AnalysisBoxView,
    BoxTopView,
    BoxBottomView,
    AnalysisTouchView,
    ImageBox,
    Border,
    BottomText,
    ScoreBox,
    Score,
    ScoreDate,
    ScoreIcon,
    IcoStar,
    IcoPlus,
    FilterBox,
    AnalysisTouchText,
} from '../../styled-components/analysis_list/AnalysisList';
import * as SecureStore from 'expo-secure-store';
import MainList from '../../components/MainList';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import styled from "styled-components";
import { article } from '../../api/article';
import SwitchSelector from "react-native-switch-selector";

const AnalysisList = ({navigation}) => {
    const route = useRoute();
    const [userData, setUserData] = React.useState(null); 
    const [proCardBoxList, setProCardBoxList] = React.useState(null);    
    const options = [
        { label: "FRONT", value: "FRONT" },
        { label: "REAR", value: "REAR" },
    ];
    const options2 = [        
        { label: "DRIVER", value: "DRIVER" },
        { label: "IRON", value: "IRON" },
    ];
    const options3 = [
        { label: "날짜별", value: "날짜순" },
        { label: "점수순", value: "점수순" },
    ];

    const [analysisList, setAnalysisList] = React.useState([]);
    const [sortList, setSortList] = React.useState([]); 
    const [delCheckList, setDelCheckList] = React.useState([]);
    const [allSelect, setAllSelect] = React.useState(false);
    const [isChecked, setChecked] = React.useState(route.params != null && route.params.isChecked != undefined ? route.params.isChecked : [true,false,true,false,true,false]);
    
    React.useEffect(async() => {
        let getUserData = await SecureStore.getItemAsync('userData').then();
        setUserData(JSON.parse(getUserData));
        getUserData = JSON.parse(getUserData);
        if(getUserData) {
            
            const analysisData = await fetch(`http://223.130.132.180:5008/article/analysisList?userNo=${getUserData.user_no}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then((json) => {
                setAnalysisList(json);

                if(route.params != null && route.params.isChecked != undefined) {
                    changeIsChecked(route.params.isChecked, json);
                } else {
                    setSortList(json);
                    // 초기 체크박스 값 설정
                    let delList = new Array();
                    json.map((item, idx) => {
                        delList.push(false);
                    })

                    setDelCheckList(delList); 
                }
                             
                return json;
            })
            
            if(analysisData.length > 0) {
                let proBoxList = new Array();
                analysisData.map((item,idx) => {        
                    // 프로카드 박스 데이터 구하기 0711                        
                    if(item.procard_confirm == 'Y' && item.get_procard == 'Y') {
                        proBoxList.push( new Object({
                            "near_percentage" : item.near_percentage,
                            "nearest_pro_name" : item.nearest_pro_name,
                            "photo" : item.photo
                        }));
                    }
                });

                setProCardBoxList(proBoxList);                    
            }
        }   
    }, [])
    
    const selectAnalysisList = () => {
        // 전체보기 초기 데이터 값으로 세팅      
        setSortList([...analysisList]);
        setChecked([true,false,true,false,true,false]); // 스위치 변환은 안 되는 듯 ..
        setAllSelect(false);
        let delList = new Array();
        analysisList.map((item, idx) => {
            delList.push(false);
        })

        setDelCheckList(delList); 
    };

    const changeCheckBox = (index) => {

        let beforeArray = [...isChecked];
                            
        if(index <2) { // Front/Rear
            beforeArray.map((item, idx) => {
                if(idx == index){
                    beforeArray[index] = true;
                }
                if(idx < 2 && idx != index){                
                    beforeArray[idx] = false;
                }                                                
            });            

        }else if(index < 4){ // Iron/Driver
            beforeArray.map((item, idx) => {
                if(idx == index){                    
                    beforeArray[index] = true;
                }
                if(1 < idx && idx < 4 &&  idx != index ){
                    beforeArray[idx] = false;
                }                                                
            });                        
        }else if(index < 6) { // Score/Date
            beforeArray.map((item, idx) => {
                if(idx == index){
                    beforeArray[index] = true;
                }
                if(3 < idx && idx <6 && idx != index){
                    beforeArray[idx] = false;
                }                                                
            });            
        }
        
        setChecked(beforeArray);
        changeIsChecked(beforeArray, analysisList); // 체크 상태, 전체 목록
       
    }
    
    const changeIsChecked = (beforeChecked, sortData) => {
        let type = "";

        // type 만들기 
        if(beforeChecked[0]) {
            type = "F";
        }else if(beforeChecked[1]) {
            type = "R";
        }    

        if(beforeChecked[2]){
            type += "D"
        }else if(beforeChecked[3]) {
            type += "I"
        }
        
        // 날짜순인지 점수순인지 구하기 
        let sortType = "";
        if(beforeChecked[4]) {
            sortType = "date";            
        }else if(beforeChecked[5]){
            sortType = "score";            
        }else {
            sortType = "date";
        }
         
        let typeScore = [...sortData];
        
        // 타입 일치 목록
        typeScore = typeScore.reduce((acc, cur, idx) => {
            if(cur.type == type) {
                acc.push(cur);
            }
            return acc;
        }, []);
        
        // DB date DESC 기본 정렬
        if(sortType == 'date') {
          
        } else if(sortType == 'score') {
            typeScore = typeScore.sort((a,b) => {
                let aToCm = a.total_score_comment;
                let bToCm = b.total_score_comment;
                aToCm = JSON.parse(aToCm);
                bToCm = JSON.parse(bToCm);
                if(aToCm[1] > bToCm[1]) return -1; 
                if(aToCm[1] === bToCm[1]) return 0; 
                if(aToCm[1] < bToCm[1]) return 1;
            });
            
        }

        setSortList(typeScore);

        // 데이터 정렬 체크박스 초기 설정
        let delList = new Array();
        typeScore.map((item, idx) => {
            delList.push(false);
        })

        setDelCheckList(delList);
    }

    return (
        <CommonBackground>
            <AnalysisContainer>
                {
                    sortList.length == 0 && !Array.isArray(sortList)? 
                        <GettingReady>
                            <Image style={{ width: 89, height: 89 }} source={ require("../../images/img-gettingReady.png")}/>
                            <Text style={{ marginTop: 26 , color: '#777', fontSize: 20, fontWeight: '700' }}>분석된 데이터가 없습니다.</Text>
                        </GettingReady>  
                    :
                    null                        
                }                
                {userData != null ? 
                    <>  
                    <ScrollView>           
                        <SwitchContainer style={{ marginLeft: 20, marginRight: 20 }}>
                            <SwitchSelector
                                options={options}
                                initial={isChecked[0] ? 0 : 1}
                                onPress={value => { value == 'FRONT' ?  changeCheckBox(0) : changeCheckBox(1); }}
                                backgroundColor={'#171C61'} // 배경색깔
                                buttonColor={'#FFFFFF'}     // 선택된 버튼 색
                                borderColor={'#171C61'}     // 테두리 색                        
                                textColor={'#FFFFFF'}      // 기본 텍스트컬러
                                selectedColor={"#000000"} // 선택된 컬러
                                height={27}
                                buttonMargin= {5}
                                borderRadius={22}
                                fontSize={10}
                                style = {{flex: 1, }}
                                selectedTextContainerStyle={{
                                    border : 1,
                                    borderColor : 'orange'
                                }}
                            />
                            <View style={{width: 10}}/>

                            <SwitchSelector
                                options={options2}
                                initial={isChecked[2] ? 0 : 1}
                                onPress={value => { value == 'DRIVER' ?  changeCheckBox(2) : changeCheckBox(3); }}
                                backgroundColor={'#171C61'} // 배경색깔
                                buttonColor={'#FFFFFF'}     // 선택된 버튼 색
                                borderColor={'#171C61'}     // 테두리 색                        
                                textColor={'#FFFFFF'}      // 기본 텍스트컬러
                                selectedColor={"#000000"} // 선택된 컬러
                                height={27}
                                buttonMargin= {5}
                                borderRadius={22}
                                style = {{flex: 1 }}
                                fontSize={10}
                            />
                            <View style={{width: 10}}/>

                            <SwitchSelector
                                options={options3}
                                initial={isChecked[4] ? 0 : 1}
                                onPress={value => { value == '날짜순' ?  changeCheckBox(4) : changeCheckBox(5); }}
                                backgroundColor={'#171C61'} // 배경색깔
                                buttonColor={'#FFFFFF'}     // 선택된 버튼 색
                                borderColor={'#171C61'}     // 테두리 색                        
                                textColor={'#FFFFFF'}      // 기본 텍스트컬러
                                selectedColor={"#000000"} // 선택된 컬러
                                height={27}
                                buttonMargin= {5}
                                borderRadius={22}
                                style = {{flex: 1}}
                                fontSize={10}                      
                            />
                        </SwitchContainer>

                        <EditBox>

                        <CheckboxCon onPress={()=>{
                             let delList = [...delCheckList];
                             let newList = new Array();
                             delList.map((item,idx) => {
                                 newList.push(!allSelect);
                             })
                             setAllSelect(!allSelect);
                             setDelCheckList(newList);
                        }}>
                            <Checkbox style={styles.checkbox} 
                                    value={allSelect}              
                                    onValueChange={()=> {                                        
                                        let delList = [...delCheckList];
                                        let newList = new Array();
                                        delList.map((item,idx) => {
                                            newList.push(!allSelect);
                                        })
                                        setAllSelect(!allSelect);
                                        setDelCheckList(newList);
                                    }}                                                       
                            />
                            <Text style={styles.paragraph} >전체선택</Text>
                        </CheckboxCon>       
                            {/* <AllChk><View style={{ width: 16, height: 16, borderWidth: 1, borderColor: "#ccc", borderStyle: 'solid', borderRadius: 2, marginRight: 10 }}></View><Text style={{ color: "#060606", fontWeight: "600", fontSize: 16 }}>전체선택</Text></AllChk> */}
                            <View style={{ display: 'flex', flexDirection: 'row' }}><DeletedBt onPress={()=> selectAnalysisList()}><Text style={{ color: "#060606", fontWeight: "600", fontSize: 14 }}>전체보기</Text></DeletedBt>
                            <DeletedBt style={{marginLeft :10}} onPress={async ()=>{
                                    let delList = new Array();
                                    sortList.map((item,idx) => {
                                        if(delCheckList[idx]) {                                    
                                            delList.push({id : item.id, imgPath : item.img_path.replace(/\"/g, "")});
                                        }
                                    });   
                                if(delList.length > 0 ) {
                                    Alert.alert(
                                        "정말 삭제하시겠습니까 ?",
                                        "",
                                        [
                                        {
                                            text: "삭제하기",
                                            onPress: async () => {                                                
                                                const result = await article.deleteAnalysisList(delList);
                                                console.log(delList);
                                                
                                                if(result.message == 'success') {
                                                    navigation.reset({routes: [{name: "AnalysisList", params: {isChecked }}]})
                                                }else {
                                                    Alert.alert("삭제에 실패했습니다.");
                                                }

                                            },
                                            style: "cancel",
                                        },
                                        {
                                            text: "취소",
                                            style: "cancel",
                                        },
                                        ],
                                        {
                                        cancelable: true,
                                        onDismiss: () =>
                                            Alert.alert(
                                            "This alert was dismissed by tapping outside of the alert dialog."
                                            ),
                                        }
                                    );
                                }else {

                                    Alert.alert('선택한 분석이 없습니다.');
                                }
                                                                                          
                            }}>
                            <Text style={{ color: "#060606", fontWeight: "600", fontSize: 14 }}>삭제</Text></DeletedBt></View>
                            
                        </EditBox>
                        <View>
                        {
                            sortList != null && sortList.length > 0 ? 
                            sortList.map((item, idx) => {                                
                                return(
                                    <View key={"AnalysisItme" + idx } >                                        
                                        <Checkbox style={{
                                            width: 16, height: 16, borderWidth: 1, borderColor: "#ccc", borderStyle: 'solid', borderRadius: 2, marginRight: 10,
                                            position: 'absolute', left: 40,  top: 15, zIndex: 1
                                            }} 
                                            value={delCheckList[idx]}
                                            onValueChange={(data)=> {
                                                let newArray = [...delCheckList];
                                                newArray[idx] = !delCheckList[idx];

                                                let cnt = 0;
                                                newArray.map((delItem, delIdx) => {
                                                    if(delItem) cnt++;
                                                });
                                                
                                                if(cnt == newArray.length) {
                                                    setAllSelect(true);
                                                } else {
                                                    setAllSelect(false);
                                                }

                                                setDelCheckList(newArray);
                                            }}                                                       
                                        />                                         
                                        <View style={{zIndex: -9999}}>
                                        <MainList userId={item.id} data={item} proCardBoxList={proCardBoxList} isChecked={isChecked}/>                     
                                        </View>

                                    </View>
                                )
                            })
                            :
                            <GettingReady>
                            <Image  style={{ width: 89, height: 89 }} source={ require("../../images/img-gettingReady.png")}/>
                            <Text style={{ marginTop: 26 , color: '#777', fontSize: 20, fontWeight: '700' }}>분석된 데이터가 없습니다.</Text>
                            </GettingReady> 
                        }           
                        </View>      
                        </ScrollView>
                        <AnalysisTouchView onPress={() => navigation.navigate("AnalysisSwing", {fullData :analysisList})}>
                            <AnalysisTouchText>영상 분석하러 가기</AnalysisTouchText>
                            <IcoPlus source={require('../../images/ico-plus-white.png')}/>                
                        </AnalysisTouchView>
                    </>
                    :
                    <>
                        <AnalysisBoxView onPress = {() => navigation.reset({routes: [{name: 'LoginStack'}]})}>
                            <BoxTopView>
                                <View>
                                    <ScoreBox>
                                        <Score style={{ color: '#A0A0A0' }}>80점</Score>
                                        <View style={{ width: 8 }}></View>
                                        <ScoreDate>22.02.13 14:00</ScoreDate>
                                    </ScoreBox>
                                    <ScoreIcon>
                                        <IcoStar source={require('../../images/ico-stars-gray.png')}/>
                                        <IcoStar source={require('../../images/ico-stars-gray.png')}/>
                                        <IcoStar source={require('../../images/ico-stars-gray.png')}/>
                                        <IcoStar source={require('../../images/ico-stars-gray.png')}/>
                                        <IcoStar source={require('../../images/ico-stars-gray.png')}/>
                                    </ScoreIcon>
                                </View>
                                <View>
                                    <ImageBox/>
                                </View>
                            </BoxTopView>
                            <Border />
                            <BoxBottomView>
                                <BottomText style={{color:"#999", fontSize:14}}>REAR</BottomText>
                                <Text style={{ color: "#EEEEEE" }}>|</Text>
                                <BottomText style={{color:"#999", fontSize:14}}>AI분석결과요청</BottomText>
                            </BoxBottomView>
                            <FilterBox><Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>로그인 후 사용이 가능합니다.</Text></FilterBox>
                        </AnalysisBoxView>                            
                        <AnalysisTouchView onPress = {() => navigation.reset({routes: [{name: 'LoginStack'}]})}>
                            <IcoPlus source={require('../../images/ico-plus-white.png')}/>                
                        </AnalysisTouchView>
                    </>  
                } 
            </AnalysisContainer>
        </CommonBackground>
    )
}

const styles = StyleSheet.create({ // picker Style(selectBox)
    dropdown1BtnStyle: {
      width: '90%',
      height: 52,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#EBEBEB',
      marginLeft : 20,
      marginRight: 20,
      marginBottom: 20
    },
    dropdown1BtnTxtStyle: {color: '#666666', textAlign: 'left', fontWeight: "400"},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF',borderRadius: 8},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32,
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      paragraph: {
        color: "#060606", fontWeight: "600", fontSize: 16
      },
      checkbox: {
        width: 16, height: 16, borderWidth: 1, borderColor: "#ccc", borderStyle: 'solid', borderRadius: 2, marginRight: 10
      },
      itemCheck : {
        width: 16, height: 16, borderWidth: 1, borderColor: "#ccc", borderStyle: 'solid', borderRadius: 2, marginRight: 10,
        position: 'absolute', left: 40, zIndex: 9999, top: 20, elevation: 3
      }
});


const SwitchContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;


const CheckBoxWrap = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 20px 25px 20px;
    padding: 25px 20px;
    border-radius: 12px;
    border: 1px solid #eee;
`;
const CheckboxCon = styled.TouchableOpacity`
    margin: 3px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const EditBox = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 30px 20px;
`;
const AllChk = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const DeletedBt = styled.TouchableOpacity`
    padding: 10px 24px;
    border: 1px solid #EEEEEE;
    border-radius: 6px;
`;

const CheckedSquare = styled.View`
    position: absolute;
    left: 20px;
    top: 20px;
    width: 16px;
    height: 16px;
    border: 1px solid #ccc;
    border-radius: 2px;
`

export default AnalysisList;


// 분석결과 이전 더미데이터 
//{userData != null ? <FlatList  windowSize={1} data={data} keyExtractor={(item) => "Analysist" + item.article_no} renderItem={({item}) => <MainList data={item} />}/>  : null}
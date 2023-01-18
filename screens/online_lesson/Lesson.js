import React from 'react';
import * as RN from 'react-native';
import { View } from 'react-native';
import styled from "styled-components";
import { 
    CommonBackground,
    CommonContainer4,
    CommonBoxWrap,
    TitLarge,
    PageButtonOn,
    PageBtnText
 } from '../../styled-components/Common';
 import SelectDropdown from 'react-native-select-dropdown';
 import { AntDesign } from '@expo/vector-icons'; 

const Lesson = () => {   
    
    const sel = ["전체"];

    return (
        <CommonBackground>
            <CommonContainer4>
                <SelectDropdown
                    data={sel}
                    onSelect={() => {}}
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
                <ProListContainer>
                    <ShadowBoxView
                        style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}
                        onPress={ () => {} }
                        >
                        <CommonBoxWrap>
                            <CommonBoxWrap flexStart>
                                <TitLarge>2회차 레슨</TitLarge>
                                <IconText>답변대기</IconText>
                            </CommonBoxWrap>
                        </CommonBoxWrap>
                        <ProImage2 source={require('../../images/pro_profile.png')} />
                        <CommonBoxWrap flexStart style={{flexWrap:"wrap"}}>
                            <Hashtag>테이크 어웨이</Hashtag>
                            <Hashtag>그립잡기</Hashtag>
                            <Hashtag>어드레스</Hashtag>
                            <Hashtag>그립잡기</Hashtag>
                            <Hashtag>테이크 어웨이</Hashtag>
                        </CommonBoxWrap>
                    </ShadowBoxView>
                    <ShadowBoxView
                        style={Platform.OS == 'ios' ? { shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 } : {elevation: 15}}
                        onPress={ () => {} }
                        >
                        <CommonBoxWrap>
                            <CommonBoxWrap flexStart>
                                <TitLarge>1회차 레슨</TitLarge>
                                <IconText bgColor={"#000"}>답변완료</IconText>
                            </CommonBoxWrap>
                        </CommonBoxWrap>
                        <ProImage2 source={require('../../images/pro_profile.png')} />
                        <CommonBoxWrap flexStart>
                            <Hashtag>테이크 어웨이</Hashtag>
                            <Hashtag>그립잡기</Hashtag>
                        </CommonBoxWrap>
                    </ShadowBoxView>
                </ProListContainer>
            </CommonContainer4>
            <View>
                <PageButtonOn onPress={()=>{}}><PageBtnText>레슨 신청하기</PageBtnText></PageButtonOn>                          
            </View>
        </CommonBackground>      
    )
}

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
    dropdown1BtnTxtStyle: {color: '#666666', textAlign: 'left', fontWeight: "400"},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF',borderRadius: 8},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});

const ProListContainer = styled.View`
    paddingBottom: 130px;
`
const ShadowBoxView = styled.TouchableOpacity`
    position:relative;
    margin: 0 0 20px;
    padding: 15px 20px;
    border: 1px solid #EEEEEE;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    background: #fff;
    z-index: -9999;
    elevation : 0;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
`
const ProImage2 = styled.Image`
    width: 100%;
    height: 150px;
    margin: 15px 0 10px;
    marginRight: 12px;
    border-radius: 12px;
`
const IconText = styled.Text`
    height: 22px;
    margin-left: 10px;
    padding: 5px 10px 0;
    font-size: 12px;
    color: #fff;
    background: ${props => props.bgColor || '#B0B0B0'};
    border-radius: 11px;
    overflow: hidden;
`
const Hashtag = styled.Text`
    height: 22px;
    margin: 5px 10px 0 0;
    padding: 5px 10px 0;
    font-size: 12px;
    color: #fff;
    background: #E63312;
    border-radius: 3px;
    overflow: hidden;
`

export default Lesson;
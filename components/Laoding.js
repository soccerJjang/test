import React from 'react';
import * as RN from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import styled from "styled-components";


const Loading = (props) => {
    
    return(

        <Background>
            <LoadingImage
                source={require("../images/loading.gif")}
            />
        </Background>
    )
};

const Background = styled.View`
    
    position : absolute;
    background: #FFFFFF;
    width: 100%;
    height: 100%;
`;

const LoadingImage = styled.Image`
    margin: auto;
    width: 100px;
    height: 100px;    
`;

export default Loading;

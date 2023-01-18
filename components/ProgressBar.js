import React, { useState, useEffect, useRef, useCallback } from "react";
import { Animated, useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styled from "styled-components/native";
import { set } from "react-native-reanimated";

const ProgressBar = (props) => {
  
  const counter = useRef(new Animated.Value(0)).current;
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);
  const [percent, setPercent] = useState(0);
  const [progress, setProgress] = useState(props.data);  
  

   

  useFocusEffect(
    // 앱 화면이 Progress bar를 비추면 초기 퍼센트로 초기화합니다.
    useCallback(() => {
      setCount(percent);
    }, [])
  );

  useEffect(() => {

    console.log("hi");
    console.log(progress);
    let per = Math.round(progress.playableDurationMillis / 500);
    per = (100 / per).toFixed(2); 
    if(per > 0) {
        
        // 0.5초마다 5퍼센트씩 progress bar를 추가합니다.
        countInterval.current = setInterval(() => setCount(old => old + per), 500);
        return () => {
            clearInterval(countInterval);
        };
    }
    

  }, [progress]);

  useEffect(() => {
    

    load(count);
    // 100퍼센트가 되면 0퍼센트로 초기화합니다.
    if (count >= 100) {
      setCount(0);
      clearInterval(countInterval);
    }
  }, [count]);

  const load = count => {
    Animated.timing(counter, {
      toValue: count,
      // 애니메이션 주기 (퍼센트가 추가되는 시간(setInterval 주기)과 동일하게 맞춰주세요)
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  });

  return (
    <ProgressBarBlock>
      <Animated.View
        style={{ backgroundColor: "#f05014", borderRadius: count, width }}
      />
    </ProgressBarBlock>
  );
};

export default ProgressBar;

const ProgressBarBlock = styled.View`
  height: 8px;
  flex-direction: row;
  width: 100%;
  background-color: #eeeeee;
  border-radius: 10px;
`;

 
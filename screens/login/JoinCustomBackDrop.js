import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Text } from "react-native";

const CustomBackdrop = ({ animatedIndex, style }) => {      
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity:0.5,
    zIndex : animatedIndex.value >0 ? 0 : -1
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#000000"
        
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View style={containerStyle} >      
  </Animated.View>;
};

export default CustomBackdrop;
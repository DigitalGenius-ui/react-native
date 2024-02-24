import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const BottomBg = ({ animatedIndex, style }) => {
  const styleContainer = useAnimatedStyle(() => ({
    ...style,
    backgroundColor: "red",
    borderRadius: 30,
    elevation: 10,
    shadowWidth: 20,
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.5],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));
  return <Animated.View style={styleContainer} />;
};

export default BottomBg;

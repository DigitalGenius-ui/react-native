import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const BackDrop = ({ animatedIndex, style }) => {
  const backStyle = useAnimatedStyle(() => ({
    ...style,
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 0.8],
      ["transparent", "rgba(0,0,0,0.20)"]
    ),
  }));
  return <Animated.View style={backStyle} />;
};

export default BackDrop;

const styles = StyleSheet.create({});

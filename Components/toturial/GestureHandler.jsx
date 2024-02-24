import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const END_DURATION = 200;

const GestureHandler = () => {
  const isLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const tap = Gesture.Pan().onUpdate((e) => {
    if (isLeft.value) {
      position.value = e.translationX;
    } else {
      position.value = END_DURATION + e.translationX;
    }
  });

  const boxStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[
            { flex: 1, justifyContent: "center", alignItems: "center" },
            boxStyle,
          ]}>
          <View style={styles.box} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default GestureHandler;

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
});

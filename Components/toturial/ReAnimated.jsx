import { Button, StyleSheet, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const ReAnimated = () => {
  //   const width = useSharedValue(100);
  //   const translate = useSharedValue(10);

  //   const expandWidth = () => {
  //     translate.value = withRepeat(withTiming(50), 3, true);
  //   };

  //   const boxStyle = useAnimatedStyle(() => ({
  //     transform: [
  //       {
  //         translateX: withSpring(translate.value * 2, {
  //           mass: 10,
  //           duration: 1000,
  //         }),
  //       },
  //     ],
  //   }));
  const press = useSharedValue(false);
  const targetX = useSharedValue(0);
  const targetY = useSharedValue(0);

  const prevX = useSharedValue(0);
  const prevY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      press.value = true;
    })
    .onChange((e) => {
      targetX.value = prevX.value + e.translationX;
      targetY.value = prevY.value + e.translationY;
    })
    .onFinalize(() => {
      prevX.value = targetX.value;
      prevY.value = targetY.value;
      press.value = false;
    });

  const boxStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: targetX.value },
      { translateY: targetY.value },
      { scale: withTiming(press.value ? 1.3 : 1) },
    ],
    backgroundColor: press.value ? "blue" : "red",
    borderRadius: withTiming(press.value ? 50 : 0, { duration: 300 }),
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              { height: 100, width: 100, backgroundColor: "red" },
              boxStyle,
            ]}
          />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default ReAnimated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

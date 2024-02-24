import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TRANSLATE_X = -SCREEN_WIDTH * 0.3;

const SingleItem = ({ item, handleRemove, scrollHandler }) => {
  const translateX = useSharedValue(0);
  const heightValue = useSharedValue(50);
  const marginBottom = useSharedValue(15);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onFinalize(() => {
      const isRemoved = translateX.value < TRANSLATE_X;
      if (isRemoved) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        marginBottom.value = withTiming(0);
        heightValue.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && handleRemove) {
            runOnJS(handleRemove)(item);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const boxStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    marginBottom: marginBottom.value,
    height: heightValue.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: translateX.value < TRANSLATE_X ? withTiming(1.3) : withTiming(0),
      },
    ],
    height: heightValue.value,
  }));

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.remove, iconStyle]}>
        <Feather name="trash-2" size={22} color="red" />
      </Animated.View>
      <GestureDetector scrollHandler={scrollHandler} gesture={pan}>
        <Animated.View style={[styles.item, boxStyle]}>
          <Text>This is item number {item}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default SingleItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    elevation: 5,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  remove: {
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});

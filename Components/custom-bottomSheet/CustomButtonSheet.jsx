import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { height: HEIGHT_SCREEN } = Dimensions.get("window");
const MAX_TOP = -HEIGHT_SCREEN + 770;

const CustomButtonSheet = () => {
  const bottomSheet = useSharedValue(0);
  const prevSheet = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      prevSheet.value = bottomSheet.value;
    })
    .onUpdate((e) => {
      bottomSheet.value = prevSheet.value + e.translationY;
      bottomSheet.value = Math.max(bottomSheet.value, MAX_TOP);
    });

  useEffect(() => {
    bottomSheet.value = withSpring(-HEIGHT_SCREEN + 1200, { damping: 50 });
  }, []);

  const boxStyle = useAnimatedStyle(() => {
    const radius = interpolate(
      bottomSheet.value,
      [MAX_TOP + 50, MAX_TOP],
      [20, 2],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY: bottomSheet.value }],
      borderRadius: radius,
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: "white", fontSize: 30 }}>Click Me</Text>
        </TouchableOpacity>
        <GestureDetector gesture={pan}>
          <View style={styles.shadow}>
            <Animated.View style={[styles.box, boxStyle]}>
              <View style={styles.boxLine}>
                <View style={styles.line} />
              </View>
              <Text>hi there</Text>
            </Animated.View>
          </View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default CustomButtonSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    padding: 30,
    backgroundColor: "black",
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingTop: 30,
  },
  box: {
    height: HEIGHT_SCREEN,
    elevation: 50,
    borderRadius: 20,
    backgroundColor: "white",
  },
  boxLine: {
    height: 50,
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: 40,
    height: 3,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 50,
  },
});

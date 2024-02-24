import { StyleSheet, View } from "react-native";
import React, { useRef, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomBg from "../Components/BottomBg";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import BackDrop from "../Components/BackDrop";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = () => {
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => [10, 500], []);
  const animatedIndex = useSharedValue(0);

  const textStyleAnim = useAnimatedStyle(() => ({
    color: interpolateColor(animatedIndex.value, [0, 0.8], ["white", "black"]),
    marginTop: interpolate(
      animatedIndex.value,
      [0, 0.8],
      [0, 30],
      Extrapolation.CLAMP
    ),
  }));

  const iconAnim = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          animatedIndex.value,
          [0, 0.8],
          [0, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <BottomSheet
            backgroundComponent={BottomBg}
            index={1}
            animatedIndex={animatedIndex}
            ref={bottomSheetRef}
            backdropComponent={BackDrop}
            snapPoints={snapPoints}>
            <View style={styles.textAnim}>
              <Animated.Text style={[{ fontSize: 40 }, textStyleAnim]}>
                Awesome
                <Animated.View style={iconAnim}>
                  <AntDesign name="user" size={30} color="black" />
                </Animated.View>
              </Animated.Text>
            </View>
          </BottomSheet>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textAnim: {
    flex: 1,
    alignItems: "center",
  },
});

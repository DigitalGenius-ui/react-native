import { View } from "react-native";
import SwipeRight from "../Components/swipeRight/SwipeRight";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SwipeRight />
      </GestureHandlerRootView>
    </View>
  );
};

export default HomeScreen;

import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const Shop = ({ products }) => {
  const navigation = useNavigation();

  const render = ({ item, index }) => {
    const asc = index % 2 !== 0;
    return (
      <Animated.View
        style={{
          flex: 1,
          elevation: 2,
          shadowRadius: 15,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 14,
        }}
        entering={
          asc
            ? FadeInRight.duration(200).delay(index * 100)
            : FadeInLeft.duration(200).delay(index * 100)
        }
        exiting={FadeOut}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SingleProduct", { ...item })}
          style={[styles.item]}>
          <Animated.Image
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: 180,
              objectFit: "contain",
            }}
            sharedTransitionTag={item.title}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };
  return (
    <FlatList
      data={products}
      renderItem={render}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ gap: 10, paddingHorizontal: 15 }}
      contentContainerStyle={{ gap: 10, paddingVertical: 12 }}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Shop;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

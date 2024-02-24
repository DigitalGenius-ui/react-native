import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useProductFetch from "../Hooks/useProductFetch";
import Loading from "../Components/Loading";
import Animated from "react-native-reanimated";

const SingleProductScreen = (props) => {
  const { params: product } = props.route;
  //   const { products: product, loading } = useProductFetch({ id: params.id });
  return (
    <View style={styles.singleProduct}>
      {false ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Loading size="large" />
        </View>
      ) : (
        <>
          <View style={styles.data}>
            <Animated.Image
              source={{ uri: product.image }}
              style={{ width: "100%", height: 300, objectFit: "contain" }}
              sharedTransitionTag={product.title}
            />
          </View>
          <View style={styles.footData}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: "bold",
                  color: "white",
                }}>
                {product.title}
              </Text>
              <Text style={{ fontSize: 17, color: "white", paddingBottom: 2 }}>
                {product.price}$
              </Text>
            </View>
            <Text
              style={{
                paddingVertical: 15,
                fontSize: 19,
                fontWeight: "bold",
                color: "white",
              }}>
              Description :
            </Text>
            <Text style={{ lineHeight: 20, color: "white" }}>
              {product.description}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default SingleProductScreen;

const styles = StyleSheet.create({
  singleProduct: {
    flex: 1,
  },
  data: {
    backgroundColor: "white",
    paddingVertical: 15,
  },
  footData: {
    flex: 1,
    backgroundColor: "black",
    padding: 22,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

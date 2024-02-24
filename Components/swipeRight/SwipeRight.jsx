import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import SingleItem from "./SingleItem";
import { ScrollView } from "react-native-gesture-handler";

const SwipeRight = () => {
  const [data, setData] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);

  const handleRemove = useCallback((newData) => {
    setData((prev) => prev.filter((item) => item !== newData));
  }, []);

  const scrollRef = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", paddingVertical: 10 }}>
        Tasks:
      </Text>
      <ScrollView ref={scrollRef} style={styles.container}>
        {data.map((item) => (
          <SingleItem
            scrollHandler={scrollRef}
            item={item}
            key={item}
            handleRemove={handleRemove}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SwipeRight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 15,
  },
});

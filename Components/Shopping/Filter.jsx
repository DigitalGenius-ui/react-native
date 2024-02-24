import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import useFilterFetch from "../../Hooks/useFilterFetch";
import Loading from "../toturial/Loading";

const Filter = ({ activeBox, setActiveBox }) => {
  const { categories } = useFilterFetch();

  const handleFilter = (item) => {
    if (item === "all") {
      setActiveBox("");
    } else {
      setActiveBox(item);
    }
  };
  return (
    <View>
      <Text style={{ paddingLeft: 20, paddingTop: 20, fontSize: 20 }}>
        Filter Products:
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filters}>
        {categories.length === 0 ? (
          <Loading size="large" />
        ) : (
          ["all", ...categories].map((item, i) => (
            <TouchableOpacity
              onPress={() => handleFilter(item)}
              key={i}
              style={[
                styles.box,
                {
                  backgroundColor: activeBox === item ? "black" : "white",
                  borderColor: activeBox === item ? "transparent" : "gray",
                },
              ]}>
              <Text
                style={{
                  textTransform: "capitalize",
                  textAlign: "center",
                  color: activeBox === item ? "white" : "black",
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    paddingVertical: 15,
    marginRight: 10,
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 99,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
});

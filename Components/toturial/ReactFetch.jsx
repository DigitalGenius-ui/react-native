import { FlatList, SafeAreaView, StatusBar, Text, View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../FetchData/FetchData";

const Product = ({ item }) => {
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
};

const ReactFetch = () => {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      {isError && <Text>{error.message}</Text>}
      <View>
        {isSuccess && (
          <FlatList
            data={data}
            renderItem={({ item }) => <Product item={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReactFetch;

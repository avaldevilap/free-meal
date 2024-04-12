import { Input } from "@/components/input";
import { blurhash } from "@/constants";
import { searchMeal } from "@/data";
import { Colors, Outlines, Sizes, Typography } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

export default function Home() {
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["search-meal"],
    queryFn: () => searchMeal(search ?? ""),
    enabled: false,
  });

  if (isLoading) return <ActivityIndicator />;

  return (
    <SafeAreaView style={{ flex: 1, rowGap: Sizes.x10, margin: Sizes.x6 }}>
      <Stack.Screen
        options={{
          title: "Search",
        }}
      />

      <View>
        <Input
          placeholder="Search meal by name"
          keyboardType="web-search"
          returnKeyType="search"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => refetch()}
        />
      </View>

      <FlatList
        data={data?.meals}
        renderItem={({ item }) => (
          <Pressable
            style={{
              flex: 1,
              flexDirection: "row",
              gap: Sizes.x2,
              padding: Sizes.x2,
              ...Outlines.card,
              ...Outlines.shadow,
              ...Colors.border,
            }}
            onPress={() => router.push(`/meals/${item.idMeal}`)}
          >
            <Image
              style={{
                width: 100,
                aspectRatio: "16/9",
                borderRadius: Sizes.x2,
              }}
              source={`${item?.strMealThumb}`}
              contentFit="cover"
              placeholder={blurhash}
            />
            <View>
              <Text style={{ ...Typography.body2 }}>{item.strMeal}</Text>
              <Text style={{ fontSize: 12 }}>
                {item.strCategory.toUpperCase()}
              </Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(meal) => meal.idMeal}
        contentContainerStyle={{ gap: Sizes.x4 }}
      />
    </SafeAreaView>
  );
}

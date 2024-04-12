import { blurhash } from "@/constants";
import { fetchByCategory } from "@/data";
import { Colors, Outlines, Sizes, Typography } from "@/styles";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Category() {
  const params = useLocalSearchParams<{ category: string }>();

  const { data: categoryMeals, isLoading } = useQuery({
    queryKey: ["categories", params.category],
    queryFn: () => fetchByCategory(params.category),
    select(data) {
      return data.meals;
    },
  });

  if (isLoading) return <ActivityIndicator />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: params.category }} />

      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.categoryList}
          data={categoryMeals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <Pressable
              style={styles.categoryCard}
              onPress={() => router.push(`/meals/${item.idMeal}`)}
            >
              <View style={styles.categoryCardContainer}>
                <Image
                  style={styles.categoryCardImage}
                  source={`${item?.strMealThumb}`}
                  contentFit="cover"
                  placeholder={blurhash}
                />
                <BlurView
                  style={styles.categoryCardTextContainer}
                  intensity={60}
                >
                  <Text style={styles.categoryCardText}>{item?.strMeal}</Text>
                </BlurView>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.x6,
  },
  categoryList: {
    rowGap: Sizes.x4,
  },
  categoryCard: {
    flex: 1,
  },
  categoryCardContainer: {
    position: "relative",
  },
  categoryCardImage: {
    width: "100%",
    aspectRatio: "16/9",
    borderRadius: Sizes.x2,
  },
  categoryCardTextContainer: {
    position: "absolute",
    left: Sizes.x2,
    bottom: Sizes.x2,
    padding: Sizes.x2,
    overflow: "hidden",
    borderRadius: Outlines.borderRadius.lg,
  },
  categoryCardText: {
    ...Typography.body,
  },
});

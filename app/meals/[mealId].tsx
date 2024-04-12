import { blurhash } from "@/constants";
import { fetchMeal } from "@/data";
import { Outlines, Sizes, Typography } from "@/styles";
import type { KeysOfValue, Meal } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";

type StringKeysOfMeal = KeysOfValue<Meal, string>;

export default function MealDetails() {
  const [refreshing, setRefreshing] = useState(false);

  const params = useLocalSearchParams<{ mealId: string }>();

  const {
    data: meal,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meal", params.mealId],
    queryFn: () => fetchMeal(params.mealId),
    select(data) {
      return data.meals[0];
    },
  });

  const ingredients = useMemo(() => {
    const ingredients: Array<[string, string]> = [];
    if (meal) {
      for (let index = 0; index < 19; index++) {
        const ingredient = meal[`strIngredient${index}` as StringKeysOfMeal];
        const measure = meal[`strMeasure${index}` as StringKeysOfMeal];

        if (ingredient) {
          ingredients.push([ingredient, measure]);
        }
      }
    }
    return ingredients;
  }, [meal]);

  if (isLoading) return <ActivityIndicator />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: meal?.strMeal }} />

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await refetch();
              setRefreshing(false);
            }}
          />
        }
      >
        <View style={styles.imageCard}>
          <Image
            style={styles.imageCardImage}
            source={`${meal?.strMealThumb}`}
            contentFit="cover"
            placeholder={blurhash}
          />
          <BlurView style={styles.imageCardTextContainer} intensity={60}>
            <Text style={styles.imageCardText}>{meal?.strMeal}</Text>
          </BlurView>
        </View>

        <View style={styles.ingredients}>
          {ingredients.map((ingredient, index) => (
            <View
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={`${ingredient}-${index}`}
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Text>{ingredient[0]}</Text>
              <Text>{ingredient[1]}</Text>
            </View>
          ))}
        </View>

        <View style={styles.instructions}>
          <Markdown>{meal?.strInstructions}</Markdown>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.x6,
  },
  imageCard: {
    flex: 1,
    ...Outlines.shadow.base,
  },
  imageCardImage: {
    width: "100%",
    aspectRatio: "16/9",
    borderRadius: Sizes.x2,
  },
  imageCardTextContainer: {
    position: "absolute",
    left: Sizes.x2,
    bottom: Sizes.x2,
    padding: Sizes.x2,
    overflow: "hidden",
    borderRadius: Outlines.borderRadius.lg,
  },
  imageCardText: {
    ...Typography.body,
  },
  instructions: {
    marginTop: Sizes.x2,
  },
  ingredients: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: Sizes.x1,
    columnGap: Sizes.x2,
    paddingVertical: Sizes.x4,
  },
});

import { fetchCategories } from "@/data";
import { Colors, Outlines, Sizes, Typography } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Home() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    select(data) {
      return data.categories;
    },
  });

  if (isLoading)
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => (
            <Pressable
              style={styles.searchButton}
              onPress={() => router.push("/search")}
            >
              <Ionicons name="search" size={24} color="white" />
            </Pressable>
          ),
        }}
      />

      <View style={styles.container}>
        <Text style={styles.sectionHeading}>Categories</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: Sizes.x4, paddingStart: Sizes.x6 }}
          keyExtractor={(item) => item.idCategory}
          renderItem={({ item }) => (
            <Pressable
              style={styles.categoryCard}
              onPress={() => router.push(`/categories/${item.strCategory}`)}
            >
              <Image
                style={styles.categoryCardImage}
                source={item.strCategoryThumb}
                contentFit="cover"
              />
              <Text style={styles.categoryCardText}>{item.strCategory}</Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Sizes.x6,
    paddingVertical: Sizes.x6,
  },
  sectionHeading: {
    ...Typography.subheader,
    marginLeft: 24,
  },
  categoryCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Sizes.x1,
    padding: Sizes.x4,
    maxWidth: 150,
    ...Colors.border,
    ...Outlines.card,
    ...Outlines.shadow.base,
  },
  categoryCardImage: {
    width: "100%",
    aspectRatio: 3 / 2,
    borderRadius: Outlines.borderRadius.lg,
  },
  categoryCardText: {
    ...Typography.body,
  },
  loadingContainer: {
    flex: 1,
    flexGrow: 1,
  },
  searchButton: {
    padding: Sizes.x1,
    backgroundColor: Colors.primary[600],
    borderRadius: Outlines.borderRadius.lg,
  },
});

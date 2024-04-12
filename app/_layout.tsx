import { Colors } from "@/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ErrorBoundaryProps, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: Colors.primary[500] },
        }}
      />
    </QueryClientProvider>
  );
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <View style={errorBoundaryStyles.container}>
      <Text>{props.error.message}</Text>
      <Text onPress={props.retry}>Try Again?</Text>
    </View>
  );
}

const errorBoundaryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});

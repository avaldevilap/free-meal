import { Colors, Outlines } from "@/styles";
import type { ComponentProps } from "react";
import { StyleSheet, TextInput } from "react-native";

type InputProps = ComponentProps<typeof TextInput>;

export function Input(props: InputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={Colors.neutral[400]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    padding: 8,
    textDecorationColor: "red",
    ...Outlines.input,
    ...Colors.border,
    ...Outlines.shadow.base,
  },
});

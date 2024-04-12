import type { ViewStyle } from "react-native";
import * as Colors from "./colors";

export const borderRadius = {
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
};

export const borderWidth = {
  base: 1,
  2: 2,
  4: 4,
  8: 8,
};

export const shadow = {
  base: {
    shadowColor: Colors.neutral[400],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  } satisfies ViewStyle,
};

export const card: ViewStyle = {
  borderWidth: borderWidth.base,
  borderRadius: borderRadius.lg,
};

export const input: ViewStyle = {
  borderWidth: borderWidth.base,
  borderRadius: borderRadius.lg,
};

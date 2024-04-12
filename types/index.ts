export type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];

export interface MealResult {
  meals: Meal[];
}
type Amount =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;
export interface Meal extends Record<`strIngredient${Amount}`, string> {}
export interface Meal extends Record<`strMeasure${Amount}`, string> {}
export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strSource: string;
  strImageSource: string;
  strCreativeCommonsConfirmed: boolean;
  dateModified: string;
}

export interface CategoryResult {
  categories: Category[];
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

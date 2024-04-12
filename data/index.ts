import type { CategoryResult, MealResult } from "@/types";

const baseUrl = new URL("https://www.themealdb.com");
const filterUrl = new URL("/api/json/v1/1/filter.php", baseUrl);

export async function fetchRandomMeal(): Promise<MealResult> {
  const url = new URL("/random.php", baseUrl);
  const response = await fetch(url);
  return response.json();
}

export async function fetchCategories(): Promise<CategoryResult> {
  const url = new URL("/api/json/v1/1/categories.php", baseUrl);
  const response = await fetch(url);
  return response.json();
}

export async function fetchByCategory(category: string): Promise<{
  meals: Array<{ strMeal: string; strMealThumb: string; idMeal: string }>;
}> {
  filterUrl.searchParams.set("c", category);
  const response = await fetch(filterUrl);
  return response.json();
}

export async function fetchByArea(area: string): Promise<{
  meals: Array<{ strMeal: string; strMealThumb: string; idMeal: string }>;
}> {
  filterUrl.searchParams.set("a", area);
  const response = await fetch(filterUrl);
  return response.json();
}

export async function searchMeal(query: string): Promise<MealResult> {
  const url = new URL("/api/json/v1/1/search.php", baseUrl);
  url.searchParams.set("s", query);
  const response = await fetch(url);
  return response.json();
}

export async function fetchMeal(mealId: string): Promise<MealResult> {
  const url = new URL("/api/json/v1/1/lookup.php", baseUrl);
  url.searchParams.set("i", mealId);
  const response = await fetch(url);
  return response.json();
}

import { create } from 'zustand'

export const useRecipeStore = create(set => ({
  recipes: [],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),
  deleteRecipe: (recipes) => set(state => ({recipes: state.recipes.filter(item => item !== recipes)})),
  updateRecipe: (oldRecipes, newRecipe) => set(state => ({recipes: [...state.recipes.filter(item => item !== oldRecipes), newRecipe]}))
}));





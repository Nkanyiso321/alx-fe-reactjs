import { create } from 'zustand'

export const useRecipeStore = create(set => ({
  recipes: [],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),
  deleteRecipe: (recipe) => set(state => ({recipes: state.recipes.filter(item => item !== recipe)})),
  updateRecipe: (oldRecipe, newRecipe) => set(state => ({recipes: [...state.recipes.filter(item => item !== oldRecipe), newRecipe]}))
}));

// module.exports = { useRecipeStore }


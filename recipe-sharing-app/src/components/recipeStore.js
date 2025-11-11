import { create } from 'zustand'

export const useRecipeStore = create(set => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),
  deleteRecipe: (recipes) => set(state => ({recipes: state.recipes.filter(item => item !== recipes)})),
  updateRecipe: (oldRecipes, newRecipe) => set(state => ({recipes: [...state.recipes.filter(item => item !== oldRecipes), newRecipe]})),
  setSearchTerm: (term) => set({ searchTerm: term }),
  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe => recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()))
  })),

}));







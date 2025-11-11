import { useState } from 'react'
import { Router, Routes, Route, Link } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetail'
import { useRecipeStore } from './components/recipeStore'


function App() {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <>
      {/* {<RecipeList />} */}
      {/* {<AddRecipeForm />} */}

      <nav>
        {recipes && recipes.map(recipe => (
          <Link key={recipe.id} to={`/${recipe.id}`}>{recipe.title}</Link>
        ))}
      </nav>

      <Router navigator={customHistory} location={customHistory.location}>
        <Routes>
          <Route path="/" element={
            <>
              <h1>Home</h1>
              <RecipeList />
              <AddRecipeForm />
            </>
          } />
          <Route path="/:recipeID" element={<RecipeDetails />} />
          {/* 404 fallback */}
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

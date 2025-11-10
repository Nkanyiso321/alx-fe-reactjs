import { useRecipeStore } from "./recipeStore";
import { useState } from "react";


export default function EditRecipeForm({ recipeId }) {
    const recipe = useRecipeStore(state => state.recipes.find(recipe => recipe.id === recipeId));
    const updateRecipe = useRecipeStore(state => state.updateRecipe);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };

    const handleUpdate = (event) => {
      event.preventDefault()  
      updateRecipe(recipe, {...recipe, title, description});
    };

    return (
        <>
            <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" />
            <br /><br />
            <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" />

            <br />
            <br />
            <button onClick={handleUpdate}>Update</button>
        </>
    )
}
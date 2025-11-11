// RecipeDetails component
import { useRecipeStore } from './recipeStore';


const DeleteRecipeButton = ({ recipeId }) => {

    const recipe = useRecipeStore(state => state.recipes.find(recipe => recipe.id == recipeId));
    const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

    const handlDelete = (event) => {
        event.preventDefault()  
        deleteRecipe(recipe);
    };
    console.log(recipe)

    return (
        <div>
            <button onClick={handlDelete}>Delete</button>
        </div>
    );
};

export default DeleteRecipeButton
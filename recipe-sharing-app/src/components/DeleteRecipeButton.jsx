// RecipeDetails component
import { useRecipeStore } from './recipeStore';
import { useNavigate } from "react-router-dom";


const DeleteRecipeButton = ({ recipeId }) => {

    const recipe = useRecipeStore(state => state.recipes.find(recipe => recipe.id == recipeId));
    const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

    const navigate = useNavigate()

    const handlDelete = (event) => {
        event.preventDefault()  
        deleteRecipe(recipe);
        navigate("/"); 
    };
    console.log(recipe)

    return (
        <div>
            <button onClick={handlDelete}>Delete</button>
        </div>
    );
};

export default DeleteRecipeButton
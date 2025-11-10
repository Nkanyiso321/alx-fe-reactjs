// RecipeDetails component
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import { useParams } from "react-router-dom";


const RecipeDetails = ({ recipeId }) => {
    const { recipeID } = useParams()
    console.log(recipeID)
    const recipe = useRecipeStore(state => state.recipes.find(recipe => recipe.id == recipeID));
    const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

    const handlDelete = (event) => {
        event.preventDefault()  
        deleteRecipe(recipe);
    };
    console.log(recipe)

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            {/* Render EditRecipeForm and DeleteRecipeButton here */}
            <EditRecipeForm />
            <br />
            <br />
            <button onClick={handlDelete}>Delete</button>
        </div>
    );
};

export default RecipeDetails
// RecipeDetails component
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useParams } from "react-router-dom";


const RecipeDetails = ({ recipeId }) => {
    const { recipeID } = useParams()
    console.log(recipeID)
    const recipe = useRecipeStore(state => state.recipes.find(recipe => recipe.id == recipeID));

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            {/* Render EditRecipeForm and DeleteRecipeButton here */}
            <EditRecipeForm />
            <br />
            <br />
            <DeleteRecipeButton recipeId={recipeId} />
        </div>
    );
};

export default RecipeDetails
export const validateRecipeForm = (formData) => {
  const errors = {};
  
  // Required fields validation
  if (!formData.title?.trim()) errors.title = 'Recipe title is required';
  if (!formData.summary?.trim()) errors.summary = 'Summary is required';
  if (!formData.category) errors.category = 'Category is required';
  if (!formData.cookTime) errors.cookTime = 'Cook time is required';
  
  // Ingredients validation
  const validIngredients = formData.ingredients?.filter(ing => ing?.trim()) || [];
  if (validIngredients.length < 2) {
    errors.ingredients = 'At least 2 ingredients are required';
  }
  
  // Instructions validation
  const validInstructions = formData.instructions?.filter(inst => inst?.trim()) || [];
  if (validInstructions.length < 2) {
    errors.instructions = 'At least 2 preparation steps are required';
  }
  
  // Image URL validation
  if (formData.image && !isValidUrl(formData.image)) {
    errors.image = 'Please enter a valid image URL';
  }
  
  return errors;
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const calculateTotalTime = (prepTime, cookTime) => {
  return (parseInt(prepTime) || 0) + (parseInt(cookTime) || 0);
};
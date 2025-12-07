import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Flame, 
  Star, 
  Bookmark,
  Share2,
  Printer,
  ArrowLeft,
  Check,
  MessageCircle,
  ThumbsUp,
  Award,
  Shield
} from 'lucide-react';
import RecipeCard from './RecipeCard';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(4);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        // Fetch all recipes
        const response = await fetch('../data.json');
        const data = await response.json();
        setAllRecipes(data);
        
        // Find the specific recipe
        const foundRecipe = data.find(r => r.id === parseInt(id));
        setRecipe(foundRecipe);
        
        // Set default servings
        if (foundRecipe) {
          setServings(foundRecipe.servings);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Adjust ingredients based on servings
  const adjustIngredients = (ingredients, originalServings) => {
    if (!ingredients || !originalServings) return [];
    
    const multiplier = servings / originalServings;
    return ingredients.map(ingredient => {
      const match = ingredient.match(/^(\d+(\.\d+)?)\s*(.*)/);
      if (match) {
        const amount = parseFloat(match[1]) * multiplier;
        const unit = match[3];
        return `${amount.toFixed(1)} ${unit}`;
      }
      return ingredient;
    });
  };

  // Get similar recipes
  const getSimilarRecipes = () => {
    if (!recipe || !recipe.similarRecipes || !allRecipes.length) return [];
    return allRecipes.filter(r => recipe.similarRecipes.includes(r.id));
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, you would save this to local storage or backend
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewText.trim() && userRating > 0) {
      // In a real app, you would submit to backend
      const newReview = {
        id: Date.now(),
        user: "You",
        rating: userRating,
        comment: reviewText,
        date: new Date().toISOString().split('T')[0]
      };
      
      setRecipe(prev => ({
        ...prev,
        reviews: [...prev.reviews, newReview],
        rating: ((prev.rating * prev.reviews.length) + userRating) / (prev.reviews.length + 1)
      }));
      
      setReviewText('');
      setUserRating(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🍳</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const similarRecipes = getSimilarRecipes();
  const adjustedIngredients = adjustIngredients(recipe.ingredients, recipe.servings);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Recipes
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" />
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-800 rounded-full">
                {recipe.category}
              </span>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                recipe.difficulty === 'Easy' 
                  ? 'bg-green-100 text-green-800' 
                  : recipe.difficulty === 'Medium' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {recipe.difficulty}
              </span>
              {recipe.tags && recipe.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-white/80 backdrop-blur-sm text-sm text-gray-600 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {recipe.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl drop-shadow">
              {recipe.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recipe Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recipe Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-2">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-gray-900">{recipe.cookTime}</div>
                  <div className="text-sm text-gray-600">Cook Time</div>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-2">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-gray-900">
                    <select 
                      value={servings}
                      onChange={(e) => setServings(parseInt(e.target.value))}
                      className="bg-transparent border-none text-gray-900 font-bold focus:outline-none"
                    >
                      {[2, 4, 6, 8].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div className="text-sm text-gray-600">Servings</div>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mb-2">
                    <ChefHat className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-gray-900">{recipe.difficulty}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-2">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-gray-900">{recipe.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBookmark}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-semibold transition-colors ${
                    isBookmarked
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Bookmarked' : 'Save Recipe'}
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    <Printer className="w-5 h-5 mr-2" />
                    Print
                  </button>
                </div>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center">
                  <img 
                    src={recipe.authorAvatar} 
                    alt={recipe.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">By {recipe.author}</div>
                    <div className="text-sm text-gray-600">Professional Chef</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nutrition Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nutrition Facts</h3>
              <div className="space-y-3">
                {recipe.nutrition && Object.entries(recipe.nutrition).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600 capitalize">{key}</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700">This recipe is high in protein and contains essential nutrients</span>
                </div>
              </div>
            </div>

            {/* Cooking Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Pro Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Use fresh ingredients for best flavor</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Prep all ingredients before starting to cook</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Taste and adjust seasoning as you cook</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Let meat rest before slicing for juicier results</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Recipe Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                  {['ingredients', 'instructions', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                        activeTab === tab
                          ? 'text-primary-600 border-b-2 border-primary-500'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6 md:p-8">
                {/* Ingredients Tab */}
                {activeTab === 'ingredients' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Ingredients</h3>
                      <p className="text-gray-600">For {servings} servings</p>
                    </div>
                    <ul className="space-y-3">
                      {adjustedIngredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                            <Check className="w-3 h-3 text-primary-600" />
                          </div>
                          <span className="text-gray-800">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        💡 <strong>Shopping Tip:</strong> All ingredients are available at most grocery stores. 
                        Look for fresh herbs in the produce section.
                      </p>
                    </div>
                  </div>
                )}

                {/* Instructions Tab */}
                {activeTab === 'instructions' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Cooking Instructions</h3>
                      <p className="text-gray-600">Follow these steps for perfect results</p>
                    </div>
                    <div className="space-y-6">
                      {recipe.instructions.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center mr-4 font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800">{step}</p>
                            {index === 0 && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                  ⏱️ <strong>Time Saver:</strong> You can prep ingredients up to 24 hours in advance.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(recipe.rating) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{recipe.rating.toFixed(1)}</span>
                        <span className="text-gray-600">({recipe.reviews?.length || 0} reviews)</span>
                      </div>
                    </div>

                    {/* Add Review Form */}
                    <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-4">Add Your Review</h4>
                      <form onSubmit={handleSubmitReview}>
                        <div className="mb-4">
                          <div className="flex items-center space-x-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setUserRating(star)}
                                className="focus:outline-none"
                              >
                                <Star 
                                  className={`w-8 h-8 ${
                                    star <= userRating 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300 hover:text-yellow-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Share your experience with this recipe..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            rows="4"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
                          disabled={!reviewText.trim() || userRating === 0}
                        >
                          Submit Review
                        </button>
                      </form>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                      {recipe.reviews?.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                <span className="font-semibold text-gray-700">
                                  {review.user.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{review.user}</div>
                                <div className="text-sm text-gray-500">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          <div className="flex items-center mt-3 space-x-4">
                            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Helpful
                            </button>
                            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Recipes */}
            {similarRecipes.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarRecipes.map((similarRecipe) => (
                    <RecipeCard key={similarRecipe.id} recipe={similarRecipe} />
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Can I make this recipe ahead of time?</h4>
                  <p className="text-gray-600">
                    Yes, this recipe can be prepared up to 24 hours in advance. Store in an airtight container in the refrigerator.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What can I substitute for [ingredient]?</h4>
                  <p className="text-gray-600">
                    Check the recipe notes for suggested substitutions. Common alternatives are usually provided for key ingredients.
                  </p>
                </div>
                <div className="pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Is this recipe suitable for beginners?</h4>
                  <p className="text-gray-600">
                    This recipe is rated "{recipe.difficulty}" difficulty. Beginners may want to read through all instructions first and gather all ingredients before starting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
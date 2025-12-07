import React from 'react';
import { Clock, Star, ChefHat, ExternalLink } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-800 rounded-full">
            {recipe.category}
          </span>
        </div>
        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
            recipe.difficulty === 'Easy' 
              ? 'bg-green-100 text-green-800' 
              : recipe.difficulty === 'Medium' 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {recipe.difficulty}
          </span>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="p-6">
        {/* Recipe Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {recipe.title}
        </h3>
        
        {/* Recipe Summary */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {recipe.summary}
        </p>

        {/* Recipe Stats */}
        <div className="flex items-center justify-between mb-6">
          {/* Cook Time */}
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium">{recipe.cookTime}</span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(recipe.rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {recipe.rating}
            </span>
          </div>
          
          {/* Chef Icon */}
          <div className="p-2 bg-primary-50 rounded-lg">
            <ChefHat className="w-5 h-5 text-primary-600" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 px-4 py-2.5 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2">
            <span>View Recipe</span>
            <ExternalLink className="w-4 h-4" />
          </button>
          
          <button className="px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200">
            Save
          </button>
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default RecipeCard;
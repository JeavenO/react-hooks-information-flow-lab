import React, { useState } from 'react';
import { ChevronDown, ShoppingBag, Sun, Moon } from 'lucide-react';

// --- DATA ---
const initialItems = [
  { id: 1, name: "Organic Milk (1 Gal)", category: "Dairy" },
  { id: 2, name: "Fuji Apples (3 lbs)", category: "Produce" },
  { id: 3, name: "Vanilla Bean Ice Cream", category: "Dessert" },
  { id: 4, name: "Cheddar Cheese Block", category: "Dairy" },
  { id: 5, name: "Ripe Bananas", category: "Produce" },
  { id: 6, name: "Chocolate Lava Cake", category: "Dessert" },
  { id: 7, name: "Broccoli Crowns", category: "Produce" },
];

const categories = ["All", "Produce", "Dairy", "Dessert"];

// --- 1. Item Component ---
// Renders a single list item
function Item({ name, category }) {
  const getCategoryColor = (cat) => {
    // Category colors remain bright for contrast in both modes
    switch (cat) {
      case 'Produce':
        return 'text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-800';
      case 'Dairy':
        return 'text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-800';
      case 'Dessert':
        return 'text-pink-600 bg-pink-100 dark:text-pink-300 dark:bg-pink-800';
      default:
        return 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-600';
    }
  };

  return (
    <li className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 border-b last:border-b-0 border-gray-100 dark:border-gray-700">
      <span className="font-medium text-gray-800 dark:text-gray-100 text-lg">{name}</span>
      <span
        className={`px-3 py-1 text-xs font-semibold uppercase rounded-full tracking-wider ${getCategoryColor(category)}`}
      >
        {category}
      </span>
    </li>
  );
}

// --- 2. ShoppingList Component ---
function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  // Filtering logic
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center mb-4 sm:mb-0">
          <ShoppingBag className="w-7 h-7 mr-2 text-indigo-600" />
          Grocery List
        </h2>
        
        {/* Filter Dropdown */}
        <div className="relative inline-block w-full sm:w-auto">
          <select
            name="filter"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="appearance-none block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-indigo-500 shadow-sm"
          >
            <option value="All">All Categories</option>
            {categories.filter(c => c !== "All").map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Item List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mt-6">
        <ul className="Items divide-y divide-gray-100 dark:divide-gray-700">
          {itemsToDisplay.length > 0 ? (
            itemsToDisplay.map((item) => (
              <Item
                key={item.id}
                name={item.name}
                category={item.category}
              />
            ))
          ) : (
            <li className="p-6 text-center text-gray-500 dark:text-gray-400 italic">
              No items found in the "{selectedCategory}" category.
            </li>
          )}
        </ul>
      </div>
      
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        Showing {itemsToDisplay.length} of {items.length} total items.
      </p>
    </div>
  );
}

// --- 3. Main App Component (Root) ---
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function onDarkModeClick() {
    setIsDarkMode((prev) => !prev);
  }

  // Use a class (dark) on the root div to enable Tailwind's dark mode utilities
  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header className="bg-indigo-600 dark:bg-gray-800 p-4 shadow-xl">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          {/* Using "Shopster" and button structure from user's app.js */}
          <h2 className="text-3xl font-extrabold text-white tracking-wider">
            Shopster
          </h2>
          <button 
            onClick={onDarkModeClick}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 dark:bg-indigo-500 dark:text-white rounded-xl font-semibold shadow-lg hover:bg-gray-100 dark:hover:bg-indigo-600 transition duration-200"
          >
            {isDarkMode ? (
                <>
                    <Sun className="w-5 h-5" />
                    <span>Light Mode</span>
                </>
            ) : (
                <>
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                </>
            )}
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-6">
        <ShoppingList items={initialItems} />
      </main>
    </div>
  );
}
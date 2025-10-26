import React, { useState } from 'react';
import { ChevronDown, ShoppingBag } from 'lucide-react';

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
    switch (cat) {
      case 'Produce':
        return 'text-green-600 bg-green-100';
      case 'Dairy':
        return 'text-blue-600 bg-blue-100';
      case 'Dessert':
        return 'text-pink-600 bg-pink-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <li className="flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition duration-150 border-b last:border-b-0">
      <span className="font-medium text-gray-800 text-lg">{name}</span>
      <span
        className={`px-3 py-1 text-xs font-semibold uppercase rounded-full tracking-wider ${getCategoryColor(category)}`}
      >
        {category}
      </span>
    </li>
  );
}

// --- 2. ShoppingList Component (Based on User's Logic) ---
function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  // Filtering logic based on user's request
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-4 sm:mb-0">
          <ShoppingBag className="w-7 h-7 mr-2 text-indigo-600" />
          Grocery List
        </h2>
        
        {/* Filter Dropdown */}
        <div className="relative inline-block w-full sm:w-auto">
          <select
            name="filter"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="appearance-none block w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 shadow-sm"
          >
            <option value="All">All Categories</option>
            {categories.filter(c => c !== "All").map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Item List */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-6">
        <ul className="Items divide-y divide-gray-100">
          {itemsToDisplay.length > 0 ? (
            itemsToDisplay.map((item) => (
              <Item
                key={item.id}
                name={item.name}
                category={item.category}
              />
            ))
          ) : (
            <li className="p-6 text-center text-gray-500 italic">
              No items found in the "{selectedCategory}" category.
            </li>
          )}
        </ul>
      </div>
      
      <p className="mt-4 text-sm text-gray-500 text-center">
        Showing {itemsToDisplay.length} of {items.length} total items.
      </p>
    </div>
  );
}

// --- 3. Main App Component ---
export default function App() {
  // Assume the category filter will always be the same, 
  // but the list of items can be managed here.
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-indigo-600 p-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-extrabold text-white text-center tracking-wider">
            Shopping List Manager
          </h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-6">
        <ShoppingList items={initialItems} />
      </main>
    </div>
  );
}

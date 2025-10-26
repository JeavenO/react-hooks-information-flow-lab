import React from "react";

// Filter receives the callback (onCategoryChange) and the current state value (selectedCategory) as props
function Filter({ onCategoryChange, selectedCategory }) {
  // We no longer need local state here, we just invoke the callback passed from the parent
  
  return (
    <div className="Filter">
      {/* Attach the parent's callback to onChange and bind the value to the parent's state */}
      <select name="filter" onChange={onCategoryChange} value={selectedCategory}>
        <option value="All">Filter by category</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>
  );
}

export default Filter;
import {
  CookingPot,
  Grid2x2,
  Leaf,
  Package,
  Store,
} from "lucide-react";

import "./SearchFilters.css";

const FILTERS = [
  { key: "all", label: "All", icon: Grid2x2 },
  { key: "whole", label: "Whole", icon: Leaf },
  { key: "generic", label: "Generic", icon: Package },
  { key: "prepared", label: "Prepared", icon: CookingPot },
  { key: "brand", label: "Brand", icon: Store },
];

export default function SearchFilters({ foods, filter, setFilter }) {
  const counts = foods.reduce(
    (result, food) => {
      const key = food.type?.toLowerCase();

      result.all += 1;

      if (key && key in result) {
        result[key] += 1;
      }

      return result;
    },
    {
      all: 0,
      whole: 0,
      generic: 0,
      prepared: 0,
      brand: 0,
    }
  );

  return (
    <div className="SearchFilters" aria-label="Food result filters">
      {FILTERS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          className={filter === key ? "FilterChip Active" : "FilterChip"}
          onClick={() => setFilter(key)}
          aria-pressed={filter === key}
        >
          <Icon size={16} />
          <span>{label} ({counts[key]})</span>
        </button>
      ))}
    </div>
  );
}

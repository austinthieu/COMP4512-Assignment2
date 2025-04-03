import React from "react";

interface ItemListProps<T> {
  items: T[];
  selectedItem: T | null;
  setSelectedItem: (item: T) => void;
  getKey: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
  title: string;
}

const ItemList = <T,>({ items, selectedItem, setSelectedItem, getKey, renderItem, title }: ItemListProps<T>) => {
  return (
    <div className="w-1/4 bg-gray-800 rounded-lg p-4 shadow-lg">
      <h2 className="font-bold text-xl mb-4">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={getKey(item)}
            className={`py-2 px-3 rounded cursor-pointer hover:bg-gray-700 ${selectedItem && getKey(selectedItem) === getKey(item) ? "bg-indigo-600" : ""
              }`}
            onClick={() => setSelectedItem(item)}
          >
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;

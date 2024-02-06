import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';

export default function Autocomplete({ fetchUrl }) {
  const [inputItems, setInputItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      setItems(data.results.map((item) => item.name));
    };

    fetchItems();
  }, [fetchUrl]);

  const {
    isOpen,
    selectedItem,
    getInputProps,
    getComboboxProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
  });

  return (
    <div>
      <label {...getLabelProps()}>Choose an item:</label>
      <div {...getComboboxProps()}>
        <input {...getInputProps()} />
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}
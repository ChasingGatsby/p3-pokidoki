import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';

export default function Search({ fetchUrl }) {
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

  // const {
  //   isOpen,
  //   selectedItem,
  //   getInputProps,
  //   getComboboxProps,
  //   getItemProps,
  //   getLabelProps,
  //   getMenuProps,
  //   highlightedIndex,
  // } = useCombobox({
  //   items: inputItems,
  //   onInputValueChange: ({ inputValue }) => {
  //     setInputItems(
  //       items.filter((item) =>
  //         item.toLowerCase().startsWith(inputValue.toLowerCase())
  //       )
  //     );
  //   },
  // });

  return (
    // <div>
    //   <label {...getLabelProps()}>Choose an item:</label>
    //   <div {...getComboboxProps()}>
    //     <input {...getInputProps()} />
    //   </div>
    //   <ul {...getMenuProps()}>
    //     {isOpen &&
    //       inputItems.map((item, index) => (
    //         <li
    //           style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
    //           key={`${item}${index}`}
    //           {...getItemProps({ item, index })}
    //         >
    //           {item}
    //         </li>
    //       ))}
    //   </ul>
    // </div>
    <div className="container m-5">
    <form>
      <div className="form-group my-3">
        <label htmlFor="exampleInputName">Your Names</label>
        <input
          type="name"
          className="form-control"
          id="exampleInputName"
          aria-describedby="NameHelp"
          placeholder="Enter your name"
          style={{ width: "60%" }}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          style={{ width: "60%" }}
        />
      </div>
      <div className="input-group d-block">
        <label htmlFor="exampleInputMessage"> Your Message: </label>
        <div className="input-group-prepend"></div>
        <textarea
          className="form-control mb-2"
          aria-label="With textarea"
          defaultValue={""}
          style={{ width: "500px" }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
  );
}
import React, { useState, useEffect } from "react";

// Data store to Local Storage
const getLocalData = () => {
  const list = localStorage.getItem("todoList");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const TodoList = () => {
  const [inputData, setInputData] = useState(" ");
  const [item, setItem] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState(" ");
  const [toggleButton, setToggleButton] = useState(false);

  // Add the items function

  const addItem = () => {
    if (!inputData) {
      alert("Plz input Data");
    } else if (inputData && toggleButton) {
      setItem(
        item.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItem([...item, myNewInputData]);
      setInputData("");
    }
  };

  // Delete the items function

  const deleteItem = (index) => {
    const updatedItem = item.filter((curElem) => {
      return curElem.id !== index;
    });
    setItem(updatedItem);
  };

  // Remove All

  const removeAll = () => {
    setItem([]);
  };

  // Add to Local Storage

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(item));
  }, [item]);

  // Edit the Items

  const editItem = (index) => {
    const edit_todo_item = item.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(edit_todo_item.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  return (
    <>
      <div className="main-div" style={{ textAlign: "center" }}>
        <p>😍Add Your List Item</p>
        <div className="addItems">
          <input
            type="text"
            placeholder="👍 Add Item"
            value={inputData}
            onChange={(event) => setInputData(event.target.value)}
          />
          {toggleButton ? (
            <button onClick={addItem}>Edit</button>
          ) : (
            <button onClick={addItem}>Add</button>
          )}
        </div>
        <div className="showItems">
          {item.map((curElem) => {
            return (
              <div
                className="eachItem"
                key={curElem.id}
                style={{ paddingTop: "20px" }}
              >
                <span style={{ paddingRight: "50px" }}>{curElem.name}</span>
                <i
                  className="fas fa-edit add-btn"
                  onClick={() => editItem(curElem.id)}
                  style={{ paddingRight: "5px", color: "green" }}
                ></i>
                <i
                  className="fas fa-trash add-btn"
                  onClick={() => deleteItem(curElem.id)}
                  style={{ color: "red" }}
                ></i>
              </div>
            );
          })}
        </div>
        <div className="addItemsButton" style={{ paddingTop: "20px" }}>
          <button onClick={removeAll}>Remove All</button>
        </div>
      </div>
    </>
  );
};

export default TodoList;

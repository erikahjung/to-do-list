//NOTE: the page will pretty much print 2x if you try running the dev server with a "bundle" folder from webpack in this project... 
// you can just delete the "bundle" folder if there is one before running the dev server again
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');

  const inputLabel = document.createElement('label');
  inputLabel.innerHTML = 'Add something to do: ';
  root.appendChild(inputLabel);

  const input = document.createElement('input');
  root.appendChild(input);

  const addButton = document.createElement('button');
  addButton.innerHTML = 'Add';
  addButton.setAttribute('class', 'addButton');
  root.appendChild(addButton);

  const list = document.createElement('ul');
  root.appendChild(list);

  function updateList (itemsArray) {
    if (!itemsArray.length) {return}
    for (let i = 0; i < itemsArray.length; i++) {
      const itemObj = itemsArray[i];

      const item = document.createElement('p');
      item.innerHTML = itemObj.item;

      const updateButton = document.createElement('button');
      updateButton.innerHTML = 'Update';
      updateButton.setAttribute('class', 'updateButton');
      updateButton.addEventListener('click', () => updateItem(itemObj._id));

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', 'deleteButton');
      deleteButton.innerHTML = 'Delete';
      deleteButton.addEventListener('click', () => deleteItem(itemObj._id));

      const listItem = document.createElement('li');
      listItem.setAttribute('id', itemObj._id);
      listItem.appendChild(item);
      listItem.appendChild(updateButton);
      listItem.appendChild(deleteButton);
      list.appendChild(listItem);
    };
  };

  function getItems () {
    fetch('/todo')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        updateList(data);
      })
      .catch(err => console.log(err));
  };
  getItems();

  function addItem () {
    if (!input.value || addButton.disabled) {return}
    fetch('/todo', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item: input.value
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        updateList([data]);

        input.value = '';
      })
      .catch(err => console.log(err));
  };

  function updateItem (id) {
    // console.log(id);
    const toggleButtons = () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button) => {
        button.disabled = !button.disabled;
      })
    }
    toggleButtons();

    const cancel = () => {
      toggleButtons();
      tempDiv.remove();
    }

    const tempInput = document.createElement('input');
    const confirmButton = document.createElement('button');
    confirmButton.innerHTML = 'Confirm';
    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel';

    const tempDiv = document.createElement('div');
    tempDiv.appendChild(tempInput);
    tempDiv.appendChild(confirmButton);
    tempDiv.appendChild(cancelButton);

    const currItem = document.getElementById(`${id}`);
    currItem.appendChild(tempDiv);

    confirmButton.addEventListener('click', () => {
      if (!tempInput.value) {return}
      fetch('/todo', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        item: tempInput.value
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const el = currItem.querySelector('p');
        el.innerHTML = data.item;

        cancel();
      })
      .catch(err => console.log(err));
    })

    cancelButton.addEventListener('click', () => {
      cancel();
    })
  };

  function deleteItem (id) {
    // console.log(id);
    fetch('/todo', {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        
        const deleteItem = document.getElementById(`${id}`);
        deleteItem.remove();
      })
      .catch(err => console.log(err));
  };

  addButton.addEventListener('click', addItem);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  })
});
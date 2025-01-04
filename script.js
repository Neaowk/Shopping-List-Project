const itemInput = document.getElementById("item-input");
        const addUpdateBtn = document.getElementById("add-update-btn");
        const filterInput = document.getElementById("filter-input");
        const shoppingList = document.getElementById("shopping-list");
        const clearAllBtn = document.getElementById("clear-all-btn");

        let editingItem = null;

        // Add or Update Item
        addUpdateBtn.addEventListener("click", () => {
            const newItem = itemInput.value.trim();
            if (!newItem) return alert("Enter an item!");

            if (editingItem) {
                // Update existing item
                editingItem.textContent = newItem;
                addDeleteButton(editingItem);
                addUpdateBtn.textContent = "+ Add Item";
                addUpdateBtn.className = "add";
                editingItem = null;
            } else {
                // Add new item
                const listItem = document.createElement("li");
                listItem.textContent = newItem;
                addDeleteButton(listItem);
                shoppingList.appendChild(listItem);
            }

            itemInput.value = "";
        });

        // Add delete button to an item
        function addDeleteButton(item) {
            const deleteBtn = document.createElement("span");
            deleteBtn.innerHTML = "&#10006;";
            deleteBtn.className = "delete-btn";
            deleteBtn.onclick = () => deleteItem(deleteBtn);
            item.appendChild(deleteBtn);
        }

        // Delete Item
        function deleteItem(btn) {
            const listItem = btn.parentNode;
            shoppingList.removeChild(listItem);
        }

        // Filter Items
        filterInput.addEventListener("input", () => {
            const filterText = filterInput.value.toLowerCase();
            [...shoppingList.children].forEach((li) => {
                const itemText = li.textContent.toLowerCase().replace("\u2716", "").trim();
                li.style.display = itemText.includes(filterText) ? "" : "none";
            });
        });

        // Clear All Items
        clearAllBtn.addEventListener("click", () => {
            shoppingList.innerHTML = "";
        });

        // Edit an Item
        shoppingList.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                editingItem = e.target;
                itemInput.value = editingItem.textContent.replace("\u2716", "").trim();
                addUpdateBtn.textContent = "🖊 Update Item";
                addUpdateBtn.className = "update";
            }
        });
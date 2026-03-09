(() => {
    const form = document.getElementById("todoForm");
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const list = document.getElementById("todoList");
    const emptyMsg = document.getElementById("emptyMsg");
    const submitBtn = document.getElementById("submitBtn");

    let editItem = null;

    // Helper: Disable/Enable all buttons in the list
    const toggleButtons = (disabled) => {
        const buttons = list.querySelectorAll("button");
        buttons.forEach(btn => btn.disabled = disabled);
    };

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const age = ageInput.value.trim();

        if (name === "" || age === "") {
            alert("Please enter name and age");
            return;
        }

        if (editItem) {
            // Update mode
            editItem.querySelector(".text").innerText = `${name} - ${age}`;
            editItem = null;
            submitBtn.textContent = "Create";
            toggleButtons(false); // Re-enable other actions
        } else {
            // Create mode
            emptyMsg.style.display = "none";
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <span class="text">${name} - ${age}</span>
                <div>
                    <button class="btn btn-sm btn-warning editBtn">Edit</button>
                    <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
                </div>
            `;
            list.appendChild(li);
        }

        nameInput.value = "";
        ageInput.value = "";
    });

    list.addEventListener("click", function (e) {
        const li = e.target.closest("li");
        if (!li) return;

        // DELETE
        if (e.target.classList.contains("deleteBtn")) {
            li.remove();
            if (list.children.length === 0) emptyMsg.style.display = "block";
        }

        // EDIT
        if (e.target.classList.contains("editBtn")) {
            const text = li.querySelector(".text").innerText.split(" - ");
            nameInput.value = text[0];
            ageInput.value = text[1];

            editItem = li;
            submitBtn.textContent = "Update";

            // Disable other buttons to lock the current action
            toggleButtons(true);
        }
    });
})();
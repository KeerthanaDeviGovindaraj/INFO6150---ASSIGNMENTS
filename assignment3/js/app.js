document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#studentTable tbody");
    const submitBtn = document.getElementById("submitBtn");
    const addBtn = document.getElementById("addBtn");
    let studentCount = 3;

    function updateSubmitButton() {
        const checked = document.querySelectorAll(".rowCheckbox:checked");
        if (checked.length > 0) {
            submitBtn.disabled = false;
            submitBtn.classList.add("enabled");
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove("enabled");
        }
    }

   function renumberStudents() {
        [...tableBody.rows].forEach((row, i) => {
            if (!row.classList.contains("detailsRow")) {
                row.cells[2].innerText = "Student " + (i + 1);
                row.cells[3].innerText = "Teacher " + (i + 1);
            }
        });
        studentCount = [...tableBody.querySelectorAll("tr:not(.detailsRow)")].length;
    }

    addBtn.addEventListener("click", () => {
        try {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td><input type="checkbox" class="rowCheckbox"></td>
            <td><span class="arrow">&#x25BC;</span></td>
            <td>Student ${studentCount + 1}</td>
            <td>Teacher ${studentCount + 1}</td>
            <td>Approved</td>
            <td>Fall</td>
            <td>TA</td>
            <td>${Math.floor(10000 + Math.random() * 90000)}</td>
            <td>100%</td>
            <td class="deleteCol"></td>
            <td class="editCol"></td>
        `;
        renumberStudents();
        alert(`Student ${studentCount} Record added successfully`);}
            catch (err) {
                            alert ("Error : Failed. Please try again");
            }
    });

    tableBody.addEventListener("change", (e) => {
        if (e.target.classList.contains("rowCheckbox")) {
            const row = e.target.closest("tr");
            if (e.target.checked) {
                row.classList.add("highlight");
                row.querySelector(".deleteCol").innerHTML = '<button class="deleteBtn">Delete</button>';
                row.querySelector(".editCol").innerHTML = '<button class="editBtn">Edit</button>';
            } else {
                row.classList.remove("highlight");
                row.querySelector(".deleteCol").innerHTML = "";
                row.querySelector(".editCol").innerHTML = "";
            }
            updateSubmitButton();
        }
    });

    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("deleteBtn")) {
            const row = e.target.closest("tr");
            const studentName = row.cells[2].innerText;
            let nextRow = row.nextElementSibling;
            if (nextRow && nextRow.classList.contains("detailsRow")) {
                nextRow.remove();
            }
            row.remove();
            renumberStudents();
            alert(`${studentName} Record deleted successfully`);
            updateSubmitButton();
        }

        if (e.target.classList.contains("editBtn")) {
            const row = e.target.closest("tr");
            const studentName = row.cells[2].innerText;
            const newData = prompt(`Edit details of ${studentName}:`, "");
            if (newData && newData.trim() !== "") {
                alert(`${studentName} data updated successfully`);
            }
        }

        if (e.target.classList.contains("arrow")) {
            const row = e.target.closest("tr");
            const studentName = row.cells[2].innerText;
            let nextRow = row.nextElementSibling;

            if (nextRow && nextRow.classList.contains("detailsRow")) {
                nextRow.remove();
                e.target.innerHTML = "&#x25BC;"; // down arrow
            } else {
                const detailsRow = tableBody.insertRow(row.rowIndex);
                detailsRow.classList.add("detailsRow");
                const colCount = row.cells.length;
                detailsRow.innerHTML = `
                    <td colspan="${colCount}">
                        <b>${studentName} Details:</b><br>
                        Award Details: Honors Student<br>
                        Semester: Fall 1-2024 (TA)<br>
                        Comments: Outstanding<br>
                        Award Status: A
                    </td>
                `;
                e.target.innerHTML = "&#x25B2;"; // up arrow
            }
        }
    });
});

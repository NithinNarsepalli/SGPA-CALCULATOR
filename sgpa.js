    
        let subjectCount = 1;

        function addSubject() {
            const table = document.querySelector("table tbody");
            const newRow = createSubjectRow();
            table.appendChild(newRow);
            updateSubjectNumbers();
        }

        function createSubjectRow() {
            const newRow = document.createElement("tr");
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);
            const cell5 = newRow.insertCell(4);

            cell1.innerText = ++subjectCount;
            cell2.innerHTML = `<input type="text" name="subjectName" placeholder="Enter Subject Name">`;
            cell3.innerHTML = `<input type="number" name="credits" placeholder="Credits">`;
            cell4.innerHTML = `
                <select name="gpa">
                    <option value="10">S</option>
                    <option value="9">A</option>
                    <option value="8">B</option>
                    <option value="7">C</option>
                    <option value="6">D</option>
                    <option value="5">E</option>
                    <option value="0">F</option>
                    <option value="0">AB</option>
                </select>`;
            cell5.innerHTML = `<button class="delete-button" onclick="deleteRow(this)">Delete</button>`;

            return newRow;
        }

        function deleteRow(button) {
            const row = button.parentNode.parentNode;
            const inputs = row.querySelectorAll('input, select');

            if (row.rowIndex === 1) {
                // If it's the first row, just empty the details
                inputs.forEach(input => input.value = '');
            } else {
                // If it's any other row, remove the entire row
                row.parentNode.removeChild(row);
                updateSubjectNumbers();
            }
        }

        function updateSubjectNumbers() {
            const rows = document.querySelectorAll("table tbody tr");
            subjectCount = 1;

            rows.forEach(row => {
                const numberCell = row.cells[0];
                numberCell.innerText = subjectCount++;
            });
        }

        function validateInputs() {
            const rows = document.querySelectorAll("table tbody tr");
            let isValid = true;
            const errorMessages = [];

            rows.forEach(row => {
                const creditsInput = row.querySelector("input[name='credits']");
                const credits = parseFloat(creditsInput.value);

                if (isNaN(credits) || credits < 0) {
                    isValid = false;
                    errorMessages.push("Please enter a valid positive number for credits.");
                    highlightError(row);
                } else {
                    removeErrorHighlight(row);
                }
            });

            displayErrorMessages(errorMessages);
            return isValid;
        }

        function highlightError(row) {
            row.style.backgroundColor = "#ffe6e6"; // Light red background for error
        }

        function removeErrorHighlight(row) {
            row.style.backgroundColor = ""; // Remove error background
        }

        function displayErrorMessages(messages) {
            const errorContainer = document.getElementById('errorMessages');
            errorContainer.innerHTML = '';

            if (messages.length > 0) {
                messages.forEach(message => {
                    const errorMessage = document.createElement('p');
                    errorMessage.className = 'error-message';
                    errorMessage.innerText = message;
                    errorContainer.appendChild(errorMessage);
                });
            }
        }

        function clearErrorMessages() {
            const errorContainer = document.getElementById('errorMessages');
            errorContainer.innerHTML = '';
        }

        function calculateSGPA() {
            clearErrorMessages();

            if (!validateInputs()) {
                return;
            }

            const rows = document.querySelectorAll("table tbody tr");
            let totalGradePoints = 0;
            let totalCredits = 0.0;

            for (let i = 0; i < rows.length; i++) {
                const creditsInput = rows[i].querySelector("input[name='credits']");
                const credits = parseFloat(creditsInput.value);

                if (!isNaN(credits)) {
                    totalCredits += credits;

                    const gpa = parseInt(rows[i].querySelector("select[name='gpa']").value);
                    totalGradePoints += credits * gpa;
                }
            }

            const sgpa = (totalGradePoints / totalCredits).toFixed(2);
            const sgpaMessage = document.getElementById('sgpaMessage');
            const totalCreditsElement = document.getElementById('totalCredits');

            sgpaMessage.innerText = `SGPA Achieved: ${sgpa} (APPROX)`;
            totalCreditsElement.innerText = totalCredits.toFixed(1);
        }
    
        var loader= document.getElementById("preloader");
        window.addEventListener(
        "load",function(){
        loader.style.display="none";
    }
    )
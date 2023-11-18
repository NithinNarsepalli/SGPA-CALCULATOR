let semesterCount = 1;

function addSemester() {
    const table = document.querySelector("table tbody");
    const newRow = table.insertRow(table.rows.length);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    semesterCount++;
    cell1.innerText = semesterCount;
    cell2.innerHTML = `<input type="number" name="credits" id="credits${semesterCount}" placeholder="Credits">`;
    cell3.innerHTML = `<input type="number" name="sgpa" id="sgpa${semesterCount}" placeholder="SGPA">`;
    cell4.innerHTML = `<button class="delete-button" onclick="deleteRow(this)">Delete</button>`;
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    const inputs = row.querySelectorAll('input');

    if (row.rowIndex === 1) {
        // If it's the first row, just empty the details
        inputs.forEach(input => input.value = '');
    } else {
        // If it's any other row, remove the entire row
        row.parentNode.removeChild(row);

        // Update the semesterCount for correct numbering
        updateSemesterNumbers();
    }
}

function updateSemesterNumbers() {
    const rows = document.querySelectorAll("table tbody tr");
    semesterCount = 0;

    rows.forEach(row => {
        const numberCell = row.cells[0];
        numberCell.innerText = ++semesterCount;
    });
}

function validateCredits(credits) {
    return credits > 0;
}

function validateSGPA(sgpa) {
    return sgpa >= 0 && sgpa <= 10;
}

function displayError(row, message) {
    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    errorMessage.innerText = message;

    row.appendChild(errorMessage);
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorMessage => errorMessage.remove());
}

function calculateCGPA() {
    clearErrors();

    const rows = document.querySelectorAll("table tbody tr");
    let totalQualityPoints = 0;
    let totalCredits = 0.0;

    for (let i = 0; i < rows.length; i++) {
        const creditsInput = rows[i].querySelector("input[name='credits']");
        const sgpaInput = rows[i].querySelector("input[name='sgpa']");

        const credits = parseFloat(creditsInput.value);
        const sgpa = parseFloat(sgpaInput.value);

        if (!isNaN(credits) && validateCredits(credits) && !isNaN(sgpa) && validateSGPA(sgpa)) {
            totalCredits += credits;
            totalQualityPoints += credits * sgpa;
        } else {
            // Display error messages for invalid input
            if (isNaN(credits) || !validateCredits(credits)) {
                displayError(rows[i], 'Invalid Credits. Please enter a positive number.');
            }

            if (isNaN(sgpa) || !validateSGPA(sgpa)) {
                displayError(rows[i], 'Invalid SGPA. Please enter a number between 0 and 10.');
            }
        }
    }

    const cgpa = (totalQualityPoints / totalCredits).toFixed(2);
    const cgpaMessage = document.getElementById('cgpaMessage');
    const totalCreditsElement = document.getElementById('totalCredits');

    cgpaMessage.innerText = `CGPA Achieved: ${isNaN(cgpa) ? "0.00" : cgpa}  (APPROX)`;
    totalCreditsElement.innerText = totalCredits.toFixed(1);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('resultModal');
    const taxResult = document.getElementById('taxResult');
    const closeBtn = document.querySelector('.close');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const income = parseFloat(form.income.value);
        const extraIncome = parseFloat(form.extraIncome.value) || 0;
        const deductions = parseFloat(form.deductions.value) || 0;
        const age = form.age.value;
        let tax = 0;

        if (income < 0 || extraIncome < 0 || deductions < 0) {
            displayError(form, "Please enter positive values.");
            return;
        }

        if (!income || !age) {
            displayError(form, "Income and age are required fields.");
            return;
        }

        let taxableIncome = income + extraIncome - deductions - 8;
        if (taxableIncome > 0) {
            if (age === "<40") {
                tax = 0.3 * taxableIncome;
            } else if (age === "40-60") {
                tax = 0.4 * taxableIncome;
            } else {
                tax = 0.1 * taxableIncome;
            }
        }

        taxResult.innerHTML = `Tax Amount: ${tax.toFixed(2)} Lakhs`;
        modal.style.display = "block";
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    function displayError(form, message) {
        const errorIcons = form.querySelectorAll('.error-icon');
        errorIcons.forEach(icon => icon.style.display = "none");
        alert(message);
    }
});

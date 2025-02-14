// nurseValidation.js

function validateNurseForm() {
    const formElements = {
        nurseName: document.getElementById('nurseName'),
        serviceDescription: document.getElementById('serviceDescription'),
        servicePrice: document.getElementById('servicePrice'),
        phoneNumber: document.getElementById('phoneNumber')
    };

    clearValidationState();
    let isValid = true;

    // Validate each field
    if (!validateName(formElements.nurseName)) isValid = false;
    if (!validateDescription(formElements.serviceDescription)) isValid = false;
    if (!validatePrice(formElements.servicePrice)) isValid = false;
    if (!validatePhone(formElements.phoneNumber)) isValid = false;

    return isValid;
}

function validateName(input) {
    if (!input.value.trim()) {
        showError(input, 'Nurse name is required');
        return false;
    }
    removeError(input);
    return true;
}

function validateDescription(input) {
    const description = input.value.trim();
    if (!description) {
        showError(input, 'Service description is required');
        return false;
    }
    if (description.length < 10) {
        showError(input, 'Description must be at least 10 characters');
        return false;
    }
    removeError(input);
    return true;
}

function validatePrice(input) {
    const price = parseFloat(input.value);
    if (!input.value || isNaN(price) || price <= 0) {
        showError(input, 'Please enter a valid price greater than 0');
        return false;
    }
    removeError(input);
    return true;
}

function validatePhone(input) {
    const phoneRegex = /^\d{10}$/;
    if (!input.value.trim()) {
        showError(input, 'Phone number is required');
        return false;
    }
    if (!phoneRegex.test(input.value.trim())) {
        showError(input, 'Please enter a valid 10-digit phone number');
        return false;
    }
    removeError(input);
    return true;
}

function showError(input, message) {
    input.classList.add('is-invalid');
    const errorDiv = input.parentElement.querySelector('.invalid-feedback') 
        || createErrorElement(message);
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
}

function createErrorElement(message) {
    const div = document.createElement('div');
    div.className = 'invalid-feedback';
    div.textContent = message;
    return div;
}

function removeError(input) {
    input.classList.remove('is-invalid');
    const errorDiv = input.parentElement.querySelector('.invalid-feedback');
    if (errorDiv) errorDiv.remove();
}

function clearValidationState() {
    const form = document.getElementById('serviceForm');
    form.classList.remove('was-validated');
    document.querySelectorAll('.is-invalid').forEach(input => removeError(input));
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('serviceForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateNurseForm()) {
            // Process form submission
            handleFormSubmission(form);
        }
    });
});

function handleFormSubmission(form) {
    const formData = {
        nurseName: document.getElementById('nurseName').value.trim(),
        serviceDescription: document.getElementById('serviceDescription').value.trim(),
        servicePrice: document.getElementById('servicePrice').value,
        phoneNumber: document.getElementById('phoneNumber').value.trim()
    };

    // Create and append new service card
    const serviceList = document.getElementById('serviceList');
    const newService = createServiceCard(formData);
    serviceList.appendChild(newService);

    // Reset form and show success message
    form.reset();
    showSuccessMessage(form);
}

function createServiceCard(data) {
    const div = document.createElement('div');
    div.className = 'card mt-3';
    div.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${data.nurseName}</h5>
            <p class="card-text">${data.serviceDescription}</p>
            <p class="card-text"><strong>Price:</strong> R${data.servicePrice}</p>
            <p class="card-text"><strong>Phone:</strong> ${data.phoneNumber}</p>
        </div>
    `;
    return div;
}

function showSuccessMessage(form) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success mt-3';
    alert.textContent = 'Service listed successfully!';
    form.appendChild(alert);
    setTimeout(() => alert.remove(), 2000);
}
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        let isValid = true;

        const patientName = document.getElementById('patientName');
        const medicationList = document.querySelectorAll('#medicationList input');
        const collectionLocation = document.getElementById('collectionLocation');
        const deliveryDate = document.getElementById('deliveryDate');
        const deliveryAddress = document.getElementById('deliveryAddress');

       // Validate patient name (only letters and spaces)
       const nameRegex = /^[a-zA-Z\s]+$/;
       if (patientName.value.trim() === '' || !nameRegex.test(patientName.value.trim())) {
           isValid = false;
           alert('Patient Name is required and should contain only letters and spaces');
       }


        medicationList.forEach(medication => {
            if (medication.value.trim() === '') {
                isValid = false;
                alert('All Medication Names are required');
            }
        });

        if (collectionLocation.value.trim() === '') {
            isValid = false;
            alert('Collection Location is required');
        }

       // Validate delivery date (should be a valid date)
       if (deliveryDate.value.trim() === '' || isNaN(Date.parse(deliveryDate.value.trim()))) {
        isValid = false;
        alert('Delivery Date is required and should be a valid date');
    }

       // Validate delivery address (should not be empty)
       if (deliveryAddress.value.trim() === '') {
        isValid = false;
        alert('Delivery Address is required');
    }

  
        if (isValid) {
            event.preventDefault();
            // Display success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Form submitted successfully!';
            form.appendChild(successMessage);

            // Clear form fields
            form.reset();
        } else {
            event.preventDefault();
        }
    });


    // Add functionality to add more medication fields
    const addMedicationButton = document.getElementById('addMedication');
    addMedicationButton.addEventListener('click', function () {
        const medicationList = document.getElementById('medicationList');
        const newMedicationItem = document.createElement('li');
        newMedicationItem.className = 'list-group-item';
        newMedicationItem.innerHTML = '<input type="text" class="form-control" placeholder="Enter medication name">';
        medicationList.appendChild(newMedicationItem);
    });
});
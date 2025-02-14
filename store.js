
    // Function to load services from localStorage
    function loadServices() {
        const services = JSON.parse(localStorage.getItem('serviceList')) || [];
        const serviceList = document.getElementById('serviceList');
        serviceList.innerHTML = ''; // Clear existing list

        services.forEach((service, index) => {
            const li = document.createElement('li');
            li.textContent = service;
            
            // Optional: Add a remove button for each service
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.style.marginLeft = '10px';
            removeBtn.onclick = () => removeService(index);
            
            li.appendChild(removeBtn);
            serviceList.appendChild(li);
        });
    }

    // Function to add a new service
    function addService(service) {
        const services = JSON.parse(localStorage.getItem('serviceList')) || [];
        services.push(service);
        localStorage.setItem('serviceList', JSON.stringify(services));
        loadServices();
    }

    // Function to remove a service by index
    function removeService(index) {
        const services = JSON.parse(localStorage.getItem('serviceList')) || [];
        services.splice(index, 1);
        localStorage.setItem('serviceList', JSON.stringify(services));
        loadServices();
    }

    // Event listener for form submission (assuming you have a form to add services)
    document.getElementById('serviceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const serviceInput = document.getElementById('serviceInput');
        const service = serviceInput.value.trim();
        if (service) {
            addService(service);
            serviceInput.value = ''; // Clear input field
        }
    });

    // Load services on page load
    window.onload = loadServices;
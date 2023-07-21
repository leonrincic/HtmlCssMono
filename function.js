function getCustomersData() {
    const customersData = localStorage.getItem("customers");
    return customersData ? JSON.parse(customersData) : [];
}

function saveCustomersData(data) {
    localStorage.setItem("customers", JSON.stringify(data));
}   

function displayCustomers() {
    const customersTable = document.getElementById("customersTable");
    if (customersTable) {
        const customers = getCustomersData();

        customersTable.innerHTML = '';

        customersTable.innerHTML += `
            <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        `;

        customers.forEach((customer, index) => {
            const row = document.createElement("tr");

            const customerIdCell = document.createElement("td");
            customerIdCell.textContent = index + 1;
            row.appendChild(customerIdCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = customer.name;
            row.appendChild(nameCell);

            const emailCell = document.createElement("td");
            emailCell.textContent = customer.email;
            row.appendChild(emailCell);

            const phoneCell = document.createElement("td");
            phoneCell.textContent = customer.phone;
            row.appendChild(phoneCell);

            const actionsCell = document.createElement("td");

            const updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.addEventListener("click", function () {
                displayUpdateForm(customer, index);
            });
            actionsCell.appendChild(updateButton);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                deleteCustomerByIndex(index);
            });
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
            customersTable.appendChild(row);
        });
    }
}


// Function to add a new customer
function addCustomer(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const customers = getCustomersData();
    customers.push({ name, email, phone });
    saveCustomersData(customers);
    displayCustomers();

    document.getElementById("addCustomerForm").reset();
}



function updateCustomer(event) {
    event.preventDefault();
    const customerId = parseInt(document.getElementById("customerId").value) - 1;
    const updatedName = document.getElementById("updatedName").value;
    const updatedEmail = document.getElementById("updatedEmail").value;
    const updatedPhone = document.getElementById("updatedPhone").value;

    const customers = getCustomersData();
    if (customerId >= 0 && customerId < customers.length) {
        customers[customerId].name = updatedName;
        customers[customerId].email = updatedEmail;
        customers[customerId].phone = updatedPhone;
        saveCustomersData(customers);
        displayCustomers();

        document.getElementById("updateCustomerForm").reset();
    } else {
        alert("Invalid customer ID!");
    }
}

function deleteCustomer(event) {
    event.preventDefault();
    const customerIdToDelete = parseInt(document.getElementById("customerIdToDelete").value) - 1;

    const customers = getCustomersData();
    if (customerIdToDelete >= 0 && customerIdToDelete < customers.length) {
        customers.splice(customerIdToDelete, 1);
        saveCustomersData(customers);
        displayCustomers();

        document.getElementById("deleteCustomerForm").reset();
    } else {
        alert("Invalid customer ID!");
    }
}

document.getElementById("addCustomerForm").addEventListener("submit", addCustomer);
document.getElementById("updateCustomerForm").addEventListener("submit", updateCustomer);
document.getElementById("deleteCustomerForm").addEventListener("submit", deleteCustomer);

document.addEventListener("DOMContentLoaded", function () {
    displayCustomers();

    document.getElementById("addCustomerForm").addEventListener("submit", addCustomer);
    document.getElementById("updateCustomerForm").addEventListener("submit", updateCustomer);
    document.getElementById("deleteCustomerForm").addEventListener("submit", deleteCustomer);
});

function displayUpdateForm(customer, index) {
    document.getElementById("customerId").value = index + 1;
    document.getElementById("updatedName").value = customer.name;
    document.getElementById("updatedEmail").value = customer.email;
    document.getElementById("updatedPhone").value = customer.phone;
}

// Helper function to delete a customer by index
function deleteCustomerByIndex(index) {
    const customers = getCustomersData();
    if (index >= 0 && index < customers.length) {
        customers.splice(index, 1);
        saveCustomersData(customers);
        displayCustomers();
    }
}


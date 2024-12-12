export async function init(){
    // Check if the data already exists in localStorage
    let employees = JSON.parse(localStorage.getItem('employees'))
        
    // If localStorage is empty, fetch the data
    if (!employees) {
        try {
            // Fetch the data from 'employees.json'
            const response = await fetch('./data/employees.json')      
            // Parse the JSON data
            employees = await response.json();
            
            // Save the fetched data in localStorage for future use
            localStorage.setItem('employees', JSON.stringify(employees))

        } catch (error) {
            console.error('Error fetching employee data:', error)
            employees = [];  // Default to empty array in case of error
        }
    } 

    return employees;
}

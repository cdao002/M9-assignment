import {init} from "./modules/init.js"


// GET DOM ELEMENTS
let empTable    = document.querySelector('#employees')
let empCount    = document.querySelector('#empCount')
let arrEmployees = []


// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex
            // REMOVE EMPLOYEE FROM ARRAY
            arrEmployees.splice(rowIndex - 1, 1)   

        }
        localStorage.setItem('employees', JSON.stringify(arrEmployees))
        // UPDATE EMPLOYEE COUNT
        empCount.value = `(${arrEmployees.length})` 
        
    }
})

// BUILD THE EMPLOYEES GRID
async function buildGrid() {
    arrEmployees = await init();  // Fetch employee data

    if (arrEmployees.length === 0) {
        empTable.innerHTML = '<tr><td colspan="6">No employees available.</td></tr>';
        return;
    }

    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove()
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody')
    // empTable.innerHTML = ''
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (let employee of arrEmployees) {
        let row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${employee.empId}</td>
            <td>${employee.name}</td>
            <td>${employee.extension}</td>
            <td>${employee.email}</td>
            <td>${employee.title}</td>
            <td><button class="delete">Delete</button></td>    
            ` 
        tbody.appendChild(row);
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody)

    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${arrEmployees.length})`
}

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid()
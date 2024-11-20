import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Filter from './components/Filter';

function App() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [filterType, setFilterType] = useState('name');
    const [filterQuery, setFilterQuery] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/employees');
            setEmployees(response.data);
            setFilteredEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleFilterChange = (query, type) => {
        setFilterType(type);
        setFilterQuery(query);
        const filtered = employees.filter(employee =>
            employee[type].toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEmployees(filtered);
    };

    const handleEmployeeAdded = (newEmployee) => {
        setEmployees([...employees, newEmployee]);
        setFilteredEmployees([...employees, newEmployee]);
        alert("Employee added successfully!");
    };

    const handleEditClick = (employee) => {
        setEditingEmployee(employee);
    };

    const handleEmployeeUpdated = (updatedEmployee) => {
        const updatedList = employees.map(emp =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
        );
        setEmployees(updatedList);
        setFilteredEmployees(updatedList);
        setEditingEmployee(null);
        alert("Update successful!");
    };

    const handleDeleteClick = async (employeeId) => {
        try {
            await axios.delete(`http://localhost:8080/api/employees/${employeeId}`);
            const updatedList = employees.filter(emp => emp.id !== employeeId);
            setEmployees(updatedList);
            setFilteredEmployees(updatedList);
            alert("Employee deleted successfully!");
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <div className="app">
            <h1>Employee Management</h1>
            <Filter onFilterChange={handleFilterChange} filterType={filterType} />
            {editingEmployee ? (
                <EditEmployee
                    employee={editingEmployee}
                    onEmployeeUpdated={handleEmployeeUpdated}
                />
            ) : (
                <AddEmployee onEmployeeAdded={handleEmployeeAdded} />
            )}
            <EmployeeList
                employees={filteredEmployees}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
            />
        </div>
    );
}

export default App;

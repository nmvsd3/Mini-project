import React from 'react';
// import './EmployeeList.css';

function EmployeeList({ employees, onEditClick, onDeleteClick }) {
    return (
        <div className="employee-list">
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>
                                <button onClick={() => onEditClick(employee)}>Edit</button>
                                <button onClick={() => onDeleteClick(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;

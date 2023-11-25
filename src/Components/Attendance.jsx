import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Pankaj', attendance: {} },
    { id: 2, name: 'Ashwini', attendance: {} },
    //we can add here more data for test
  ]);

  const [attendanceSummary, setAttendanceSummary] = useState({
    totalPresent: 0,
    totalAbsent: 0,
    totalHalfDay: 0,
  });

  useEffect(() => {
    updateAttendanceSummary();
  }, [selectedDate, employees]);

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const updateAttendanceSummary = () => {
    const summary = {
      totalPresent: 0,
      totalAbsent: 0,
      totalHalfDay: 0,
    };

    employees.forEach((employee) => {
      const attendance = employee.attendance[selectedDate] || 'Absent';
      if (attendance === 'Present') {
        summary.totalPresent += 1;
      } else if (attendance === 'Half Day') {
        summary.totalHalfDay += 1;
      } else {
        summary.totalAbsent += 1;
      }
    });

    setAttendanceSummary(summary);
  };

  const markAttendance = (employeeId, status) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === employeeId) {
        const updatedAttendance = { ...employee.attendance, [selectedDate]: status };
        return { ...employee, attendance: updatedAttendance };
      }
      return employee;
    });

    setEmployees(updatedEmployees);
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-lg">
      <label className="block mb-4">
        <span className="text-gray-700">Select Date:</span>
        <input
          type="date"
          className="mt-1 block w-full border rounded-md p-2"
          value={selectedDate}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        />
      </label>

      <div className="mb-8 bg-white rounded-lg p-6 shadow-md">
  <h2 className="text-2xl font-bold mb-4">Attendance Summary</h2>
  <div className="grid grid-cols-3 gap-4">
    <div className="border p-4 rounded-md">
      <p className="text-lg font-semibold">Total Present</p>
      <p className="text-xl">{attendanceSummary.totalPresent}</p>
    </div>
    <div className="border p-4 rounded-md">
      <p className="text-lg font-semibold">Total Absent</p>
      <p className="text-xl">{attendanceSummary.totalAbsent}</p>
    </div>
    <div className="border p-4 rounded-md">
      <p className="text-lg font-semibold">Total Half Day</p>
      <p className="text-xl">{attendanceSummary.totalHalfDay}</p>
    </div>
  </div>
</div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Employee List</h2>
        {employees.map((employee) => (
          <div key={employee.id} className="mb-4">
            <p className="text-lg font-semibold">{employee.name}</p>
            <select
              value={employee.attendance[selectedDate] || 'Absent'}
              onChange={(e) => markAttendance(employee.id, e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Half Day">Half Day</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
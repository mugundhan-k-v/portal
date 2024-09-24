import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/userPageLayout'; 
import '../../css/user/inmatedetails.css';

const InmateDetailsPage = ({ facultyId, sidebarCollapsed }) => {
  const navigate = useNavigate();
  const [inmates, setInmates] = useState([]);

  useEffect(() => {
    // Fetch inmate data for the particular faculty ID
    const fetchInmates = async () => {
      try {
        const response = await fetch(`/api/inmates?facultyId=${facultyId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInmates(data);
      } catch (error) {
        console.error('Error fetching inmate data:', error);
      }
    };

    fetchInmates();
  }, [facultyId]);

  const handleAddClick = () => {
    navigate('/addinmate');
  };

  return (
    <PageLayout>
      <div className={`details-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="details-content">
          <h1>Inmate Details</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button className="add-button" onClick={handleAddClick}>
              Add <strong>+</strong>
            </button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Relation</th>
                  <th>Age</th>
                  <th>Aadhar No</th>
                  <th>Working</th>
                  <th>Employer</th>
                </tr>
              </thead>
              <tbody>
                {inmates.map((inmate, index) => (
                  <tr key={index}>
                    <td>{inmate.name}</td>
                    <td>{inmate.relation}</td>
                    <td>{inmate.age}</td>
                    <td>{inmate.aadharNo}</td>
                    <td>{inmate.working}</td>
                    <td>{inmate.employer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InmateDetailsPage;
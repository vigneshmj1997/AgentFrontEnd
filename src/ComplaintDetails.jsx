import React from "react";
import LoadingComponent from './LoadingComponent'

const ComplaintDetails = ({ data, loading }) => {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
    overflowY: "auto",
    maxHeight: "70vh",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#8A1538",
    fontFamily: 'Calibre, Arial, sans-serif'
  };

  const sectionStyle = {
    marginBottom: "16px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    fontFamily: 'Calibre, Arial, sans-serif'
  };

  const sectionHeadingStyle = {
    color: "#333",
    fontWeight: "bold",
    borderBottom: "2px solid #800080",
    paddingBottom: "4px",
    fontFamily: 'Calibre, Arial, sans-serif'
  };

  const detailStyle = {
    margin: "4px 0",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginRight: "5px",
  };

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: "1.2em",
    color: "#8A1538",
    fontFamily: 'Calibre, Arial, sans-serif'
  };

  const renderSection = (title, sectionData) => {
    if (!sectionData || Object.keys(sectionData).length === 0) return null;
    return (
      <div style={sectionStyle}>
        <h3 style={sectionHeadingStyle}><span style={{ textTransform: 'capitalize' }}>{title}</span></h3>
        {Object.entries(sectionData).map(([key, value]) => (
          <p key={key} style={detailStyle}>
            <span style={labelStyle}>{key.replace(/_/g, " ")}: </span>
            {typeof value === "object" && value !== null ? renderSection("", value) : value || "N/A"}
          </p>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <LoadingComponent/>
        </div>
      </div>
    );
  }

  if (!data) return <p>No data available</p>;

  return (
    <div dir="ltr" style={containerStyle}>
      <h3 style={headingStyle}>Request No. {data.person?.request_number || "N/A"}</h3>
      {renderSection("Person Details", data.person)}
      {renderSection("Job Details", {
        "Current Job Name": data.current_job_name,
        "New Job Name": data.new_job_name,
        "Education": data.education,
        "Current Salary": data.Current_salary,
        "New Company Salary": data.new_employer_salary,
        "New Company Sector": data.new_employer_sector,
      })}
      {renderSection("Current Company Profile", data.current_employer_profile)}
      {renderSection("New Company Profile", data.new_employer_profile)}
    </div>
  );
};

export default ComplaintDetails;

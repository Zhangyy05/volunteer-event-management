import React, { useState } from 'react';
import ReportFilter from '../components/ReportFilter';
import ReportTable from '../components/ReportTable';
import axios from 'axios';

const ReportPage = () => {
  const [reportData, setReportData] = useState([]);

  const handleFilter = async (filterCriteria) => {
    try {
      const res = await axios.post('/api/report', filterCriteria);
      setReportData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Event Report</h1>
      <ReportFilter onFilter={handleFilter} />
      <ReportTable reportData={reportData} />
    </div>
  );
};

export default ReportPage;

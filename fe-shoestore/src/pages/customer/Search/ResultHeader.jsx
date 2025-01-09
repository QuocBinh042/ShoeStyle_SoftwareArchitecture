import React, { useState,useEffect} from 'react';
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

const ResultsHeader = ({ resultsCount, keywword, onSortChange, currentSort }) => {
  const [selectedSort, setSelectedSort] = useState(currentSort || "Sort by");

  useEffect(() => {
    setSelectedSort(currentSort || "Sort by");
  }, [currentSort]);
  const items = [
    { key: '1', label: "Featured" },
    { key: '2', label: "Newest" },
    { key: '3', label: "Price: High-Low" },
    { key: '4', label: "Price: Low-High" },
  ];

  const handleMenuClick = (info) => {
    const sortOptions = {
      '1': "Featured",
      '2': "Newest", // Newest
      '3': "Price: High-Low", // Price: High-Low
      '4': "Price: Low-High", // Price: Low-High
    };

    const sortBy = sortOptions[info.key];
    setSelectedSort(sortBy);
    onSortChange(sortBy); 
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", background: '#F5F5F5', }}>
      <div style={{ padding: '0 20px' }}>
        <h3 style={{ margin: 0 }}>
          Search results <strong>{keywword}</strong> (<strong>{resultsCount}</strong>)
        </h3>
      </div>

      <Dropdown menu={{ items, onClick: handleMenuClick }}>
        <a onClick={(e) => e.preventDefault()}> {selectedSort} <DownOutlined /> </a>
      </Dropdown>
    </div>
  );
};

export default ResultsHeader;

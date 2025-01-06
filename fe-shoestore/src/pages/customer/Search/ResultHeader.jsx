import React from "react";

import { DownOutlined, } from "@ant-design/icons";
import { Dropdown } from "antd";

const ResultsHeader = ({ resultsCount, keywword }) => {
  const items = [
    {
      key: '1',
      label: "Featured"
    },
    {
      key: '2',
      label: "Newest"
    },
    {
      key: '3',
      label: "Price: High-Low"
    },
    {
      key: '4',
      label: "Price: Low-High"
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-between", background: '#F5F5F5', }}>
      <div style={{ padding: '0 20px' }}>
        <h3 style={{ margin: 0 }}>Search results for <strong>{keywword}</strong> (<strong>{resultsCount}</strong>) </h3>
      </div>

      <Dropdown menu={{ items, }}>
        <a onClick={(e) => e.preventDefault()}> Sort by <DownOutlined /> </a>
      </Dropdown>
    </div>
  );
};

export default ResultsHeader;

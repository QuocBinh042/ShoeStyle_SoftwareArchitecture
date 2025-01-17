import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";

const AddressSelector = () => {
  const [tinhList, setTinhList] = useState([]);
  const [quanList, setQuanList] = useState([]);
  const [phuongList, setPhuongList] = useState([]);

  const [selectedTinh, setSelectedTinh] = useState(null);
  const [selectedQuan, setSelectedQuan] = useState(null);
  const [selectedPhuong, setSelectedPhuong] = useState(null);
  // Fetch danh sách Tỉnh Thành
  useEffect(() => {
    fetch("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => response.json())
      .then((data) => {
        if (data.error === 0) {
          setTinhList(
            data.data.map((item) => ({
              value: item.id,
              label: item.full_name,
            }))
          );
        }
      });
  }, []);

  // Fetch danh sách Quận Huyện khi chọn Tỉnh
  useEffect(() => {
    if (selectedTinh) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error === 0) {
            setQuanList(
              data.data.map((item) => ({
                value: item.id,
                label: item.full_name,
              }))
            );
            setPhuongList([]); // Reset Phường Xã khi đổi Tỉnh
          }
        });
    }
  }, [selectedTinh]);

  useEffect(() => {
    if (selectedQuan) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error === 0) {
            setPhuongList(
              data.data.map((item) => ({
                value: item.id,
                label: item.full_name,
              }))
            );
          }
        });
    }
  }, [selectedQuan]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "150px auto", alignItems: "center", gap: "10px" }}>
        <h3 style={{ margin: 0, textAlign: "left" }}>Tỉnh</h3>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Chọn Tỉnh"
          options={tinhList}
          value={selectedTinh}
          onChange={(value) => {
            setSelectedTinh(value);
            setSelectedQuan(null);
          }}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "150px auto", alignItems: "center", gap: "10px" }}>
        <h3 style={{ margin: 0, textAlign: "left" }}>Quận/Huyện</h3>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Chọn Quận"
          options={quanList}
          value={selectedQuan}
          onChange={(value) => setSelectedQuan(value)}
          disabled={!selectedTinh}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "150px auto", alignItems: "center", gap: "10px" }}>
        <h3 style={{ margin: 0, textAlign: "left" }}>Phường/Xã</h3>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Chọn Phường"
          options={phuongList}
          onChange={(value) => setSelectedPhuong(value)}
          disabled={!selectedQuan}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "150px auto", alignItems: "center", gap: "10px" }}>
        <h3 style={{ margin: 0, textAlign: "left" }}>Tên đường, số nhà</h3>
        <Input
          disabled={!selectedPhuong}
          style={{ width: "100%" }}
          placeholder="Nhập tên đường, số nhà"
        />
      </div>
    </div>

  );
};

export default AddressSelector;

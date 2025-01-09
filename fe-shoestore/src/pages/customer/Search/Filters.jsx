import { Collapse, Checkbox, Radio, Row, Button } from "antd";
import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { fetchFilters } from "../../../services/searchService";

const Filters = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
    priceRange: null,
    // sortBy:null
  });

  useEffect(() => {
    const loadFilters = async () => {
      const data = await fetchFilters();
      if (data) {
        setCategories(data.categories || []);
        setBrands(data.brands || []);
      }
    };

    loadFilters();
  }, []);

  const priceRanges = [
    { label: "Under 50", value: "<50" },
    { label: "50 to 100", value: "50-100" },
    { label: "100 to 150", value: "100-150" },
    { label: "150 to 200", value: "150-200" },
    { label: "200 to 300", value: "200-300" },
    { label: "Over 300", value: ">300" },
  ];

  const colors = ["RED", "BLUE", "GREEN", "YELLOW", "BLACK", "PURPRE", "ORANGE", "PINK"];
  const sizes = [38, 37, 36, 39, 40, 41, 42, 43, 44];

  // Cập nhật trạng thái bộ lọc và gọi callback
  const updateFilters = (key, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev, [key]: value };
      onFilterChange(updatedFilters); // Gọi callback sau khi cập nhật bộ lọc
      return updatedFilters;
    });
  };
  

  const items = [
    {
      key: "1",
      label: "Categories",
      children: (
        <Checkbox.Group
          className="filters__categories"
          onChange={(values) => updateFilters("categories", values)}
        >
          {categories.map((category) => (
            <div className="filters__categories-item" key={category.categoryID}>
              <Checkbox
                className="filters__categories-item-checkbox"
                value={category.categoryID}
              >
                {category.name}
              </Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: "2",
      label: "Price",
      children: (
        <Radio.Group
          className="filters__prices"
          onChange={(e) => updateFilters("priceRange", e.target.value)}
        >
          {priceRanges.map((item) => (
            <Radio value={item.value} key={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      ),
    },
    {
      key: "3",
      label: "Brand",
      children: (
        <Checkbox.Group
          className="filters__brands"
          onChange={(values) => updateFilters("brands", values)}
        >
          {brands.map((brand) => (
            <Checkbox value={brand.brandID} key={brand.brandID}>
              {brand.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: "4",
      label: "Color",
      children: (
        <Row gutter={[8, 8]}>
          {colors.map((color) => (
            <Button
              key={color}
              className={`filters__colors-item ${selectedFilters.colors.includes(color) ? "selected" : ""
                }`}
              style={{ backgroundColor: color }}
              onClick={() => {
                const newColors = selectedFilters.colors.includes(color)
                  ? selectedFilters.colors.filter((c) => c !== color)
                  : [...selectedFilters.colors, color];
                updateFilters("colors", newColors);
              }}
            />
          ))}
        </Row>
      ),
    },
    {
      key: "5",
      label: "Size",
      children: (
        <Row gutter={[8, 8]}>
          {sizes.map((size) => (
            <Button
              className={`filters_sizes-item ${selectedFilters.sizes.includes(size) ? "selected" : ""
                }`}
              key={size}
              onClick={() => {
                const newSizes = selectedFilters.sizes.includes(size)
                  ? selectedFilters.sizes.filter((s) => s !== size)
                  : [...selectedFilters.sizes, size];
                updateFilters("sizes", newSizes);
              }}
            >
              {size}
            </Button>
          ))}
        </Row>
      ),
    },
  ];

  return (
    <Collapse
      defaultActiveKey={["1", "2", "3", "4", "5"]}
      className="custom-collapse"
      bordered={false}
      expandIconPosition="end"
      expandIcon={<DownOutlined />}
      items={items}
    />
  );
};

export default Filters;

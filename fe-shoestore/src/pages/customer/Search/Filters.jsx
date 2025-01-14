import React from 'react';
import { Collapse, Checkbox, Radio, Row, Button } from 'antd';

import { DownOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

const Filters = () => {
  const categories = [
    { label: "Lifestyle", count: 47 },
    { label: "Running", count: 23 },
    { label: "Training & Gym", count: 15 },
    { label: "Basketball", count: 25 },
    { label: "Football", count: 20 },
    { label: "Soccer", count: 10 },
  ];

  const priceRanges = [
    { label: "Under 50", value: "<50" },
    { label: "50 to 100", value: "50-100" },
    { label: "100 to 150", value: "100-150" },
    { label: "150 to 200", value: "150-200" },
    { label: "200 to 300", value: "200-300" },
    { label: "Over 300", value: ">300" },
  ];

  const brands = ["Nike", "Adidas", "Puma", "Reebok"];

  const colors = ["red", "blue", "green", "yellow", "black", "purple", "orange", "pink"];

  const sizes = [38, 37, 36, 39, 40, 41, 42, 43, 44];

  const items = [
    {
      key: '1',
      label: 'Categories',
      children: (
        <Checkbox.Group className="filters__categories">
          {categories.map((item) => (
            <div className="filters__categories-item" key={item.label}>
              <Checkbox className="filters__categories-item-checkbox" value={item.label}>
                {item.label}
              </Checkbox>
              <span className="filters__categories-item-count">({item.count})</span>
            </div>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: '2',
      label: 'Price',
      children: (
        <Radio.Group className="filters__prices">
          {priceRanges.map((item) => (
            <Radio value={item.value} key={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      ),
    },
    {
      key: '3',
      label: 'Brand',
      children: (
        <Checkbox.Group className="filters__brands">
          {brands.map((brand) => (
            <Checkbox value={brand} key={brand}>
              {brand}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: '4',
      label: 'Color',
      children: (
        <Row gutter={[8, 8]}>
          {colors.map((color) => (
            <Button
              key={color}
              className="filters__colors-item"
              style={{ backgroundColor: color }}
            />
          ))}
        </Row>
      ),
    },
    {
      key: '5',
      label: 'Size',
      children: (
        <Row gutter={[8, 8]}>
          {sizes.map((size, index) => (
            <Button
              className="filters_sizes-item"
              key={index}
              onClick={() => console.log(`Selected size: ${size}`)}
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
      defaultActiveKey={['1', '2', '3', '4', '5']}
      className="custom-collapse"
      bordered={false}
      expandIconPosition="end"
      expandIcon={<DownOutlined />}
      items={items}
    />
  );
};

export default Filters;

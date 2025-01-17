import React, { useState } from "react";
import { Rate, List, Avatar, Progress, Button, Dropdown, Tag, Space, Pagination } from "antd";
import { DownOutlined } from "@ant-design/icons";
const items = [
  {
    key: '1',
    label: "Latest Reviews"

  },
  {
    key: '2',
    label: "Highest Ratings"
  },
  {
    key: '3',
    label: "Lowest Ratings"
  },
];
const ReviewSummary = () => (
  <div style={{ borderRadius: "8px", padding: "10px" }}>
    <h2>Reviews</h2>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "48px", fontWeight: "bold" }}>4.9</span>
      <Rate disabled defaultValue={5} />
      <span>999 reviews</span>
    </div>
    <div>
      {[5, 4, 3, 2, 1].map((star) => (
        <div key={star} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>{star}</span>
          <Progress percent={Math.random() * 100} showInfo={false} strokeColor="#1890ff" style={{ flex: 1 }} />
        </div>
      ))}
    </div>
  </div>
);

const ReviewFilter = ({ filter, setFilter }) => (

  <div style={{ display: "flex", justifyContent: 'space-between', gap: "10px", marginBottom: "10px" }}>
    <div style={{ display: 'flex' }}>
      <Button type={filter === "All" ? "primary" : "default"} onClick={() => setFilter("All")}>All</Button>
      {[1, 2, 3, 4, 5].map((star) => (
        <Button key={star}>
          <Tag key={star} onClick={() => setFilter(`${star} Star`)} bordered={false}>{star} ★</Tag>
        </Button>
      ))}
    </div>

    <Dropdown menu={{ items, }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space> Sort by <DownOutlined /> </Space>
      </a>
    </Dropdown>
  </div>
);

const ReviewList = ({ reviews }) => (
  <>
    <List
      itemLayout="vertical"
      dataSource={reviews}
      renderItem={(item) => (
        <List.Item style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Avatar size={48}>{item.author[0]}</Avatar>
              <div>
                <h4 style={{ margin: 0 }}>{item.author}</h4>
                <Rate disabled defaultValue={item.rating} style={{ fontSize: "16px" }} />
              </div>
            </div>
            <p style={{ margin: 0, color: "#888" }}>{item.date}</p>
          </div>
          <div style={{ marginTop: "12px" }}>
            <p style={{ fontWeight: "bold", margin: 0 }}>{item.text}</p>
            <p style={{ margin: "8px 0 0", fontStyle: "italic", color: "#666" }}>{item.productInfo}</p>
            <p style={{ marginTop: "8px", color: "#333" }}>{item.additionalText}</p>
          </div>
        </List.Item>
      )}
    />
    <Pagination align="end" defaultCurrent={1} total={50} />
  </>
);

const Review = ({reviews}) => {
  const [filter, setFilter] = useState("All"); 

  return (
    <div className="review-tab">
      <div style={{
        display: "flex", gap: "20px",
        padding: '1rem',
        borderRadius: '0.5rem', marginTop: 20, background: 'white'
      }}>
        <div>
          <ReviewSummary />
        </div>

        <div style={{ flex: 2 }}>
          <div>
            <ReviewFilter filter={filter} setFilter={setFilter} />
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
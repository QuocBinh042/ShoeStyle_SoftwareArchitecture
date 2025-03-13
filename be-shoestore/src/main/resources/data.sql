﻿-- Thêm dữ liệu cho bảng Role
use ShoeStore
INSERT INTO Role (name, description,createdAt,updatedAt)
VALUES
('Admin', 'Quản trị viên với toàn quyền quản lý',GetDate(),GETDATE()),
('Customer', 'Khách hàng sử dụng dịch vụ và mua sản phẩm',GetDate(),GETDATE());



-- Thêm dữ liệu vào bảng Users
INSERT INTO Users (CI, email, name, password, phoneNumber, status, userName, roleID, createdAt, updatedAt)
VALUES
-- Admins
('1234567890', 'admin1@example.com', 'Admin User 1', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0334567890', 'Active', 'admin1', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0987654321', 'admin2@example.com', 'Admin User 2', 'securepassword2', '0987654321', 'Active', 'admin2', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1122334455', 'admin3@example.com', 'Admin User 3', 'securepassword3', '0322334455', 'Active', 'admin3', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Customers
('2233445566', 'customer1@example.com', 'John Doe', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0333445566', 'Active', 'johndoe1', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('3344556677', 'customer2@example.com', 'Jane Smith', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0944556677', 'Active', 'janesmith2', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('4455667788', 'customer3@example.com', 'Alice Johnson', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0355667788', 'Active', 'alicejohnson3', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('5566778899', 'customer4@example.com', 'Bob Brown', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0366778899', 'Active', 'bobbrown4', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('6677889900', 'customer5@example.com', 'Charlie Davis', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0377889900', 'Active', 'charliedavis5', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('7788990011', 'customer6@example.com', 'Diana Prince', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0388990011', 'Active', 'dianaprince6', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('8899001122', 'customer7@example.com', 'Ethan Hunt', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0399001122', 'Active', 'ethanhunt7', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('9900112233', 'customer8@example.com', 'Fiona Gallagher', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0300112233', 'Active', 'fionagallagher8', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1011121314', 'customer9@example.com', 'George Clooney', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0311121314', 'Active', 'georgeclooney9', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1112131415', 'customer10@example.com', 'Hannah Montana','$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0312131415', 'Active', 'hannahmontana10', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1213141516', 'customer11@example.com', 'Isaac Newton', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0313141516', 'Active', 'isaacnewton11', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1314151617', 'customer12@example.com', 'Jack Sparrow', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0314151617', 'Active', 'jacksparrow12', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1415161718', 'customer13@example.com', 'Kara Danvers', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0315161718', 'Active', 'karadanvers13', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1516171819', 'customer14@example.com', 'Liam Hemsworth', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0316171819', 'Active', 'liamhemsworth14', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1617181920', 'customer15@example.com', 'Mia Wallace', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0317181920', 'Active', 'miawallace15', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1718192021', 'customer16@example.com', 'Nina Dobrev', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0318192021', 'Active', 'ninadobrev16', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1819202122', 'customer17@example.com', 'Oscar Isaac', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0319202122', 'Active', 'oscarisaac17', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1920212223', 'customer18@example.com', 'Peter Parker', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0320212223', 'Active', 'peterparker18', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2021222324', 'customer19@example.com', 'Quinn Fabray', '$2a$10$piYOHuFhF7WWTyziAev08.RtlRcnZuruhfrTrgYWO6phJ4l1XvSBm', '0321222324', 'Active', 'quinnfabray19', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO Address (city, district, street, ward, fullName, phone, type, isDefault, userID, createdAt, updatedAt)
VALUES 
('Hà Nội', 'Ba Đình', '123 Lê Lợi', 'Phường Cống Vị', 'John Doe', '0123456789', 'Home', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hà Nội', 'Cầu Giấy', '456 Hoàng Hoa Thám', 'Phường Nghĩa Đô', 'Jane Doe', '0987654321', 'Office', 0, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hà Nội', 'Đống Đa', '789 Nguyễn Chí Thanh', 'Phường Láng Hạ', 'Alice Smith', '0912345678', 'Home', 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TP. Hồ Chí Minh', 'Quận 1', '12 Hai Bà Trưng', 'Phường Bến Nghé', 'Bob Johnson', '0901122334', 'Office', 0, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TP. Hồ Chí Minh', 'Quận 2', '34 Nguyễn Huệ', 'Phường Thủ Thiêm', 'Charlie Brown', '0933445566', 'Home', 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Đà Nẵng', 'Hải Châu', '56 Trần Phú', 'Phường Hải Châu 1', 'David Lee', '0977889900', 'Home', 0, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Đà Nẵng', 'Thanh Khê', '78 Điện Biên Phủ', 'Phường Thanh Khê Đông', 'Eva Green', '0911223344', 'Office', 1, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Cần Thơ', 'Ninh Kiều', '90 Võ Văn Kiệt', 'Phường An Cư', 'Frank White', '0933778899', 'Home', 0, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hải Phòng', 'Lê Chân', '11 Nguyễn Trãi', 'Phường An Dương', 'Grace Black', '0976554433', 'Office', 1, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hải Phòng', 'Ngô Quyền', '22 Hai Bà Trưng', 'Phường Đông Khê', 'Helen Blue', '0944556677', 'Home', 0, 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Thừa Thiên Huế', 'Thành phố Huế', '33 Nguyễn Công Trứ', 'Phường Phú Hội', 'Isaac Green', '0911334455', 'Home', 1, 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Thừa Thiên Huế', 'Thành phố Huế', '44 Lê Lợi', 'Phường Phú Nhuận', 'Jack Brown', '0933223344', 'Office', 0, 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Khánh Hòa', 'Nha Trang', '55 Trần Phú', 'Phường Vạn Thạnh', 'Kathy White', '0988776655', 'Home', 1, 13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Khánh Hòa', 'Nha Trang', '66 Nguyễn Thiện Thuật', 'Phường Phước Tiến', 'Leo Black', '0912445566', 'Office', 0, 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bà Rịa - Vũng Tàu', 'Vũng Tàu', '77 Trần Hưng Đạo', 'Phường 1', 'Mona Green', '0944332211', 'Home', 1, 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bà Rịa - Vũng Tàu', 'Vũng Tàu', '88 Nguyễn Trãi', 'Phường Thắng Nhì', 'Nick White', '0933442233', 'Office', 0, 16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Lâm Đồng', 'Đà Lạt', '99 Lê Hồng Phong', 'Phường 4', 'Olivia Brown', '0911222211', 'Home', 1, 17, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Lâm Đồng', 'Đà Lạt', '10 Nguyễn Văn Cừ', 'Phường 1', 'Paul Black', '0988334455', 'Office', 0, 18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bình Định', 'Quy Nhơn', '20 Trần Hưng Đạo', 'Phường Lê Lợi', 'Quinn Green', '0944551122', 'Home', 1, 19, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bình Định', 'Quy Nhơn', '30 Võ Thị Sáu', 'Phường Trần Phú', 'Rita White', '0912342211', 'Office', 0, 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);




-- Thêm dữ liệu cho bảng Brand
INSERT INTO Brand (name,createdAt,updatedAt)
VALUES
('Nike',GETDATE(),GETDATE()),
('Adidas',GETDATE(),GETDATE()),
('Puma',GETDATE(),GETDATE()),
('Reebok',GETDATE(),GETDATE()),
('Under Armour',GETDATE(),GETDATE());

-- Thêm dữ liệu cho bảng Category
INSERT INTO Category (description, name,createdAt,updatedAt)
VALUES
('Shoes for running and sports', 'Running',GETDATE(),GETDATE()),
('Shoes for casual wear', 'Lifestyle',GETDATE(),GETDATE()),
('Shoes for basketball players', 'Basketball',GETDATE(),GETDATE()),
('Shoes for football players', 'Football',GETDATE(),GETDATE()),
('Shoes for gym and training', 'Training',GETDATE(),GETDATE()),
('High-quality tennis shoes', 'Tennis',GETDATE(),GETDATE()),
('Shoes for hiking and trekking', 'Hiking',GETDATE(),GETDATE()),
('Specialized soccer shoes', 'Soccer',GETDATE(),GETDATE()),
('Shoes for kids and youth', 'Kids',GETDATE(),GETDATE()),
('Luxury brand shoes', 'Luxury',GETDATE(),GETDATE());

-- Thêm dữ liệu cho bảng Supplier
INSERT INTO Supplier (address,supplierName,createdAt,updatedAt)
VALUES
('123 Main St, New York, NY', 'Global Sports Inc.',GETDATE(),GETDATE()),
('456 Elm St, San Francisco, CA', 'Elite Shoes LLC',GETDATE(),GETDATE()),
('789 Maple Ave, Chicago, IL', 'Active Wear Co.',GETDATE(),GETDATE()),
('321 Oak St, Seattle, WA', 'Fit and Style Ltd.',GETDATE(),GETDATE()),
('654 Pine St, Boston, MA', 'Performance Gear Corp.',GETDATE(),GETDATE()),
('987 Cedar Rd, Austin, TX', 'Trendsetters Supply',GETDATE(),GETDATE()),
('159 Spruce St, Miami, FL', 'Urban Outfits Inc.',GETDATE(),GETDATE()),
('753 Birch St, Denver, CO', 'Trail Blazers Ltd.',GETDATE(),GETDATE()),
('951 Aspen Dr, Atlanta, GA','Southern Comfort Gear',GETDATE(),GETDATE()),
('852 Redwood Ave, Portland, OR','Pacific Edge Shoes',GETDATE(),GETDATE());
INSERT INTO Supplier_PhoneNumber (supplierID, phoneNumbers) 
VALUES 
    (1, '0911111111'), 
    (1, '0911222222'), 
    (2, '0913333333'), 
    (3, '0914444444'), 
    (4, '0915555555'),
    (5, '0916666666'),
	(5, '0911111156'), 
    (6, '0911222999'), 
    (6, '0913333458'), 
    (7, '0914444454'), 
    (8, '0915554564'),
    (9, '0916666846');
INSERT INTO Promotion (name, description, discountValue, startDate, endDate, status,createdAt,updatedAt) VALUES
('Sale 10%', '10% off promotion for products',  10, '2025-02-01 00:00:00', '2025-07-28 23:59:59', 1,GETDATE(),GETDATE()),
('Sale 20%', '20% off promotion for products',  20, '2025-02-01 00:00:00', '2025-07-28 23:59:59', 1,GETDATE(),GETDATE()),
('Sale 50%', '50,000 VND off promotion',  50, '2025-02-01 00:00:00', '2025-07-28 23:59:59', 1,GETDATE(),GETDATE()),
('Sale 70%', '100,000 VND off promotion', 70, '2025-02-01 00:00:00', '2025-07-28 23:59:59', 1,GETDATE(),GETDATE()),
('Sale 5%', '5% off promotion for products', 5, '2025-02-01 00:00:00', '2025-07-28 23:59:59', 1,GETDATE(),GETDATE());

INSERT INTO Product (description, price, productName, status, brandID, categoryID, promotionID, supplierID,createdAt,updatedAt)
VALUES
('High-performance running shoes.', 1000000, 'Nike Air Max 270', 'Available', 1, 1, 1, 1,GETDATE(),GETDATE()),
('Lightweight basketball sneakers.', 1200000, 'Adidas Harden Vol. 5', 'Available', 2, 2, 2, 2,GETDATE(),GETDATE()),
('Stylish hiking boots.', 1500000, 'Timberland Premium', 'Available', 3, 3, 4, 3,GETDATE(),GETDATE()),
('Everyday wear sneakers.', 800000, 'Converse Chuck Taylor', 'Available', 4, 4, 5, 4,GETDATE(),GETDATE()),
('Elegant leather loafers.', 1000000, 'Clarks Originals', 'Available', 5, 5, 1, 5,GETDATE(),GETDATE()),
('Performance tennis shoes.', 1100000, 'Asics Gel-Resolution', 'Available', 1, 6, 3, 6,GETDATE(),GETDATE()),
('Classic skate shoes.', 750000, 'Vans Old Skool', 'Available', 2, 7, 2, 7,GETDATE(),GETDATE()),
('Premium long-distance runners.', 950000, 'Brooks Ghost 14', 'Available', 3, 8, NULL, 8,GETDATE(),GETDATE()),
('Breathable sports sandals.', 500000, 'Teva Hurricane XLT2', 'Available', 4, 9, NULL, 9,GETDATE(),GETDATE()),
('Luxury high heels.', 2000000, 'Jimmy Choo Romy 100', 'Available', 5, 10, NULL, 10,GETDATE(),GETDATE()),
('Comfort-focused sneakers.', 850000, 'New Balance 574', 'Available', 1, 1, NULL, 1,GETDATE(),GETDATE()),
('High-performance trainers.', 1200000, 'Under Armour HOVR', 'Available', 2, 2, NULL, 2,GETDATE(),GETDATE()),
('Waterproof outdoor boots.', 130000, 'Columbia Bugaboot', 'Available', 3, 3, NULL, 3,GETDATE(),GETDATE()),
('Athletic running shoes.', 1000000, 'Saucony Endorphin', 'Available', 4, 4, NULL, 4,GETDATE(),GETDATE()),
('Modern casual loafers.', 900000, 'Sperry Top-Sider', 'Available', 5, 5, NULL, 5,GETDATE(),GETDATE()),
('Lightweight running shoes.', 750000, 'Reebok Floatride', 'Available', 1, 6, NULL, 6,GETDATE(),GETDATE()),
('Classic canvas shoes.', 5500000, 'Keds Champion', 'Available', 2, 7, NULL, 7,GETDATE(),GETDATE()),
('Trail running shoes.', 1100000, 'Salomon Speedcross', 'Available', 3, 8, NULL, 8,GETDATE(),GETDATE()),
('Minimalist sports sandals.', 6000000, 'Xero Shoes Z-Trail', 'Available', 4, 9, NULL, 9,GETDATE(),GETDATE()),
('Luxury dress shoes.', 2500000, 'Gucci Ace Sneakers', 'Available', 5, 10, NULL, 10,GETDATE(),GETDATE()),
('Casual slip-on sneakers.', 7000000, 'Skechers Go Walk', 'Available', 1, 1, NULL, 1,GETDATE(),GETDATE()),
('Basketball performance shoes.', 1400000, 'Puma Clyde All-Pro', 'Available', 2, 2, NULL, 2,GETDATE(),GETDATE()),
('Hiking boots with ankle support.', 1600000, 'North Face Vectiv', 'Available', 3, 3, NULL, 3,GETDATE(),GETDATE()),
('Canvas skate shoes.', 750000, 'DC Shoes Trase', 'Available', 4, 4, NULL, 4,GETDATE(),GETDATE()),
('Formal leather oxford shoes.', 1300000, 'Allen Edmonds Park Ave', 'Available', 5, 5, NULL, 5,GETDATE(),GETDATE()),
('Cushioned tennis shoes.', 1150000, 'Fila Axilus 2 Energized', 'Available', 1, 6, NULL, 6,GETDATE(),GETDATE()),
('Classic low-top sneakers.', 900000, 'Lacoste Carnaby Evo', 'Available', 2, 7, NULL, 7,GETDATE(),GETDATE()),
('Trail running shoes for grip.', 1250000, 'Hoka Speedgoat', 'Available', 3, 8, NULL, 8,GETDATE(),GETDATE()),
('Open-toe sports sandals.', 4500000, 'Merrell Hydro MOC', 'Available', 4, 9, NULL, 9,GETDATE(),GETDATE()),
('Elegant party heels.', 2200000, 'Manolo Blahnik BB', 'Available', 5, 10, NULL, 10,GETDATE(),GETDATE()),
('Everyday cushioned sneakers.', 1000000, 'On Cloud 5', 'Available', 1, 1, NULL, 1,GETDATE(),GETDATE()),
('Durable basketball sneakers.', 1500000, 'Jordan Retro 1', 'Available', 2, 2, NULL, 2,GETDATE(),GETDATE()),
('Warm insulated boots.', 1800000, 'Sorel Caribou', 'Available', 3, 3, NULL, 3,GETDATE(),GETDATE()),
('Stylish slip-ons.', 700000, 'Toms Alpargata', 'Available', 4, 4, NULL, 4,GETDATE(),GETDATE()),
('Premium leather loafers.', 1900000, 'Tods Gommino', 'Available', 5, 5, NULL, 5,GETDATE(),GETDATE()),
('High-traction trail runners.', 1300000, 'Arcteryx Norvan', 'Available', 1, 6, NULL, 6,GETDATE(),GETDATE()),
('Skateboarding classics.', 750000, 'Globe Sabre', 'Available', 2, 7, NULL, 7,GETDATE(),GETDATE()),
('All-terrain shoes.', 1400000, 'Altra Lone Peak', 'Available', 3, 8, NULL, 8,GETDATE(),GETDATE()),
('Quick-dry sandals.', 5000000, 'Chaco Z/Cloud', 'Available', 4, 9, NULL, 9,GETDATE(),GETDATE()),
('Luxury red sole heels.', 800000, 'Christian Louboutin So Kate', 'Available', 5, 10, NULL, 10,GETDATE(),GETDATE()),
('Lightweight walking shoes.', 6000000, 'Skechers Flex Appeal', 'Available', 1, 1, NULL, 1,GETDATE(),GETDATE()),
('Responsive basketball shoes.', 1300000, 'Nike Zoom Freak', 'Available', 2, 2, NULL, 2,GETDATE(),GETDATE()),
('Rugged hiking boots.', 1700000, 'Scarpa Zodiac Plus', 'Available', 3, 3, NULL, 3,GETDATE(),GETDATE()),
('Casual street sneakers.', 950000, 'Adidas Superstar', 'Available', 4, 4, NULL, 4,GETDATE(),GETDATE()),
('Italian leather dress shoes.', 25000000, 'Santoni Double Monk', 'Available', 5, 5, NULL, 5,GETDATE(),GETDATE()),
('Lightweight walking shoes.', 600000, 'Skechers Flex Appeal', 'Available', 1, 1, NULL, 1,GETDATE(),GETDATE()),
('Responsive basketball shoes.', 1300000, 'Nike Zoom Freak', 'Available', 2, 2, NULL, 2,GETDATE(),GETDATE()),
('Rugged hiking boots.', 17000000, 'Scarpa Zodiac Plus', 'Available', 3, 3, NULL, 3,GETDATE(),GETDATE()),
('Casual street sneakers.', 950000, 'Adidas Superstar', 'Available', 4, 4, NULL, 4,GETDATE(),GETDATE()),
('Italian leather dress shoes.', 2500000, 'Santoni Double Monk', 'Available', 5, 5, NULL, 5,GETDATE(),GETDATE());

INSERT INTO ProductDetail (color, size, stockQuantity, productID, createdAt, updatedAt)
VALUES
('RED', 'SIZE_40', 50, 1, GETDATE(), GETDATE()),
('BLUE', 'SIZE_41', 30, 1, GETDATE(), GETDATE()),
('BLACK', 'SIZE_42', 25, 2, GETDATE(), GETDATE()),
('WHITE', 'SIZE_43', 40, 2, GETDATE(), GETDATE()),
('WHITE', 'SIZE_44', 20, 3, GETDATE(), GETDATE()),
('PINK', 'SIZE_40', 15, 3, GETDATE(), GETDATE()),
('YELLOW', 'SIZE_41', 35, 4, GETDATE(), GETDATE()),
('WHITE', 'SIZE_42', 18, 5, GETDATE(), GETDATE()),
('GREEN', 'SIZE_43', 22, 6, GETDATE(), GETDATE()),
('YELLOW', 'SIZE_44', 28, 7, GETDATE(), GETDATE()),
('BLACK', 'SIZE_40', 10, 8, GETDATE(), GETDATE()),
('WHITE', 'SIZE_41', 14, 9, GETDATE(), GETDATE()),
('BLUE', 'SIZE_42', 33, 10, GETDATE(), GETDATE()),
('RED', 'SIZE_43', 27, 11, GETDATE(), GETDATE()),
('PINK', 'SIZE_44', 12, 12, GETDATE(), GETDATE()),
('PINK', 'SIZE_40', 31, 13, GETDATE(), GETDATE()),
('GREEN', 'SIZE_41', 19, 14, GETDATE(), GETDATE()),
('YELLOW', 'SIZE_42', 21, 15, GETDATE(), GETDATE()),
('GREEN', 'SIZE_43', 26, 16, GETDATE(), GETDATE()),
('YELLOW', 'SIZE_44', 17, 17, GETDATE(), GETDATE());




INSERT INTO Product_ImageURL (productID, imageURL)
VALUES
(1, 'product1_1.png'),
(1, 'product1_2.png'),
(1, 'product1_3.png'),
(1, 'product1_4.png'),
(1, 'product1_5.png'),
(2, 'product2_1.png'),
(2, 'product2_2.png'),
(2, 'product2_3.png'),
(2, 'product2_4.png'),
(2, 'product2_5.png'),
(3, 'product3_1.png'),
(3, 'product3_2.png'),
(3, 'product3_3.png'),
(3, 'product3_4.png'),
(3, 'product3_5.png'),
(4, 'product4_1.png'),
(4, 'product4_2.png'),
(4, 'product4_3.png'),
(4, 'product4_4.png'),
(4, 'product4_5.png'),
(5, 'product5_1.png'),
(5, 'product5_2.png'),
(5, 'product5_3.png'),
(5, 'product5_4.png'),
(5, 'product5_5.png'),
(6, 'product6_1.png'),
(6, 'product6_2.png'),
(6, 'product6_3.png'),
(6, 'product6_4.png'),
(6, 'product6_5.png'),
(7, 'product7_1.png'),
(7, 'product7_2.png'),
(7, 'product7_3.png'),
(7, 'product7_4.png'),
(7, 'product7_5.png'),
(8, 'product8_1.png'),
(8, 'product8_2.png'),
(8, 'product8_3.png'),
(8, 'product8_4.png'),
(8, 'product8_5.png'),
(9, 'product9_1.png'),
(9, 'product9_2.png'),
(9, 'product9_3.png'),
(9, 'product9_4.png'),
(9, 'product9_5.png'),
(10, 'product10_1.png'),
(10, 'product10_2.png'),
(10, 'product10_3.png'),
(10, 'product10_4.png'),
(10, 'product10_5.png'),
(11, 'product11_1.png'),
(11, 'product11_2.png'),
(11, 'product11_3.png'),
(11, 'product11_4.png'),
(11, 'product11_5.png'),
(12, 'product12_1.png'),
(12, 'product12_2.png'),
(12, 'product12_3.png'),
(12, 'product12_4.png'),
(12, 'product12_5.png'),
(13, 'product13_1.png'),
(13, 'product13_2.png'),
(13, 'product13_3.png'),
(13, 'product13_4.png'),
(13, 'product13_5.png'),
(14, 'product14_1.png'),
(14, 'product14_2.png'),
(14, 'product14_3.png'),
(14, 'product14_4.png'),
(14, 'product14_5.png'),
(15, 'product15_1.png'),
(15, 'product15_2.png'),
(15, 'product15_3.png'),
(15, 'product15_4.png'),
(15, 'product15_5.png'),
(16, 'product16_1.png'),
(16, 'product16_2.png'),
(16, 'product16_3.png'),
(16, 'product16_4.png'),
(16, 'product16_5.png'),
(17, 'product17_1.png'),
(17, 'product17_2.png'),
(17, 'product17_3.png'),
(17, 'product17_4.png'),
(17, 'product17_5.png'),
(18, 'product18_1.png'),
(18, 'product18_2.png'),
(18, 'product18_3.png'),
(18, 'product18_4.png'),
(18, 'product18_5.png'),
(19, 'product19_1.png'),
(19, 'product19_2.png'),
(19, 'product19_3.png'),
(19, 'product19_4.png'),
(19, 'product19_5.png'),
(20, 'product20_1.png'),
(20, 'product20_2.png'),
(20, 'product20_3.png'),
(20, 'product20_4.png'),
(20, 'product20_5.png'),
(21, 'product21_1.png'),
(21, 'product21_2.png'),
(21, 'product21_3.png'),
(21, 'product21_4.png'),
(21, 'product21_5.png'),
(22, 'product22_1.png'),
(22, 'product22_2.png'),
(22, 'product22_3.png'),
(22, 'product22_4.png'),
(22, 'product22_5.png'),
(23, 'product23_1.png'),
(23, 'product23_2.png'),
(23, 'product23_3.png'),
(23, 'product23_4.png'),
(23, 'product23_5.png'),
(24, 'product24_1.png'),
(24, 'product24_2.png'),
(24, 'product24_3.png'),
(24, 'product24_4.png'),
(24, 'product24_5.png'),
(25, 'product25_1.png'),
(25, 'product25_2.png'),
(25, 'product25_3.png'),
(25, 'product25_4.png'),
(25, 'product25_5.png'),
(26, 'product26_1.png'),
(26, 'product26_2.png'),
(26, 'product26_3.png'),
(26, 'product26_4.png'),
(26, 'product26_5.png'),
(27, 'product27_1.png'),
(27, 'product27_2.png'),
(27, 'product27_3.png'),
(27, 'product27_4.png'),
(27, 'product27_5.png'),
(28, 'product28_1.png'),
(28, 'product28_2.png'),
(28, 'product28_3.png'),
(28, 'product28_4.png'),
(28, 'product28_5.png'),
(29, 'product29_1.png'),
(29, 'product29_2.png'),
(29, 'product29_3.png'),
(29, 'product29_4.png'),
(29, 'product29_5.png'),
(30, 'product30_1.png'),
(30, 'product30_2.png'),
(30, 'product30_3.png'),
(30, 'product30_4.png'),
(30, 'product30_5.png'),
(31, 'product31_1.png'),
(31, 'product31_2.png'),
(31, 'product31_3.png'),
(31, 'product31_4.png'),
(31, 'product31_5.png'),
(32, 'product32_1.png'),
(32, 'product32_2.png'),
(32, 'product32_3.png'),
(32, 'product32_4.png'),
(32, 'product32_5.png'),
(33, 'product33_1.png'),
(33, 'product33_2.png'),
(33, 'product33_3.png'),
(33, 'product33_4.png'),
(33, 'product33_5.png'),
(34, 'product34_1.png'),
(34, 'product34_2.png'),
(34, 'product34_3.png'),
(34, 'product34_4.png'),
(34, 'product34_5.png'),
(35, 'product35_1.png'),
(35, 'product35_2.png'),
(35, 'product35_3.png'),
(35, 'product35_4.png'),
(35, 'product35_5.png'),
(36, 'product36_1.png'),
(36, 'product36_2.png'),
(36, 'product36_3.png'),
(36, 'product36_4.png'),
(36, 'product36_5.png'),
(37, 'product37_1.png'),
(37, 'product37_2.png'),
(37, 'product37_3.png'),
(37, 'product37_4.png'),
(37, 'product37_5.png'),
(38, 'product38_1.png'),
(38, 'product38_2.png'),
(38, 'product38_3.png'),
(38, 'product38_4.png'),
(38, 'product38_5.png'),
(39, 'product39_1.png'),
(39, 'product39_2.png'),
(39, 'product39_3.png'),
(39, 'product39_4.png'),
(39, 'product39_5.png'),
(40, 'product40_1.png'),
(40, 'product40_2.png'),
(40, 'product40_3.png'),
(40, 'product40_4.png'),
(40, 'product40_5.png'),
(41, 'product41_1.png'),
(41, 'product41_2.png'),
(41, 'product41_3.png'),
(41, 'product41_4.png'),
(41, 'product41_5.png'),
(42, 'product42_1.png'),
(42, 'product42_2.png'),
(42, 'product42_3.png'),
(42, 'product42_4.png'),
(42, 'product42_5.png'),
(43, 'product43_1.png'),
(43, 'product43_2.png'),
(43, 'product43_3.png'),
(43, 'product43_4.png'),
(43, 'product43_5.png'),
(44, 'product44_1.png'),
(44, 'product44_2.png'),
(44, 'product44_3.png'),
(44, 'product44_4.png'),
(44, 'product44_5.png'),
(45, 'product45_1.png'),
(45, 'product45_2.png'),
(45, 'product45_3.png'),
(45, 'product45_4.png'),
(45, 'product45_5.png'),
(46, 'product46_1.png'),
(46, 'product46_2.png'),
(46, 'product46_3.png'),
(46, 'product46_4.png'),
(46, 'product46_5.png'),
(47, 'product47_1.png'),
(47, 'product47_2.png'),
(47, 'product47_3.png'),
(47, 'product47_4.png'),
(47, 'product47_5.png'),
(48, 'product48_1.png'),
(48, 'product48_2.png'),
(48, 'product48_3.png'),
(48, 'product48_4.png'),
(48, 'product48_5.png'),
(49, 'product49_1.png'),
(49, 'product49_2.png'),
(49, 'product49_3.png'),
(49, 'product49_4.png'),
(49, 'product49_5.png'),
(50, 'product50_1.png'),
(50, 'product50_2.png'),
(50, 'product50_3.png'),
(50, 'product50_4.png'),
(50, 'product50_5.png');







INSERT INTO Voucher (code, description, discountValue, discountType, minOrderValue, freeShipping, startDate, endDate, status,createdAt,updatedAt)
VALUES
('SPRINGSALE20', 'Get 20% off on your next order.', 20, 'PERCENT', 100000, 0, '2025-02-01T00:00:00', '2025-03-15T23:59:59', 1,GETDATE(),GETDATE()),
('FREESHIP100K', 'Free shipping for orders above 100,000 VND.', 0, 'FIXED', 100000, 1, '2025-02-01T00:00:00', '2025-03-10T23:59:59', 1,GETDATE(),GETDATE()),
('SUMMERSALE15', 'Save 15% on summer collection.', 15, 'PERCENT', 50000, 0, '2025-01-01T00:00:00', '2025-06-30T23:59:59', 1,GETDATE(),GETDATE()),
('NEWUSER50K', 'Get 50,000 VND off your first order.', 50000, 'FIXED', 50000, 0, '2025-01-01T00:00:00', '2025-01-31T23:59:59', 1,GETDATE(),GETDATE()),
('WINTERDISCOUNT25', 'Get 25% off on all winter wear.', 25, 'PERCENT', 200000, 0, '2024-12-01T00:00:00', '2025-12-31T23:59:59', 1,GETDATE(),GETDATE());



INSERT INTO Cart (createdAt, updatedAt, userID)
VALUES 
(GETDATE(), GETDATE(), 1),
(GETDATE(), GETDATE(), 2),
(GETDATE(), GETDATE(), 3),
(GETDATE(), GETDATE(), 4),
(GETDATE(), GETDATE(), 5),
(GETDATE(), GETDATE(), 6),
(GETDATE(), GETDATE(), 7),
(GETDATE(), GETDATE(), 8),
(GETDATE(), GETDATE(), 9),
(GETDATE(), GETDATE(), 10),
(GETDATE(), GETDATE(), 11),
(GETDATE(),GETDATE(), 12),
(GETDATE(), GETDATE(), 13),
(GETDATE(), GETDATE(), 14),
(GETDATE(), GETDATE(), 15),
(GETDATE(), GETDATE(), 16),
(GETDATE(), GETDATE(), 17),
(GETDATE(),GETDATE(), 18),
(GETDATE(), GETDATE(), 19),
(GETDATE(), GETDATE(), 20)


INSERT INTO CartItem (quantity, subTotal, cartID, productDetailID, createdAt, updatedAt)
VALUES
(2, 2000000, 1, 1, GETDATE(), GETDATE()),
(1, 1000000, 1, 2, GETDATE(), GETDATE()),
(3, 3600000, 2, 3, GETDATE(), GETDATE()),
(1, 1200000, 2, 4, GETDATE(), GETDATE()),
(2, 3000000, 3, 5, GETDATE(), GETDATE()),
(1, 1500000, 3, 6, GETDATE(), GETDATE()),
(2, 1600000, 4, 7, GETDATE(), GETDATE()),
(1, 800000, 4, 8, GETDATE(), GETDATE()),
(3, 3300000, 5, 9, GETDATE(), GETDATE()),
(2, 1500000, 5, 10, GETDATE(), GETDATE()),
(1, 950000, 6, 11, GETDATE(), GETDATE()),
(2, 1000000, 6, 12, GETDATE(), GETDATE()),
(1, 2000000, 7, 13, GETDATE(), GETDATE()),
(3, 2550000, 7, 14, GETDATE(), GETDATE()),
(1, 850000, 8, 15, GETDATE(), GETDATE()),
(2, 2000000, 8, 16, GETDATE(), GETDATE()),
(1, 900000, 9, 17, GETDATE(), GETDATE()),
(2, 1500000, 9, 18, GETDATE(), GETDATE()),
(3, 2250000, 10, 19, GETDATE(), GETDATE()),
(1, 600000, 10, 20, GETDATE(), GETDATE());




INSERT INTO Orders (orderDate, status, total, feeShip, code, voucherID, shippingAddress, typePayment, discount, userID, createdAt, updatedAt) 
VALUES
(GETDATE(), 'Processing', 3200000, 50000, 'CODE001', NULL, '123 Main St, City, Country', 'Credit Card', 0, 1, GETDATE(), GETDATE()),  
(GETDATE(), 'Shipped', 2200000, 30000, 'CODE002', NULL, '456 Oak Ave, City, Country', 'PayPal', 0, 2, GETDATE(), GETDATE()),        
(GETDATE(), 'Delivered', 4300000, 70000, 'CODE003', NULL, '789 Pine Rd, City, Country', 'Bank Transfer', 100000, 3, GETDATE(), GETDATE()),  
(GETDATE(), 'Processing', 2800000, 40000, 'CODE004', NULL, '321 Birch Blvd, City, Country', 'Credit Card', 0, 4, GETDATE(), GETDATE()),  
(GETDATE(), 'Shipped', 1900000, 50000, 'CODE005', NULL, '654 Cedar Ct, City, Country', 'Cash on Delivery', 0, 5, GETDATE(), GETDATE());  





INSERT INTO OrderDetail (orderID, productDetailID, quantity, price, createdAt, updatedAt) 
VALUES
(1, 1, 2, 1000000, GETDATE(), GETDATE()),   -- Order 1, ProductDetail 1
(1, 2, 1, 1200000, GETDATE(), GETDATE()),   -- Order 1, ProductDetail 2
(2, 1, 3, 1000000, GETDATE(), GETDATE()),   -- Order 2, ProductDetail 1
(2, 3, 1, 1500000, GETDATE(), GETDATE()),   -- Order 2, ProductDetail 3
(3, 2, 2, 1200000, GETDATE(), GETDATE()),   -- Order 3, ProductDetail 2
(3, 4, 1, 800000, GETDATE(), GETDATE()),   -- Order 3, ProductDetail 4
(4, 1, 1, 1000000, GETDATE(), GETDATE()),   -- Order 4, ProductDetail 1
(4, 3, 2, 1500000, GETDATE(), GETDATE()),   -- Order 4, ProductDetail 3
(5, 2, 1, 1200000, GETDATE(), GETDATE()),   -- Order 5, ProductDetail 2
(5, 5, 1, 1000000, GETDATE(), GETDATE());   -- Order 5, ProductDetail 5


INSERT INTO Payment (orderID, paymentDate, status,createdAt,updatedAt) VALUES
(1, GETDATE(), 'Completed',GETDATE(),GETDATE()),    
(2, GETDATE(), 'Pending',GETDATE(),GETDATE()),      
(3, GETDATE(), 'Completed',GETDATE(),GETDATE()),     
(4, GETDATE(), 'Pending',GETDATE(),GETDATE()),      
(5, GETDATE(), 'Completed',GETDATE(),GETDATE());   


/*
INSERT INTO Receipt (receiptDate, total, paymentID)
VALUES
('2024-11-01', 180.00, 1),
('2024-11-02', 120.00, 2),
('2024-11-03', 450.00, 3),
('2024-11-04', 320.00, 4),
('2024-11-05', 200.00, 5),
('2024-11-06', 110.00, 6),
('2024-11-07', 375.00, 7),
('2024-11-08', 285.00, 8),
('2024-11-09', 50.00, 9),
('2024-11-10', 400.00, 10),
('2024-11-11', 340.00, 11),
('2024-11-12', 120.00, 12),
('2024-11-13', 260.00, 13),
('2024-11-14', 500.00, 14),
('2024-11-15', 270.00, 15),
('2024-11-16', 75.00, 16),
('2024-11-17', 110.00, 17),
('2024-11-18', 330.00, 18),
('2024-11-19', 60.00, 19),
('2024-11-20', 1000.00, 20),
('2024-11-21', 140.00, 21),
('2024-11-22', 420.00, 22),
('2024-11-23', 800.00, 23),
('2024-11-24', 320.00, 24),
('2024-11-25', 260.00, 25),
('2024-11-26', 460.00, 26),
('2024-11-27', 390.00, 27),
('2024-11-28', 300.00, 28),
('2024-11-29', 250.00, 29),
('2024-11-30', 520.00, 30);*/

INSERT INTO Review (userID, productDetailID, orderID, rating, comment, createdAt, updatedAt)
VALUES 
(1, 1, 1, 5, N'Sản phẩm tuyệt vời, chất lượng tốt!', GETDATE(), GETDATE()),
(2, 2, 2, 4, N'Giày rất đẹp nhưng hơi chật.', GETDATE(), GETDATE()),
(3, 3, 3, 3, N'Chất liệu không như mong đợi.', GETDATE(), GETDATE()),
(4, 4, 4, 5, N'Rất hài lòng với sản phẩm!', GETDATE(), GETDATE()),
(5, 5, 5, 2, N'Màu sắc không giống như hình.', GETDATE(), GETDATE())





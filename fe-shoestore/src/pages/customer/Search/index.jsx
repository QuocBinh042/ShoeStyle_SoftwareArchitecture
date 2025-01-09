import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from 'antd';
import Filters from './Filters';
import ProductGrid from './ProductGrid';
import "./Search.scss";
import { Header } from 'antd/es/layout/layout';
import ResultsHeader from './ResultHeader';
import { fetchAllProducts, fetchFilteredProducts } from '../../../services/searchService';

const { Sider, Content } = Layout;

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
    priceRange: null,
    sortBy: null, // Thêm sortBy vào filters
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const loadAllProducts = async (page) => {
    const data = await fetchAllProducts({ page });
    if (data) {
      setProducts(data.products || []);
      setTotalProducts(data.total || 0); // Cập nhật tổng số sản phẩm
      console.log('All Products Loaded:', data.products);
    } else {
      console.log('No products received');
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
    console.log("Changing page to:", page);

    if (Object.values(filters).some(filter => filter)) {
      // Nếu có bộ lọc, gọi hàm để lọc lại sản phẩm
      await handleFilterChange(filters, page);
    } else {
      // Nếu không có bộ lọc, tải lại tất cả sản phẩm
      await loadAllProducts(page);
    }
  };

  useEffect(() => {
    loadAllProducts(currentPage); // Khi mới load, sẽ tải tất cả sản phẩm ở trang 1
  }, []);

  const handleSortChange = (sortBy) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy,
    }));
    handleFilterChange({ ...filters, sortBy });
  };

  const handleFilterChange = useCallback(async (newFilters, page = currentPage) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
      sortBy: newFilters.sortBy !== undefined ? newFilters.sortBy : filters.sortBy,
    };

    setFilters(updatedFilters);

    if (
      !updatedFilters.categories.length &&
      !updatedFilters.brands.length &&
      !updatedFilters.colors.length &&
      !updatedFilters.sizes.length &&
      !updatedFilters.priceRange &&
      !updatedFilters.sortBy
    ) {
      // Nếu không có bộ lọc nào, tải lại tất cả sản phẩm
      loadAllProducts(page);
      return;
    }

    const params = {
      categoryIds: updatedFilters.categories,
      brandIds: updatedFilters.brands,
      colors: updatedFilters.colors,
      sizes: updatedFilters.sizes,
      minPrice: updatedFilters.priceRange ? updatedFilters.priceRange.split('-')[0] : null,
      maxPrice: updatedFilters.priceRange ? updatedFilters.priceRange.split('-')[1] : null,
      sortBy: updatedFilters.sortBy || null,
    };

    

    try {
      const { products, total }= await fetchFilteredProducts(params, page); // Truyền thêm page vào
      
      if (Array.isArray(products) && products.length > 0) {
        setProducts(products);
        setTotalProducts(total); // Cập nhật tổng số sản phẩm sau khi lọc
        console.log('Filtered products:', totalProducts);
      } else {
        setProducts([]);
        setTotalProducts(0); // Nếu không có sản phẩm nào, set tổng là 0
        console.log('No products found for these filters');
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  }, [filters]);

  return (
    <Layout>
      <Layout style={{ padding: '20px 100px' }}>
        <Header style={{ padding: 0 }}>
          <ResultsHeader
            resultsCount={products.length}
            keywword=""
            onSortChange={handleSortChange}
            currentSort={filters.sortBy}
          />
        </Header>
        <Layout>
          <Sider width={280} className='sider'>
            <Filters onFilterChange={handleFilterChange} />
          </Sider>
          <Content style={{ padding: 0 }}>
            <ProductGrid
              products={products}
              totalProducts={totalProducts}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />

          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Search;

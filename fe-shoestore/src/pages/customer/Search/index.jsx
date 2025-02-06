import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from 'antd';
import Filters from './Filters';
import ProductGrid from './ProductGrid';
import "./Search.scss";
import { Header } from 'antd/es/layout/layout';
import ResultsHeader from './ResultHeader';
import { fetchAllProducts, fetchFilteredProducts } from '../../../services/searchService';
import { getDiscountByProduct } from '../../../services/promotionService';
const { Sider, Content } = Layout;

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
    priceRange: null,
    sortBy: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const loadAllProducts = async (page) => {
    const data = await fetchAllProducts({ page });
    if (data && Array.isArray(data.products)) {
      const updatedProducts = await Promise.all(
        data.products.map(async (product) => {
          const discountPrice = await getDiscountByProduct(product.productID);
          return {
            ...product,
            discountPrice: discountPrice && discountPrice < product.price ? discountPrice : null
          };
        })
      );
      setProducts(updatedProducts);
      setTotalProducts(data.total || 0);
      console.log(updatedProducts)
    } else {
      console.log('No products received');
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);

    if (Object.values(filters).some(filter => filter)) {
      await handleFilterChange(filters, page);
    } else {
      await loadAllProducts(page);
    }
  };

  useEffect(() => {
    loadAllProducts(currentPage);
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
      loadAllProducts(page);
      return;
    }

    const params = {
      categoryIds: updatedFilters.categories,
      brandIds: updatedFilters.brands,
      colors: updatedFilters.colors,
      sizes: updatedFilters.sizes,
      minPrice: updatedFilters.priceRange ? JSON.parse(updatedFilters.priceRange).minPrice : null,
      maxPrice: updatedFilters.priceRange ? JSON.parse(updatedFilters.priceRange).maxPrice : null,
      sortBy: updatedFilters.sortBy || null,
    };

    try {
      const { products, total } = await fetchFilteredProducts(params, page);

      if (Array.isArray(products) && products.length > 0) {
        // Lấy giá khuyến mãi
        const updatedProducts = await Promise.all(
          products.map(async (product) => {
            const discountPrice = await getDiscountByProduct(product.productID);
            return {
              ...product,
              discountPrice: discountPrice && discountPrice < product.price ? discountPrice : null
            };
          })
        );

        setProducts(updatedProducts);
        setTotalProducts(total);
      } else {
        setProducts([]);
        setTotalProducts(0);
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
            resultsCount={totalProducts}
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

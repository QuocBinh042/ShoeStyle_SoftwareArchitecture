package com.shoestore.Server.service;

import com.shoestore.Server.dto.ProductDTO;
import com.shoestore.Server.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    List<Product> getAllProduct();
    Product getProductByProductDetailsId(int id);
    Product saveProduct(Product product);
    boolean deleteProduct(int id);

    Product getProductById(int id);
    List<String> getImageUrlsByProductID(int id);
    //  Home
    List<ProductDTO> getTop10BestSellers();
    List<ProductDTO> getTop10NewArrivals();
    List<ProductDTO> getTop10Trending();
    //Search
    List<Product> getFilteredProducts(List<Integer> categoryIds, List<Integer> brandIds, List<String> colors, List<String> sizes,String keyword, Double minPrice, Double maxPrice,String sortBy);
    Page<Product> findProducts(String keyword, String sortBy, String order, Pageable pageable);
    List<Product> getProductsByPage(List<Product> products, int page, int pageSize);
}

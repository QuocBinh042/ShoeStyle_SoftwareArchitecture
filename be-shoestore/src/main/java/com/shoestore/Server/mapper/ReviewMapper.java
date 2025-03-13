package com.shoestore.Server.mapper;

import com.shoestore.Server.dto.request.ReviewDTO;
import com.shoestore.Server.entities.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class, ProductDetailMapper.class, OrderMapper.class})
public interface ReviewMapper {

    @Mapping(source = "user", target = "user")
    @Mapping(source = "productDetail", target = "productDetail")
    @Mapping(source = "order", target = "order")
    ReviewDTO toDto(Review entity);

    @Mapping(source = "user", target = "user")
    @Mapping(source = "productDetail", target = "productDetail")
    @Mapping(source = "order", target = "order")
    Review toEntity(ReviewDTO dto);

    List<ReviewDTO> toDtoList(List<Review> entities);

    List<Review> toEntityList(List<ReviewDTO> dtos);
}

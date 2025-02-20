package com.shoestore.Server.service.impl;

import com.shoestore.Server.dto.request.CategoryDTO;
import com.shoestore.Server.entities.Category;
import com.shoestore.Server.mapper.CategoryMapper;
import com.shoestore.Server.repositories.CategoryRepository;
import com.shoestore.Server.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public CategoryDTO getCategory(int id) {
        Category category = categoryRepository.findByCategoryID(id);
        return categoryMapper.toDto(category);
    }

    @Override
    public List<CategoryDTO> getAllCategory() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toDto)
                .collect(Collectors.toList());
    }



}

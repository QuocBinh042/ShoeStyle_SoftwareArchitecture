package com.shoestore.Server.service;

import com.shoestore.Server.entities.Address;

import java.util.List;

public interface AddressService {
    List<Address> getAddressByUserId(int id);
    Address getById(int id);
    void deleteById(int id);
    Address update(int id,Address address);
    Address add(Address address);
}

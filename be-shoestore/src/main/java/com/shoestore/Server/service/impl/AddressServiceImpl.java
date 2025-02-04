package com.shoestore.Server.service.impl;

import com.shoestore.Server.entities.Address;
import com.shoestore.Server.entities.CartItem;
import com.shoestore.Server.repositories.AddressRepository;
import com.shoestore.Server.service.AddressService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public List<Address> getAddressByUserId(int id) {
        return addressRepository.findAddressByUserId(id);
    }

    @Override
    public Address getById(int id) {
        return addressRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(int id) {
        addressRepository.deleteById(id);
    }

    @Override
    public Address update(int id, Address address) {
        Optional<Address> existAddress= addressRepository.findById(id);
        if(existAddress.isPresent()){
            Address addressToUpdate = existAddress.get();

            addressToUpdate.setCity(address.getCity());
            addressToUpdate.setPhone(address.getPhone());
            addressToUpdate.setDistrict(address.getDistrict());
            addressToUpdate.setStreet(address.getStreet());
            addressToUpdate.setFullName(address.getFullName());
            addressToUpdate.setDefault(address.isDefault());
            addressToUpdate.setWard(address.getWard());
            addressToUpdate.setType(address.getType());
            return addressRepository.save(addressToUpdate);

        }
        return null;
    }

    @Override
    public Address add(Address address) {
        return addressRepository.save(address);
    }
}

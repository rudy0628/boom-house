package com.boomhouse.boomhouse.responsemodels;

import lombok.Data;

import java.util.UUID;

@Data
public class AllHousesAddressResponse {

    public AllHousesAddressResponse(UUID houseId, String address) {
        this.houseId = houseId;
        this.address = address;
    }

    private UUID houseId;

    private String address;
}

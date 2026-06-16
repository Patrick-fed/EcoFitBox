package com.ecofit.apl.domain.repository;

import com.ecofit.apl.domain.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}

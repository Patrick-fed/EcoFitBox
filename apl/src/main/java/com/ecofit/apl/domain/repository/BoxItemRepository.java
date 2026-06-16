package com.ecofit.apl.domain.repository;

import com.ecofit.apl.domain.model.BoxItem;
import com.ecofit.apl.domain.model.BoxItemId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoxItemRepository extends JpaRepository<BoxItem, BoxItemId> {
    List<BoxItem> findByBoxId(Integer boxId);
}

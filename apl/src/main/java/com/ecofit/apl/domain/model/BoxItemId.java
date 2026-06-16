package com.ecofit.apl.domain.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BoxItemId implements Serializable {

    private Integer boxId;
    private Integer itemId;

    public BoxItemId() {}

    public BoxItemId(Integer boxId, Integer itemId) {
        this.boxId = boxId;
        this.itemId = itemId;
    }

    public Integer getBoxId() { return boxId; }
    public void setBoxId(Integer boxId) { this.boxId = boxId; }
    public Integer getItemId() { return itemId; }
    public void setItemId(Integer itemId) { this.itemId = itemId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BoxItemId that = (BoxItemId) o;
        return Objects.equals(boxId, that.boxId) && Objects.equals(itemId, that.itemId);
    }

    @Override
    public int hashCode() { return Objects.hash(boxId, itemId); }
}

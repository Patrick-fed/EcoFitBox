package com.ecofit.apl.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "box_item")
public class BoxItem {

    @EmbeddedId
    private BoxItemId id;

    @ManyToOne
    @MapsId("boxId")
    @JoinColumn(name = "box_id")
    private Box box;

    @ManyToOne
    @MapsId("itemId")
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(nullable = false)
    private Integer quantidade = 1;

    public BoxItemId getId() { return id; }
    public void setId(BoxItemId id) { this.id = id; }
    public Box getBox() { return box; }
    public void setBox(Box box) { this.box = box; }
    public Item getItem() { return item; }
    public void setItem(Item item) { this.item = item; }
    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }
}

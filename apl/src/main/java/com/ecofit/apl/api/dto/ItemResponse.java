package com.ecofit.apl.api.dto;

import com.ecofit.apl.domain.model.Item;

import java.math.BigDecimal;

public class ItemResponse {
    private Integer id;
    private String itemNome;
    private String itemDescricao;
    private BigDecimal itemCusto;
    private BigDecimal itemValor;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getItemNome() { return itemNome; }
    public void setItemNome(String itemNome) { this.itemNome = itemNome; }
    public String getItemDescricao() { return itemDescricao; }
    public void setItemDescricao(String itemDescricao) { this.itemDescricao = itemDescricao; }
    public BigDecimal getItemCusto() { return itemCusto; }
    public void setItemCusto(BigDecimal itemCusto) { this.itemCusto = itemCusto; }
    public BigDecimal getItemValor() { return itemValor; }
    public void setItemValor(BigDecimal itemValor) { this.itemValor = itemValor; }

    public static ItemResponse from(Item item) {
        ItemResponse r = new ItemResponse();
        r.setId(item.getId());
        r.setItemNome(item.getItemNome());
        r.setItemDescricao(item.getItemDescricao());
        r.setItemCusto(item.getItemCusto());
        r.setItemValor(item.getItemValor());
        return r;
    }
}

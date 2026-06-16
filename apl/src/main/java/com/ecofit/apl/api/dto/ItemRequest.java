package com.ecofit.apl.api.dto;

import java.math.BigDecimal;

public class ItemRequest {
    private String itemNome;
    private String itemDescricao;
    private BigDecimal itemCusto;
    private BigDecimal itemValor;

    public String getItemNome() { return itemNome; }
    public void setItemNome(String itemNome) { this.itemNome = itemNome; }
    public String getItemDescricao() { return itemDescricao; }
    public void setItemDescricao(String itemDescricao) { this.itemDescricao = itemDescricao; }
    public BigDecimal getItemCusto() { return itemCusto; }
    public void setItemCusto(BigDecimal itemCusto) { this.itemCusto = itemCusto; }
    public BigDecimal getItemValor() { return itemValor; }
    public void setItemValor(BigDecimal itemValor) { this.itemValor = itemValor; }
}

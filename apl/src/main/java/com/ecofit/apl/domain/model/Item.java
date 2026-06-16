package com.ecofit.apl.domain.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "item_nome", nullable = false)
    private String itemNome;

    @Column(name = "item_descricao")
    private String itemDescricao;

    @Column(name = "item_custo", nullable = false, precision = 10, scale = 2)
    private BigDecimal itemCusto;

    @Column(name = "item_valor", nullable = false, precision = 10, scale = 2)
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
}

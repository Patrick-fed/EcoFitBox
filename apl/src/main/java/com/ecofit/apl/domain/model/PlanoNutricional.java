package com.ecofit.apl.domain.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "plano_nutricional")
public class PlanoNutricional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(optional = false)
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario usuario;

    private String objetivo;

    private String restricoes;

    @Column(name = "calorias_diarias")
    private Integer caloriasDiarias;

    @Column(precision = 5, scale = 2)
    private BigDecimal proteinas;

    @Column(precision = 5, scale = 2)
    private BigDecimal carboidratos;

    @Column(precision = 5, scale = 2)
    private BigDecimal gorduras;

    private String observacoes;

    @Column(name = "arquivo_plano")
    private String arquivoPlano;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public String getObjetivo() { return objetivo; }
    public void setObjetivo(String objetivo) { this.objetivo = objetivo; }
    public String getRestricoes() { return restricoes; }
    public void setRestricoes(String restricoes) { this.restricoes = restricoes; }
    public Integer getCaloriasDiarias() { return caloriasDiarias; }
    public void setCaloriasDiarias(Integer caloriasDiarias) { this.caloriasDiarias = caloriasDiarias; }
    public BigDecimal getProteinas() { return proteinas; }
    public void setProteinas(BigDecimal proteinas) { this.proteinas = proteinas; }
    public BigDecimal getCarboidratos() { return carboidratos; }
    public void setCarboidratos(BigDecimal carboidratos) { this.carboidratos = carboidratos; }
    public BigDecimal getGorduras() { return gorduras; }
    public void setGorduras(BigDecimal gorduras) { this.gorduras = gorduras; }
    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
    public String getArquivoPlano() { return arquivoPlano; }
    public void setArquivoPlano(String arquivoPlano) { this.arquivoPlano = arquivoPlano; }
}

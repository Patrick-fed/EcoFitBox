package com.ecofit.apl.api.dto;

import java.math.BigDecimal;

public class PlanoNutricionalRequest {
    private Integer usuarioId;
    private String objetivo;
    private String restricoes;
    private Integer caloriasDiarias;
    private BigDecimal proteinas;
    private BigDecimal carboidratos;
    private BigDecimal gorduras;
    private String observacoes;
    private String arquivoPlano;

    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }
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

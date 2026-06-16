package com.ecofit.apl.api.dto;

import com.ecofit.apl.domain.model.Box;

import java.math.BigDecimal;

public class BoxResponse {
    private Integer id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String tipo;
    private String tipoRefeicao;
    private Integer usuarioId;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getTipoRefeicao() { return tipoRefeicao; }
    public void setTipoRefeicao(String tipoRefeicao) { this.tipoRefeicao = tipoRefeicao; }
    public Integer getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Integer usuarioId) { this.usuarioId = usuarioId; }

    public static BoxResponse from(Box box) {
        BoxResponse r = new BoxResponse();
        r.setId(box.getId());
        r.setNome(box.getNome());
        r.setDescricao(box.getDescricao());
        r.setPreco(box.getPreco());
        r.setTipo(box.getTipo());
        r.setTipoRefeicao(box.getTipoRefeicao());
        r.setUsuarioId(box.getUsuario() != null ? box.getUsuario().getId() : null);
        return r;
    }
}

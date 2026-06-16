package com.ecofit.apl.api.dto;

public class UsuarioResponse {
    private Integer id;
    private String nome;
    private Integer idade;
    private String email;
    private String endereco;
    private Boolean acompanhamentoNutricional;
    private String tipo;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public Integer getIdade() { return idade; }
    public void setIdade(Integer idade) { this.idade = idade; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public Boolean getAcompanhamentoNutricional() { return acompanhamentoNutricional; }
    public void setAcompanhamentoNutricional(Boolean acompanhamentoNutricional) { this.acompanhamentoNutricional = acompanhamentoNutricional; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public static UsuarioResponse from(com.ecofit.apl.domain.model.Usuario u) {
        UsuarioResponse r = new UsuarioResponse();
        r.setId(u.getId());
        r.setNome(u.getNome());
        r.setIdade(u.getIdade());
        r.setEmail(u.getEmail());
        r.setEndereco(u.getEndereco());
        r.setAcompanhamentoNutricional(u.getAcompanhamentoNutricional());
        r.setTipo(u.getTipo());
        return r;
    }
}

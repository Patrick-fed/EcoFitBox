package com.ecofit.apl.api.dto;

public class RegisterRequest {
    private String nome;
    private String email;
    private String senha;
    private String endereco;
    private Boolean acompanhamentoNutricional;

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public Boolean getAcompanhamentoNutricional() { return acompanhamentoNutricional; }
    public void setAcompanhamentoNutricional(Boolean acompanhamentoNutricional) { this.acompanhamentoNutricional = acompanhamentoNutricional; }
}

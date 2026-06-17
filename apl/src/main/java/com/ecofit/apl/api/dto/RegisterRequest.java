package com.ecofit.apl.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank
    private String nome;

    @NotBlank @Email
    private String email;

    @NotBlank @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    private String senha;

    @NotBlank
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

package com.ecofit.apl.api.dto;

public class OauthLoginRequest {
    private String provedor;
    private String provedorId;
    private String email;
    private String nome;
    private String token;

    public String getProvedor() { return provedor; }
    public void setProvedor(String provedor) { this.provedor = provedor; }
    public String getProvedorId() { return provedorId; }
    public void setProvedorId(String provedorId) { this.provedorId = provedorId; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
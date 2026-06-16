package com.ecofit.apl.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 255)
    private String nome;

    private Integer idade;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String senha;

    @Column(nullable = false)
    private String endereco;

    @Column(name = "acompanhamento_nutricional", nullable = false)
    private Boolean acompanhamentoNutricional = false;

    @Column
    private String tipo = "comum";

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public Integer getIdade() { return idade; }
    public void setIdade(Integer idade) { this.idade = idade; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public Boolean getAcompanhamentoNutricional() { return acompanhamentoNutricional; }
    public void setAcompanhamentoNutricional(Boolean acompanhamentoNutricional) { this.acompanhamentoNutricional = acompanhamentoNutricional; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}

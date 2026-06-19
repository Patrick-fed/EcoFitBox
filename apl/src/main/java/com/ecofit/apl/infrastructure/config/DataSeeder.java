package com.ecofit.apl.infrastructure.config;

import com.ecofit.apl.domain.model.TipoUsuario;
import com.ecofit.apl.domain.model.Usuario;
import com.ecofit.apl.domain.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        criarUsuarioSeNaoExistir("admin@ecofit.com", "Administrador", 30,
                "admin123", "Rua Admin, 100", false, TipoUsuario.ADMIN);
        criarUsuarioSeNaoExistir("entregador@ecofit.com", "Entregador", 25,
                "entregador123", "Rua Entregador, 200", false, TipoUsuario.ENTREGADOR);
        criarUsuarioSeNaoExistir("cliente@ecofit.com", "Maria Silva", 28,
                "cliente123", "Rua Cliente, 300", true, TipoUsuario.CLIENTE);
    }

    private void criarUsuarioSeNaoExistir(String email, String nome, Integer idade,
                                           String senha, String endereco,
                                           Boolean acompanhamentoNutricional,
                                           TipoUsuario tipo) {
        if (usuarioRepository.existsByEmail(email)) {
            return;
        }
        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setIdade(idade);
        usuario.setEmail(email);
        usuario.setSenha(passwordEncoder.encode(senha));
        usuario.setEndereco(endereco);
        usuario.setAcompanhamentoNutricional(acompanhamentoNutricional);
        usuario.setTipo(tipo);
        usuarioRepository.save(usuario);
    }
}

package com.ecofit.apl.domain.service;

import com.ecofit.apl.domain.model.Usuario;
import com.ecofit.apl.domain.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> listar() { return repository.findAll(); }

    public Optional<Usuario> buscarPorId(Integer id) { return repository.findById(id); }

    public Optional<Usuario> buscarPorEmail(String email) { return repository.findByEmail(email); }

    public Usuario salvar(Usuario usuario) { return repository.save(usuario); }

    public void deletar(Integer id) { repository.deleteById(id); }

    public boolean emailExiste(String email) { return repository.existsByEmail(email); }
}

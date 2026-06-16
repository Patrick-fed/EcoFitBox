package com.ecofit.apl.api.controller;

import com.ecofit.apl.api.dto.*;
import com.ecofit.apl.domain.model.*;
import com.ecofit.apl.domain.repository.*;
import com.ecofit.apl.domain.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<UsuarioResponse> listar() {
        return service.listar().stream().map(UsuarioResponse::from).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(u -> ResponseEntity.ok(UsuarioResponse.from(u)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UsuarioResponse> criar(@RequestBody UsuarioRequest request) {
        if (service.emailExiste(request.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setIdade(request.getIdade());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(request.getSenha());
        usuario.setEndereco(request.getEndereco());
        usuario.setAcompanhamentoNutricional(request.getAcompanhamentoNutricional() != null
                ? request.getAcompanhamentoNutricional() : false);
        Usuario salvo = service.salvar(usuario);
        return ResponseEntity.ok(UsuarioResponse.from(salvo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> atualizar(@PathVariable Integer id, @RequestBody UsuarioRequest request) {
        return service.buscarPorId(id).map(usuario -> {
            usuario.setNome(request.getNome());
            usuario.setIdade(request.getIdade());
            usuario.setEndereco(request.getEndereco());
            if (request.getSenha() != null) usuario.setSenha(request.getSenha());
            if (request.getAcompanhamentoNutricional() != null)
                usuario.setAcompanhamentoNutricional(request.getAcompanhamentoNutricional());
            return ResponseEntity.ok(UsuarioResponse.from(service.salvar(usuario)));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/tipo")
    public ResponseEntity<UsuarioResponse> atualizarTipo(@PathVariable Integer id, @RequestBody TipoRequest request) {
        return service.buscarPorId(id).map(usuario -> {
            usuario.setTipo(request.getTipo());
            return ResponseEntity.ok(UsuarioResponse.from(service.salvar(usuario)));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (service.buscarPorId(id).isEmpty()) return ResponseEntity.notFound().build();
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

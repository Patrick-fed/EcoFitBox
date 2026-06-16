package com.ecofit.apl.api.controller;

import com.ecofit.apl.domain.model.*;
import com.ecofit.apl.domain.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissoes")
public class PermissaoController {

    private final PermissaoRepository repository;

    public PermissaoController(PermissaoRepository repository) { this.repository = repository; }

    @GetMapping
    public List<Permissao> listar() { return repository.findAll(); }

    @PostMapping
    public Permissao criar(@RequestBody Permissao permissao) { return repository.save(permissao); }
}

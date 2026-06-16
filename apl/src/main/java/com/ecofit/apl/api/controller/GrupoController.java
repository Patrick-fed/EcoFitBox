package com.ecofit.apl.api.controller;

import com.ecofit.apl.domain.model.*;
import com.ecofit.apl.domain.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grupos")
public class GrupoController {

    private final GrupoRepository repository;

    public GrupoController(GrupoRepository repository) { this.repository = repository; }

    @GetMapping
    public List<Grupo> listar() { return repository.findAll(); }

    @PostMapping
    public Grupo criar(@RequestBody Grupo grupo) { return repository.save(grupo); }
}

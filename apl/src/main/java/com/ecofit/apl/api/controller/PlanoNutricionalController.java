package com.ecofit.apl.api.controller;

import com.ecofit.apl.domain.model.PlanoNutricional;
import com.ecofit.apl.domain.model.Usuario;
import com.ecofit.apl.domain.repository.UsuarioRepository;
import com.ecofit.apl.domain.service.PlanoNutricionalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/planos-nutricionais")
public class PlanoNutricionalController {

    private final PlanoNutricionalService service;
    private final UsuarioRepository usuarioRepository;

    public PlanoNutricionalController(PlanoNutricionalService service, UsuarioRepository usuarioRepository) {
        this.service = service;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> buscarPorUsuario(@PathVariable Integer usuarioId) {
        return service.buscarPorUsuario(usuarioId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody com.ecofit.apl.api.dto.PlanoNutricionalRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId()).orElse(null);
        if (usuario == null) return ResponseEntity.badRequest().body("Usuário não encontrado");

        PlanoNutricional plano = new PlanoNutricional();
        plano.setUsuario(usuario);
        plano.setObjetivo(request.getObjetivo());
        plano.setRestricoes(request.getRestricoes());
        plano.setCaloriasDiarias(request.getCaloriasDiarias());
        plano.setProteinas(request.getProteinas());
        plano.setCarboidratos(request.getCarboidratos());
        plano.setGorduras(request.getGorduras());
        plano.setObservacoes(request.getObservacoes());
        plano.setArquivoPlano(request.getArquivoPlano());
        return ResponseEntity.ok(service.salvar(plano));
    }
}

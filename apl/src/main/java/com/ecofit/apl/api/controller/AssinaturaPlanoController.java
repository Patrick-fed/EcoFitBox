package com.ecofit.apl.api.controller;

import com.ecofit.apl.api.dto.*;
import com.ecofit.apl.domain.model.AssinaturaPlano;
import com.ecofit.apl.domain.model.Usuario;
import com.ecofit.apl.domain.repository.UsuarioRepository;
import com.ecofit.apl.domain.service.AssinaturaPlanoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assinaturas")
public class AssinaturaPlanoController {

    private final AssinaturaPlanoService service;
    private final UsuarioRepository usuarioRepository;

    public AssinaturaPlanoController(AssinaturaPlanoService service, UsuarioRepository usuarioRepository) {
        this.service = service;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> buscarAtivo(@PathVariable Integer usuarioId) {
        var opt = service.buscarAtivoPorUsuario(usuarioId);
        if (opt.isPresent()) {
            return ResponseEntity.ok(AssinaturaPlanoResponse.from(opt.get()));
        }
        return ResponseEntity.ok("Nenhum plano ativo encontrado");
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody AssinaturaPlanoRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId()).orElse(null);
        if (usuario == null) return ResponseEntity.badRequest().body("Usuário não encontrado");

        AssinaturaPlano assinatura = new AssinaturaPlano();
        assinatura.setUsuario(usuario);
        assinatura.setPlano(request.getPlano());
        assinatura.setDataInicio(request.getDataInicio());
        assinatura.setDataFim(request.getDataFim());
        return ResponseEntity.ok(AssinaturaPlanoResponse.from(service.salvar(assinatura)));
    }
}

package com.ecofit.apl.api.controller;

import com.ecofit.apl.api.dto.*;
import com.ecofit.apl.domain.service.PagamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pagamento")
public class PagamentoController {

    private final PagamentoService pagamentoService;

    public PagamentoController(PagamentoService pagamentoService) {
        this.pagamentoService = pagamentoService;
    }

    @PostMapping("/criar")
    public ResponseEntity<?> criar(@RequestBody PagamentoRequest request) {
        try {
            PagamentoResponse response = pagamentoService.processar(
                    request.getPedidoId(),
                    request.getMetodoPagamento(),
                    request.getParcelas() != null ? request.getParcelas() : 1);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

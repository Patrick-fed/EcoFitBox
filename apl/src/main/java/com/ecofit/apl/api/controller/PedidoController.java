package com.ecofit.apl.api.controller;

import com.ecofit.apl.api.dto.*;
import com.ecofit.apl.domain.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @GetMapping
    public List<PedidoResponse> listar() {
        return service.listar().stream().map(PedidoResponse::from).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponse> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(p -> ResponseEntity.ok(PedidoResponse.from(p)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<PedidoResponse> listarPorUsuario(@PathVariable Integer usuarioId) {
        return service.listarPorUsuario(usuarioId).stream().map(PedidoResponse::from).toList();
    }

    @PostMapping
    public ResponseEntity<PedidoResponse> criar(@Valid @RequestBody PedidoRequest request) {
        try {
            return ResponseEntity.ok(PedidoResponse.from(
                    service.checkout(request.getBoxId(), request.getUsuarioId(),
                            request.getMetodoPagamento(), request.getEnderecoEntrega())));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@Valid @RequestBody CheckoutRequest request) {
        try {
            return ResponseEntity.ok(PedidoResponse.from(
                    service.checkout(request.getBoxId(), request.getUsuarioId(),
                            request.getMetodoPagamento(), request.getEnderecoEntrega())));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/avancar-status")
    public ResponseEntity<?> avancarStatus(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(PedidoResponse.from(service.avancarStatus(id)));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Integer id, @RequestBody StatusRequest request) {
        try {
            return ResponseEntity.ok(PedidoResponse.from(service.atualizarStatusEntrega(id, request.getStatus())));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/confirmar-entrega")
    public ResponseEntity<?> confirmarEntrega(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(PedidoResponse.from(service.confirmarEntrega(id)));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/avaliar")
    public ResponseEntity<?> avaliar(@PathVariable Integer id, @Valid @RequestBody AvaliacaoRequest request) {
        try {
            return ResponseEntity.ok(PedidoResponse.from(service.avaliar(id, request.getNota())));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

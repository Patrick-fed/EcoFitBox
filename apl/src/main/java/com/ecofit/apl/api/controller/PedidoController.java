package com.ecofit.apl.api.controller;

import com.ecofit.apl.api.dto.*;
import com.ecofit.apl.domain.model.*;
import com.ecofit.apl.domain.repository.*;
import com.ecofit.apl.domain.service.AssinaturaPlanoService;
import com.ecofit.apl.domain.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService service;
    private final BoxRepository boxRepository;
    private final UsuarioRepository usuarioRepository;
    private final AssinaturaPlanoService assinaturaService;

    public PedidoController(PedidoService service, BoxRepository boxRepository,
                            UsuarioRepository usuarioRepository, AssinaturaPlanoService assinaturaService) {
        this.service = service;
        this.boxRepository = boxRepository;
        this.usuarioRepository = usuarioRepository;
        this.assinaturaService = assinaturaService;
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
    public ResponseEntity<PedidoResponse> criar(@RequestBody PedidoRequest request) {
        Box box = boxRepository.findById(request.getBoxId()).orElse(null);
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId()).orElse(null);
        if (box == null || usuario == null) return ResponseEntity.badRequest().build();

        Pedido pedido = new Pedido();
        pedido.setBox(box);
        pedido.setUsuario(usuario);
        pedido.setEnderecoEntrega(request.getEnderecoEntrega());
        pedido.setMetodoPagamento(request.getMetodoPagamento());
        return ResponseEntity.ok(PedidoResponse.from(service.salvar(pedido)));
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody CheckoutRequest request) {
        Box box = boxRepository.findById(request.getBoxId()).orElse(null);
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId()).orElse(null);
        if (box == null || usuario == null)
            return ResponseEntity.badRequest().body("Box ou usuário não encontrado");

        BigDecimal taxaEntrega = assinaturaService.buscarAtivoPorUsuario(usuario.getId())
                .map(a -> BigDecimal.ZERO)
                .orElse(new BigDecimal("5.00"));

        String endereco = request.getEnderecoEntrega() != null
                ? request.getEnderecoEntrega()
                : usuario.getEndereco();

        Pedido pedido = new Pedido();
        pedido.setBox(box);
        pedido.setUsuario(usuario);
        pedido.setEnderecoEntrega(endereco);
        pedido.setMetodoPagamento(request.getMetodoPagamento());
        pedido.setTaxaEntrega(taxaEntrega);
        return ResponseEntity.ok(PedidoResponse.from(service.salvar(pedido)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<PedidoResponse> atualizarStatus(@PathVariable Integer id, @RequestBody StatusRequest request) {
        return ResponseEntity.ok(PedidoResponse.from(service.atualizarStatus(id, request.getStatus())));
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
    public ResponseEntity<?> avaliar(@PathVariable Integer id, @RequestBody AvaliacaoRequest request) {
        try {
            return ResponseEntity.ok(PedidoResponse.from(service.avaliar(id, request.getNota())));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

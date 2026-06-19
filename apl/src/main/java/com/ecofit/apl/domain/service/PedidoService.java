package com.ecofit.apl.domain.service;

import com.ecofit.apl.domain.model.Box;
import com.ecofit.apl.domain.model.Pedido;
import com.ecofit.apl.domain.model.Usuario;
import com.ecofit.apl.domain.repository.BoxRepository;
import com.ecofit.apl.domain.repository.PedidoRepository;
import com.ecofit.apl.domain.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PedidoService {

    private final PedidoRepository repository;
    private final BoxRepository boxRepository;
    private final UsuarioRepository usuarioRepository;
    private final AssinaturaPlanoService assinaturaService;

    public PedidoService(PedidoRepository repository, BoxRepository boxRepository,
                         UsuarioRepository usuarioRepository, AssinaturaPlanoService assinaturaService) {
        this.repository = repository;
        this.boxRepository = boxRepository;
        this.usuarioRepository = usuarioRepository;
        this.assinaturaService = assinaturaService;
    }

    public List<Pedido> listar() { return repository.findAll(); }

    public Optional<Pedido> buscarPorId(Integer id) { return repository.findById(id); }

    public List<Pedido> listarPorUsuario(Integer usuarioId) { return repository.findByUsuarioId(usuarioId); }

    @Transactional
    public Pedido salvar(Pedido pedido) { return repository.save(pedido); }

    @Transactional
    public Pedido checkout(Integer boxId, Integer usuarioId, String metodoPagamento, String enderecoEntrega) {
        Box box = boxRepository.findById(boxId)
                .orElseThrow(() -> new RuntimeException("Box não encontrado"));
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        boolean temPlanoAtivo = assinaturaService.buscarAtivoPorUsuario(usuario.getId()).isPresent();
        BigDecimal taxaEntrega = temPlanoAtivo ? BigDecimal.ZERO : new BigDecimal("5.00");
        BigDecimal desconto = temPlanoAtivo
                ? box.getPreco().multiply(new BigDecimal("0.10"))
                : BigDecimal.ZERO;

        String endereco = enderecoEntrega != null ? enderecoEntrega : usuario.getEndereco();

        Pedido pedido = new Pedido();
        pedido.setBox(box);
        pedido.setUsuario(usuario);
        pedido.setEnderecoEntrega(endereco);
        pedido.setMetodoPagamento(metodoPagamento);
        pedido.setTaxaEntrega(taxaEntrega);
        pedido.setDesconto(desconto);
        return repository.save(pedido);
    }

    @Transactional
    public Pedido atualizarStatus(Integer id, String status) {
        Pedido pedido = repository.findById(id).orElseThrow();
        pedido.setStatus(status);
        return repository.save(pedido);
    }

    @Transactional
    public Pedido avancarStatus(Integer id) {
        Pedido pedido = repository.findById(id).orElseThrow();
        switch (pedido.getStatus()) {
            case "pendente" -> pedido.setStatus("pago");
            case "pago" -> pedido.setStatus("em_preparo");
            case "em_preparo" -> pedido.setStatus("em_andamento");
            case "em_andamento" -> {
                pedido.setStatus("entregue");
                pedido.setDataConfirmacaoEntrega(LocalDateTime.now());
            }
            default -> throw new IllegalStateException("Pedido já foi finalizado ou está em estado inválido: " + pedido.getStatus());
        }
        return repository.save(pedido);
    }

    @Transactional
    public Pedido atualizarStatusEntrega(Integer id, String novoStatus) {
        Set<String> validos = Set.of("em_andamento", "entregue");
        if (!validos.contains(novoStatus)) {
            throw new IllegalArgumentException("Status de entrega inválido: " + novoStatus);
        }
        Pedido pedido = repository.findById(id).orElseThrow();
        pedido.setStatus(novoStatus);
        if ("entregue".equals(novoStatus)) {
            pedido.setDataConfirmacaoEntrega(LocalDateTime.now());
        }
        return repository.save(pedido);
    }

    @Transactional
    public Pedido confirmarEntrega(Integer id) {
        Pedido pedido = repository.findById(id).orElseThrow();
        pedido.setStatus("entregue");
        pedido.setDataConfirmacaoEntrega(LocalDateTime.now());
        return repository.save(pedido);
    }

    @Transactional
    public Pedido avaliar(Integer id, Integer nota) {
        if (nota == null || nota < 1 || nota > 5)
            throw new IllegalArgumentException("Nota deve ser entre 1 e 5");
        Pedido pedido = repository.findById(id).orElseThrow();
        if (!"entregue".equals(pedido.getStatus()))
            throw new IllegalStateException("Só é possível avaliar pedidos entregues");
        if (pedido.getAvaliacao() != null)
            throw new IllegalStateException("Pedido já foi avaliado");
        pedido.setAvaliacao(nota);
        return repository.save(pedido);
    }
}

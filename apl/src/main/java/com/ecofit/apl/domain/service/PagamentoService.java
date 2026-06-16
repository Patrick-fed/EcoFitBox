package com.ecofit.apl.domain.service;

import com.ecofit.apl.api.dto.PagamentoResponse;
import com.ecofit.apl.domain.model.Pedido;
import com.ecofit.apl.domain.repository.PedidoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class PagamentoService {

    private final PedidoRepository pedidoRepository;

    public PagamentoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    @Transactional
    public PagamentoResponse processar(Integer pedidoId, String metodoPagamento, Integer parcelas) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        if (!"pendente".equals(pedido.getStatus())) {
            throw new RuntimeException("Pedido já foi processado");
        }

        String paymentId = "pay_sandbox_" + UUID.randomUUID().toString().replace("-", "").substring(0, 12);

        pedido.setStatus("pago");
        pedido.setPaymentId(paymentId);

        if (metodoPagamento != null) {
            pedido.setMetodoPagamento(metodoPagamento);
        }

        pedidoRepository.save(pedido);

        return new PagamentoResponse("aprovado", paymentId,
                "Pagamento aprovado com sucesso (sandbox)");
    }
}

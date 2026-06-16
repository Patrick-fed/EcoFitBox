package com.ecofit.apl.domain.service;

import com.ecofit.apl.api.dto.*;
import com.ecofit.apl.domain.model.*;
import com.ecofit.apl.domain.repository.*;
import com.ecofit.apl.infrastructure.security.JwtUtil;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final IdentidadeOauthRepository identidadeRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository,
                       IdentidadeOauthRepository identidadeRepository,
                       JwtUtil jwtUtil,
                       PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.identidadeRepository = identidadeRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public AuthResponse registrar(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        usuario.setEndereco(request.getEndereco() != null ? request.getEndereco() : "");
        usuario.setAcompanhamentoNutricional(
                request.getAcompanhamentoNutricional() != null ? request.getAcompanhamentoNutricional() : false);
        usuario = usuarioRepository.save(usuario);

        String token = jwtUtil.gerarToken(usuario.getId(), usuario.getEmail());
        return new AuthResponse(token, UsuarioResponse.from(usuario));
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));

        if (usuario.getSenha() == null || !passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Email ou senha inválidos");
        }

        String token = jwtUtil.gerarToken(usuario.getId(), usuario.getEmail());
        return new AuthResponse(token, UsuarioResponse.from(usuario));
    }

    @Transactional
    public AuthResponse oauth(OauthLoginRequest request) {
        var existente = identidadeRepository.findByProvedorAndProvedorId(
                request.getProvedor(), request.getProvedorId());

        if (existente.isPresent()) {
            Usuario usuario = existente.get().getUsuario();
            String token = jwtUtil.gerarToken(usuario.getId(), usuario.getEmail());
            return new AuthResponse(token, UsuarioResponse.from(usuario));
        }

        Usuario usuario = usuarioRepository.findByEmail(request.getEmail()).orElseGet(() -> {
            Usuario novo = new Usuario();
            novo.setNome(request.getNome());
            novo.setEmail(request.getEmail());
            novo.setEndereco("");
            return usuarioRepository.save(novo);
        });

        IdentidadeOauth identidade = new IdentidadeOauth();
        identidade.setUsuario(usuario);
        identidade.setProvedor(request.getProvedor());
        identidade.setProvedorId(request.getProvedorId());
        identidade.setEmailProvedor(request.getEmail());
        identidadeRepository.save(identidade);

        String token = jwtUtil.gerarToken(usuario.getId(), usuario.getEmail());
        return new AuthResponse(token, UsuarioResponse.from(usuario));
    }

    @Transactional
    public AuthResponse firebaseLogin(OauthLoginRequest request) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(request.getToken());
            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();
            String nome = decodedToken.getName();

            if (email == null) {
                throw new RuntimeException("Email não fornecido pelo Firebase");
            }

            var existente = identidadeRepository.findByProvedorAndProvedorId("google", uid);
            if (existente.isPresent()) {
                Usuario usuario = existente.get().getUsuario();
                String jwt = jwtUtil.gerarToken(usuario.getId(), usuario.getEmail());
                return new AuthResponse(jwt, UsuarioResponse.from(usuario));
            }

            Usuario usuario = usuarioRepository.findByEmail(email).orElseGet(() -> {
                Usuario novo = new Usuario();
                novo.setNome(nome != null ? nome : email.split("@")[0]);
                novo.setEmail(email);
                novo.setEndereco("");
                return usuarioRepository.save(novo);
            });

            IdentidadeOauth identidade = new IdentidadeOauth();
            identidade.setUsuario(usuario);
            identidade.setProvedor("google");
            identidade.setProvedorId(uid);
            identidade.setEmailProvedor(email);
            identidadeRepository.save(identidade);

            String jwt = jwtUtil.gerarToken(usuario.getId(), usuario.getEmail());
            return new AuthResponse(jwt, UsuarioResponse.from(usuario));
        } catch (Exception e) {
            throw new RuntimeException("Token Firebase inválido: " + e.getMessage());
        }
    }
}

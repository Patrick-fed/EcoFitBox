package com.ecofit.apl.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("EcoFit API")
                        .description("API do sistema EcoFit - Boxes saudáveis por assinatura")
                        .version("1.0.0")
                        .contact(new Contact().name("EcoFit")));
    }
}

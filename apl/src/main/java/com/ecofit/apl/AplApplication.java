package com.ecofit.apl;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AplApplication {

	public static void main(String[] args) {

		// Carrega o .env antes do Spring
		Dotenv dotenv = Dotenv.configure()
				.filename(".env")
				.ignoreIfMissing() // não falha se não existir
				.load();

		// Seta as variáveis como propriedades do sistema
		dotenv.entries().forEach(entry ->
				System.setProperty(entry.getKey(), entry.getValue())
		);

		SpringApplication.run(AplApplication.class, args);
	}

}

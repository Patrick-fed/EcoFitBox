package com.ecofit.apl;

import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(initializers = AplApplicationTests.DotenvInitializer.class)
class AplApplicationTests {

	static class DotenvInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
		@Override
		public void initialize(ConfigurableApplicationContext ctx) {
			Dotenv dotenv = Dotenv.configure()
					.filename(".env")
					.ignoreIfMissing()
					.load();
			dotenv.entries().forEach(e -> System.setProperty(e.getKey(), e.getValue()));
		}
	}

	@Test
	void contextLoads() {
	}

}

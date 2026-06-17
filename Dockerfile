FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY apl/pom.xml .
COPY apl/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 65009
ENTRYPOINT ["java", "-jar", "app.jar"]

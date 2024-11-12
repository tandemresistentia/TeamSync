package com.example.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Value("${app.cors.allowed-methods}")
    private String allowedMethods;

    @Value("${app.cors.allowed-headers}")
    private String allowedHeaders;

    @Value("${app.cors.allow-credentials}")
    private boolean allowCredentials;

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow specified origins
        config.addAllowedOrigin(allowedOrigins);
        
        // Allow specified methods
        for (String method : allowedMethods.split(",")) {
            config.addAllowedMethod(method.trim());
        }
        
        // Allow all headers if "*" is specified, otherwise add specific headers
        if ("*".equals(allowedHeaders)) {
            config.addAllowedHeader("*");
        } else {
            for (String header : allowedHeaders.split(",")) {
                config.addAllowedHeader(header.trim());
            }
        }
        
        config.setAllowCredentials(allowCredentials);
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}

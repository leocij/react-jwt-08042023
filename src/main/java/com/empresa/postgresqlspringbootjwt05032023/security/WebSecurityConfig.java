package com.empresa.postgresqlspringbootjwt05032023.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.csrf((csrf) -> {
            csrf.disable();
        });
        http.authorizeHttpRequests((authorize) -> {
            authorize.requestMatchers("/users")
            .permitAll()
            .anyRequest()
            .authenticated();
        });
        return http.build();
    }
}
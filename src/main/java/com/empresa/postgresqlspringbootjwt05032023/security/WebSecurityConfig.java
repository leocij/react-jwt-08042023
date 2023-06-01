package com.empresa.postgresqlspringbootjwt05032023.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.empresa.postgresqlspringbootjwt05032023.security.JwtAuthTokenFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public JwtAuthTokenFilter jwtAuthTokenFilter() {
        return new JwtAuthTokenFilter();
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf((csrf) -> {
            csrf.disable();
        });
        http.authorizeHttpRequests((authorize) -> {
            authorize.requestMatchers("/auth/signin","/auth/check-token")
            .permitAll()
            .anyRequest()
            .authenticated();
        });
        http.addFilterBefore(jwtAuthTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Bean
    // public AuthenticationManager authenticationManager(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception{
    //     return authenticationManagerBuilder.getOrBuild();
    // }
}
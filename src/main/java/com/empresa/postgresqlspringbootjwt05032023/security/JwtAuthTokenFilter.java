package com.empresa.postgresqlspringbootjwt05032023.security;

import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

public class JwtAuthTokenFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // System.out.println("JwtAuthTokenFilter ---> " + request.getHeader("Authorization"));
        String authHeader = request.getHeader("Authorization");
        // System.out.println(authHeader);
        if (authHeader == null || !authHeader.split(" ")[0].equals("Bearer")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.split(" ")[1];
        // System.out.println(token);
        // System.out.println(Jwts.parser().setSigningKey("SECRET_KEY").parseClaimsJws(token));
        try {
            String email = Jwts.parser().setSigningKey("SECRET_KEY").parseClaimsJws(token).getBody().getSubject();
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, null, null);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            filterChain.doFilter(request, response);
            return;
        }
    }
}
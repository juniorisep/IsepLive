package com.iseplive.api.conf.jwt;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Guillaume on 07/08/2017.
 * back
 */
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String authToken = request.getHeader("Authorization");

        if (authToken != null) {
            DecodedJWT jwt = null;
            if (authToken.startsWith("Bearer ")) {
                authToken = authToken.substring(7);
                try {
                    jwt = jwtTokenUtil.decodeToken(authToken);
                } catch (JWTVerificationException e) {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, e.getMessage());
                    return;
                }
            } else {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "authentication schema not found");
                return;
            }

            if (jwt != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                JwtAuthenticationToken authentication = new JwtAuthenticationToken(jwt);
                authentication.setAuthenticated(true);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        chain.doFilter(request, response);
    }
}

package com.iseplive.api.conf.jwt;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Created by Guillaume on 07/08/2017.
 * back
 */
public class JwtAuthenticationToken implements Authentication {

  private final List<GrantedAuthority> authorities;
  private final Map<String, Claim> claims;
  private DecodedJWT jwt;
  private boolean isAuthenticated;

  public JwtAuthenticationToken(DecodedJWT jwt) {
    List<GrantedAuthority> tmp = new ArrayList<>();
    List<String> roles = jwt.getClaim(JwtTokenUtil.CLAIM_KEY_ROLES).asList(String.class);
    if (roles != null) {
      for (String role : roles) {
        tmp.add(new SimpleGrantedAuthority(role));
      }
    }

    this.jwt = jwt;
    this.authorities = Collections.unmodifiableList(tmp);
    this.claims = jwt.getClaims();
    this.isAuthenticated = false;
  }

  @Override
  public List<GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public Object getCredentials() {
    return "";
  }

  @Override
  public Object getDetails() {
    return claims;
  }

  @Override
  public Object getPrincipal() {
    return jwt.getClaim(JwtTokenUtil.CLAIM_KEY_ID).asLong();
  }

  @Override
  public boolean isAuthenticated() {
    return isAuthenticated;
  }

  @Override
  public void setAuthenticated(boolean b) throws IllegalArgumentException {
    this.isAuthenticated = b;
  }

  @Override
  public String getName() {
    return jwt.getSubject();
  }
}

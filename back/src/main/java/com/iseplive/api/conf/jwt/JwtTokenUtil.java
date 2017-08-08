package com.iseplive.api.conf.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.iseplive.api.entity.user.Student;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

/**
 * Created by Guillaume on 07/08/2017.
 * back
 */
@Service
public class JwtTokenUtil {

    public static final String CLAIM_KEY_ID = "id";
    public static final String CLAIM_KEY_ROLES = "roles";

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.tokenDuration}")
    private int tokenDuration;

    public DecodedJWT decodeToken(String token) {
        DecodedJWT jwt = null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(issuer)
                    .build(); //Reusable verifier instance
            jwt = verifier.verify(token);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return jwt;
    }

    public String generateToken(Student student) {

        String[] rolesArray = new String[student.getAuthorities().size()];
        List<String> roles = student.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        rolesArray = roles.toArray(rolesArray);

        return generateTokenWithIdAndRolesArray(student.getId(), rolesArray);
    }

    private String generateTokenWithIdAndRolesArray(Long id, String[] roles) {
        Calendar calendar = Calendar.getInstance(Locale.FRANCE); // gets a calendar using the default time zone and locale.
        calendar.add(Calendar.SECOND, tokenDuration);
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer(issuer)
                    .withIssuedAt(new Date())
                    .withExpiresAt(calendar.getTime())
                    .withClaim(CLAIM_KEY_ID, id)
                    .withArrayClaim(CLAIM_KEY_ROLES, roles)
                    .sign(algorithm);
            return token;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String refreshToken(DecodedJWT jwt) {
        Long id = jwt.getClaim(CLAIM_KEY_ID).asLong();
        String[] roles = jwt.getClaim(CLAIM_KEY_ROLES).asArray(String.class);
        return generateTokenWithIdAndRolesArray(id, roles);
    }
}

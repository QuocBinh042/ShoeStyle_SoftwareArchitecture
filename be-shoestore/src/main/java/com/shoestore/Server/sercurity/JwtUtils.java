package com.shoestore.Server.sercurity;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

@Component
public class JwtUtils {
    private static final Logger LOGGER = Logger.getLogger(JwtUtils.class.getName());

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    @Value("${jwt.refreshExpiration}")
    private long refreshExpirationMs;

    private Key getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(secretKey);
        return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS512.getJcaName());
    }

    public String generateToken(int userId, String username, List<String> roles) {
        return buildToken(userId, username, roles, jwtExpirationMs);
    }

    public String generateRefreshToken(int userId, String username) {
        return buildToken(userId, username, null, refreshExpirationMs);
    }

    private String buildToken(int userId, String username, List<String> roles, long expirationMs) {
        JwtBuilder jwtBuilder = Jwts.builder()
                .setSubject(username)
                .claim("userId", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512);

        if (roles != null) {
            jwtBuilder.claim("roles", roles);
        }

        return jwtBuilder.compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public int extractUserId(String token) {
        return extractClaim(token, claims -> claims.get("userId", Integer.class));
    }

    public List<String> extractRoles(String token) {
        return extractClaim(token, claims -> claims.get("roles", List.class));
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            LOGGER.warning("Token đã hết hạn!");
        } catch (MalformedJwtException e) {
            LOGGER.warning("Token không hợp lệ!");
        } catch (SignatureException e) {
            LOGGER.warning("Chữ ký token không đúng!");
        } catch (Exception e) {
            LOGGER.warning("Lỗi xác thực token: " + e.getMessage());
        }
        return false;
    }

    private <T> T extractClaim(String token, java.util.function.Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }
}

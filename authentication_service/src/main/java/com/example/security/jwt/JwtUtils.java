package com.example.security.jwt;

import com.example.security.services.UserDetailsImpl;
import io.jsonwebtoken.Jwts;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

import java.util.Date;

@Component
public class JwtUtils {
	

    private String jwtSecret = "OnlineAssessment";
	
	
    private int jwtExpireInMs = 86400000;

    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpireInMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
    	try {
    		Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
    		
    		return true;
		} catch (Exception e) {
			e.printStackTrace();
		}

        return false;
    }
}

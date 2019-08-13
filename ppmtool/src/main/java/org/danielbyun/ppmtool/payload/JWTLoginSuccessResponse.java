package org.danielbyun.ppmtool.payload;

import lombok.Data;

@Data
public class JWTLoginSuccessResponse {
    private boolean success;
    private String token;
}

package com.boomhouse.boomhouse.utils;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Iterator;

public class ExtractJWT  {

    private static String bodyToExtraction(String body, String extraction) {
        // convert body to jsonObject and loop through
        JSONObject jsonObject = new JSONObject(body);

        Iterator<String> keys = jsonObject.keys();

        while (keys.hasNext()) {
            String key = keys.next();
            String value = jsonObject.getString(key);

            // if extraction equals key, return value
            if(key.equals(extraction)) {
                return value;
            }
        }

        return null;
    }

    public static String getUserInfo(String token, String extraction) {
        HttpResponse<String> response = Unirest
                .get("https://dev-7qy67xolh5cn44qw.us.auth0.com/userinfo")
                .header("Authorization", token)
                .header("content-type", "application/json")
                .asString();

        String body = response.getBody();

        String userInfo = ExtractJWT.bodyToExtraction(body, extraction);

        return userInfo;
    }

    public static String getUserRole(String userId) throws UnsupportedEncodingException {
        // Get access token
        HttpResponse<String> accessTokenResponse = Unirest
                .post("https://dev-7qy67xolh5cn44qw.us.auth0.com/oauth/token")
                .header("content-type", "application/json")
                .body("{\"client_id\":\"IcaswSfp5kgZXJRiJ7AHEoQEvJYKhEFd\",\"client_secret\":\"pWbPeWFfuZzM5_7yOrAE7xjJ_U8bLLQNDyiviK1rSIraFwX5uHcCz23CQmoGz6T4\",\"audience\":\"https://dev-7qy67xolh5cn44qw.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}")
                .asString();

        String accessTokenBody = accessTokenResponse.getBody();

        String accessToken = ExtractJWT.bodyToExtraction(accessTokenBody, "access_token");

        // Encode the userId to match the correct type of http path
        String templateUserId = URLEncoder.encode(userId, "UTF-8");

        // Using access token to get user role
        HttpResponse<String> userRoleResponse = Unirest
                .get("https://dev-7qy67xolh5cn44qw.us.auth0.com/api/v2/users/" + templateUserId + "/roles")
                .header("Authorization", "Bearer " + accessToken)
                .header("content-type", "application/json")
                .asString();

        String userRoleBody = userRoleResponse.getBody().replaceAll("\\[|\\]", "");

        String userRole = ExtractJWT.bodyToExtraction(userRoleBody,"name");

        return userRole;
    }
}

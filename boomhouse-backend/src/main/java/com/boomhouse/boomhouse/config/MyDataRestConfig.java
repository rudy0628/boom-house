package com.boomhouse.boomhouse.config;

import com.boomhouse.boomhouse.entity.Favorite;
import com.boomhouse.boomhouse.entity.House;
import com.boomhouse.boomhouse.entity.Report;
import com.boomhouse.boomhouse.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        // for general actions
        HttpMethod[] theUnsupportedActions = {HttpMethod.POST, HttpMethod.PATCH, HttpMethod.PUT, HttpMethod.DELETE};

        // for admin purpose
        HttpMethod[] allActions = {HttpMethod.GET, HttpMethod.POST, HttpMethod.PATCH, HttpMethod.PUT,
                HttpMethod.DELETE};

        config.exposeIdsFor(House.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Favorite.class);
        config.exposeIdsFor(Report.class);

        disableHttpMethods(House.class, config, theUnsupportedActions);
        disableHttpMethods(Review.class, config, theUnsupportedActions);
        disableHttpMethods(Favorite.class, config, theUnsupportedActions);

        disableHttpMethods(Report.class, config, allActions);

        // Configure CORS Mapping
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins("https://boom-house.vercel.app", "http://127.0.0.1:5173");
    }

    // disable the http method: POST, PATCH, PUT, DELETE
    // Because we don't want to modify the data without having authentication and authorization

    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions)
    {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions));
    }
}

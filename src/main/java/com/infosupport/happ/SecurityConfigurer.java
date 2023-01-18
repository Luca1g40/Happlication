package com.infosupport.happ;

import com.infosupport.happ.security.application.MyUserDetailsService;
import com.infosupport.happ.security.presentation.filters.JwtRequestFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {
    private final MyUserDetailsService myUserDetailsService;

    private final JwtRequestFilter jwtRequestFilter;

    //All except customer
    public final static String OPERATION_PATH = "/happ/operation/**";
    //Kitchen & Admin
    public final static String ORDER_PATHS = "/happ/order/**";
    public final static String OWN_ORDERS = "/happ/staff/**/myorders";
    public final static String UNCLAIMED_ORDERS = "/happ/staff/**/orders";

    //Service & Admin
    public final static String TABLES_NEED_HELP = "/happ/staff/**/tablethatneedhelp";

    //Administration & Admin
    public final static String TABLE_PATH = "/happ/table/**";
    public final static String PRODUCT_PATH = "/happ/product/**";
    public final static String AREA_PATH = "/happ/area/**";
    public final static String STOCK_PATH = "/happ/stock/**";
    public final static String INGREDIENT_PATH = "/happ/ingredient/**";
    public final static String INGREDIENTS_PATH = "/happ/ingredients";
    public final static String STAFF_PATH = "/happ/staff/**";
    public final static String PRODUCTCATEGORY_PATH = "/happ/productcategory/**";

    //Customer (PermitAll)
    public final static String FOOD_PATH_CUST = "/happ/products/foods";
    public final static String DRINKS_PATH_CUST = "/happ/products/drinks";
    public final static String HULP_NEEDED = "/happ/table/**/helpNodig";
    public final static String GET_TABLE_NUMBER = "/happ/tablenumber/**";
    public final static String GET_TIMEOFLOGIN = "/happ/table/logintime/**";
    public final static String SET_TABLESTATUS = "/happ/table/tablestatus/**";
    public final static String SHOPPINGCART = "/happ/table/**/shoppingcart/**";
    public final static String PLACE_ORDER = "/happ/table/**/order";

    public SecurityConfigurer(JwtRequestFilter jwtRequestFilter, MyUserDetailsService myUserDetailsService) {
        this.jwtRequestFilter = jwtRequestFilter;
        this.myUserDetailsService = myUserDetailsService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService);

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource()).and().
                csrf().disable()
                .authorizeRequests().antMatchers("/authenticate").permitAll()
                .antMatchers(FOOD_PATH_CUST, DRINKS_PATH_CUST, SET_TABLESTATUS, GET_TABLE_NUMBER, GET_TIMEOFLOGIN, SHOPPINGCART, HULP_NEEDED, PLACE_ORDER).permitAll()
                .antMatchers(STOCK_PATH, INGREDIENTS_PATH, INGREDIENT_PATH, AREA_PATH, STAFF_PATH, PRODUCTCATEGORY_PATH, PRODUCT_PATH, TABLE_PATH).hasAnyAuthority("ADMINISTRATION_RIGHTS", "ADMIN_RIGHTS")
                .antMatchers(TABLES_NEED_HELP).hasAnyAuthority("SERVICE_RIGHTS", "ADMIN_RIGHTS")
                .antMatchers(ORDER_PATHS, OWN_ORDERS, UNCLAIMED_ORDERS).hasAnyAuthority("KITCHEN_RIGHTS", "BAR_RIGHTS", "ADMIN_RIGHTS")
                .antMatchers(OPERATION_PATH).hasAnyAuthority("SERVICE_RIGHTS", "ADMINISTRATION_RIGHTS", "KITCHEN_RIGHTS", "BAR_RIGHTS", "ADMIN_RIGHTS")
                .anyRequest().authenticated()
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    protected CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("X-Auth-Token", "Authorization", "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }


}

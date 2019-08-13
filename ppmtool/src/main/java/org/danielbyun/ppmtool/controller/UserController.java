package org.danielbyun.ppmtool.controller;

import org.danielbyun.ppmtool.model.User;
import org.danielbyun.ppmtool.service.MapValidationErrorService;
import org.danielbyun.ppmtool.service.UserService;
import org.danielbyun.ppmtool.validator.UserValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final MapValidationErrorService mapValidationErrorService;
    private final UserService userService;
    private final UserValidator userValidator;

    public UserController(MapValidationErrorService mapValidationErrorService, UserService userService,
                          UserValidator userValidator) {
        this.mapValidationErrorService = mapValidationErrorService;
        this.userService = userService;
        this.userValidator = userValidator;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        // Validate if the passwords match
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }
}
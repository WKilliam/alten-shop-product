package com.example.apijava.utils.validation;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class ValidationResultReponse {

    // Getters et Setters
    private int code;
    private String message;
    private String error;
    private List<ValidationRows> rawErrors = new ArrayList<>();

    public ValidationResultReponse() {}

    public ValidationResultReponse(int code, String message, String error) {
        this.code = code;
        this.message = message;
        this.error = error;
    }

    public void addRawError(ValidationRows rawError) {
        this.rawErrors.add(rawError);
    }

    public static ValidationResultReponse success(String message) {
        return new ValidationResultReponse(200, message, null);
    }

    public static ValidationResultReponse error(int code, String error) {
        return new ValidationResultReponse(code, null, error);
    }

    @Override
    public String toString() {
        return "ValidationResultReponse{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", error='" + error + '\'' +
                ", rawErrors=" + rawErrors +
                '}';
    }
}

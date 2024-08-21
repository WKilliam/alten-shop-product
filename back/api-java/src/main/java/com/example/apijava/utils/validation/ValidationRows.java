package com.example.apijava.utils.validation;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ValidationRows {

    private int code;
    private Long id;
    private String error;

    public ValidationRows(int code, Long id, String error) {
        this.code = code;
        this.id = id;
        this.error = error;
    }

    @Override
    public String toString() {
        return "RawError{" +
                "code=" + code +
                ", id=" + id +
                ", error='" + error + '\'' +
                '}';
    }
}

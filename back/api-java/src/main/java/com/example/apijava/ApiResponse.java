package com.example.apijava;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.NoSuchElementException;
import java.util.function.Supplier;

@Setter
@Getter
public class ApiResponse<T> {
    private T data;
    private int code;
    private String message;
    private int currentPage;
    private int totalPages;
    private long totalElement;

    public ApiResponse() {
    }

    public ApiResponse(T data, int code, String message) {
        this.data = data;
        this.code = code;
        this.message = message;
    }

    public ApiResponse(T data, int code, String message, int currentPage, int totalPages, long totalElement) {
        this.data = data;
        this.code = code;
        this.message = message;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalElement = totalElement;
    }

    public static <T> ApiResponse<T> execute(Supplier<T> supplier) {
        try {
            T data = supplier.get();
            return new ApiResponse<>(data, HttpStatus.OK.value(), "Operation successful");
        } catch (NoSuchElementException ex) {
            return new ApiResponse<>(null, HttpStatus.NOT_FOUND.value(), "Resource not found: " + ex.getMessage());
        } catch (IllegalArgumentException ex) {
            return new ApiResponse<>(null, HttpStatus.BAD_REQUEST.value(), "Invalid argument: " + ex.getMessage());
        } catch (Exception ex) {
            return new ApiResponse<>(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), "An error occurred: " + ex.getMessage());
        }
    }

    public static <T> ApiResponse<T> executeWithPagination(Supplier<T> supplier, int currentPage, int totalPages, long totalElement) {
        try {
            T data = supplier.get();
            return new ApiResponse<>(data, HttpStatus.OK.value(), "Operation successful", currentPage, totalPages, totalElement);
        } catch (NoSuchElementException ex) {
            return new ApiResponse<>(null, HttpStatus.NOT_FOUND.value(), "Resource not found: " + ex.getMessage(), currentPage, totalPages, totalElement);
        } catch (IllegalArgumentException ex) {
            return new ApiResponse<>(null, HttpStatus.BAD_REQUEST.value(), "Invalid argument: " + ex.getMessage(), currentPage, totalPages, totalElement);
        } catch (Exception ex) {
            return new ApiResponse<>(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), "An error occurred: " + ex.getMessage(), currentPage, totalPages, totalElement);
        }
    }
}

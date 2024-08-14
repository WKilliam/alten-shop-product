package com.example.apijava.utils.pageresult;

import java.util.List;

public class PageResult<T> {
    private List<T> content;
    private int currentPage;
    private int totalPages;

    public PageResult(List<T> content, int currentPage, int totalPages) {
        this.content = content;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
    }

    // Getters and Setters
    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}

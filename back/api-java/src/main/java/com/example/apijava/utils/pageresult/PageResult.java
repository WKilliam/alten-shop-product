package com.example.apijava.utils.pageresult;

import java.util.List;

public class PageResult<T> {
    private List<T> content;
    private int currentPage;
    private int totalPages;
    private long totalElement;

    public PageResult(List<T> content, int currentPage, int totalPages,long totalElement) {
        this.content = content;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalElement = totalElement;
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

    public long getTotalElement(){
        return this.totalElement;
    }

    public void setTotalElement(long totalElement){
        this.totalElement = totalElement;
    }
}

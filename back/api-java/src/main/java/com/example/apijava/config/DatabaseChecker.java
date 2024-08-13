package com.example.apijava.config;

import com.example.apijava.repositories.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class DatabaseChecker implements CommandLineRunner {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        checkDatabaseConnection();
        checkDatabaseRead();
        executeSimpleSqlCommand();
    }

    private void checkDatabaseConnection() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(2)) {
                System.out.println("Database connection is valid.");
            } else {
                System.err.println("Failed to validate database connection.");
            }
        } catch (SQLException e) {
            System.err.println("Database connection error: " + e.getMessage());
        }
    }

    private void checkDatabaseRead() {
        try {
            long count = productRepository.count();
            System.out.println("Database is readable. Product count: " + count);
        } catch (Exception e) {
            System.err.println("Database read error: " + e.getMessage());
        }
    }

    private void executeSimpleSqlCommand() {
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {
            String sql = "SELECT * FROM products";
            ResultSet resultSet = statement.executeQuery(sql);
            while (resultSet.next()) {
                Long id = resultSet.getLong("id");
                String name = resultSet.getString("name");
                System.out.println("Product ID: " + id + ", Name: " + name);
            }
        } catch (SQLException e) {
            System.err.println("Error executing simple SQL command: " + e.getMessage());
        }
    }
}

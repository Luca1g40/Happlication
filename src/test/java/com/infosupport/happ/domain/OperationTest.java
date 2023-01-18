package com.infosupport.happ.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

class OperationTest {
    Operation operation = new Operation(LocalDateTime.now(), OperationType.DELETED, "test");

    @Test
    @DisplayName("Checking the type of operation")
    void getOperationType() {
        assertEquals(OperationType.DELETED, operation.getType());
    }

    @Test
    @DisplayName("Checking the details of operation")
    void getDetails() {
        assertEquals("test", operation.getDetails());
    }

}
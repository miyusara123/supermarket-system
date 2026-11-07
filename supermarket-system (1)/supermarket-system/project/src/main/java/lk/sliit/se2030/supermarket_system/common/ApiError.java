package lk.sliit.se2030.supermarket_system.common;

import java.time.LocalDateTime;
import java.util.Map;

// Simple, consistent error body returned to the frontend for any failed request.
public class ApiError {
    private LocalDateTime timestamp = LocalDateTime.now();
    private int status;
    private String message;
    private Map<String, String> fieldErrors;

    public ApiError(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public ApiError(int status, String message, Map<String, String> fieldErrors) {
        this.status = status;
        this.message = message;
        this.fieldErrors = fieldErrors;
    }

    public LocalDateTime getTimestamp() { return timestamp; }
    public int getStatus() { return status; }
    public String getMessage() { return message; }
    public Map<String, String> getFieldErrors() { return fieldErrors; }
}

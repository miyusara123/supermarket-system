package lk.sliit.se2030.supermarket_system.common;

// Thrown by any service when a record isn't found by id.
// Caught centrally by GlobalExceptionHandler and turned into a 404 response.
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String entityName, Long id) {
        super(entityName + " with id " + id + " was not found");
    }
}

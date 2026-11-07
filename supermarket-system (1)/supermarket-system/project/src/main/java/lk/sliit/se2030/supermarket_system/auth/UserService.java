package lk.sliit.se2030.supermarket_system.auth;

import lk.sliit.se2030.supermarket_system.common.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ----- Create -----
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("An account with this email already exists");
        }
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("CUSTOMER"); // default role for anyone who self-registers
        }
        return userRepository.save(user);
    }

    // ----- Read -----
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        return user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
    }

    // ----- Update ----- (e.g. Admin promotes a user to DELIVERY_STAFF, or a user edits their profile)
    public User updateUser(Long id, User updated) {
        User existing = getUserById(id);
        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        if (updated.getPassword() != null && !updated.getPassword().isBlank()) {
            existing.setPassword(updated.getPassword());
        }
        if (updated.getRole() != null && !updated.getRole().isBlank()) {
            existing.setRole(updated.getRole());
        }
        return userRepository.save(existing);
    }

    // ----- Delete -----
    public void deleteUser(Long id) {
        User existing = getUserById(id);
        userRepository.delete(existing);
    }
}

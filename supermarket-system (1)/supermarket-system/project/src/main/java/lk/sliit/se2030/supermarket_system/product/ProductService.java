package lk.sliit.se2030.supermarket_system.product;

import lk.sliit.se2030.supermarket_system.common.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // ----- Create -----
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // ----- Read -----
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
    }

    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Product> getByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    // ----- Update -----
    public Product updateProduct(Long id, Product updated) {
        Product existing = getProductById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPrice(updated.getPrice());
        existing.setStockQuantity(updated.getStockQuantity());
        existing.setCategory(updated.getCategory());
        existing.setImageUrl(updated.getImageUrl());
        return productRepository.save(existing);
    }

    // ----- Delete -----
    public void deleteProduct(Long id) {
        Product existing = getProductById(id);
        productRepository.delete(existing);
    }
}

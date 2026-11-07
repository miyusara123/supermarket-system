package lk.sliit.se2030.supermarket_system.common;

import lk.sliit.se2030.supermarket_system.auth.User;
import lk.sliit.se2030.supermarket_system.auth.UserRepository;
import lk.sliit.se2030.supermarket_system.product.Product;
import lk.sliit.se2030.supermarket_system.product.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public DataInitializer(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedProducts();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User customer = new User();
            customer.setName("John Doe");
            customer.setEmail("customer@freshcart.com");
            customer.setPassword("Customer123");
            customer.setRole("CUSTOMER");
            userRepository.save(customer);

            User admin = new User();
            admin.setName("Admin Manager");
            admin.setEmail("admin@freshcart.com");
            admin.setPassword("Admin123");
            admin.setRole("ADMIN");
            userRepository.save(admin);

            User staff = new User();
            staff.setName("Delivery Rider");
            staff.setEmail("delivery@freshcart.com");
            staff.setPassword("Delivery123");
            staff.setRole("DELIVERY_STAFF");
            userRepository.save(staff);

            User manager = new User();
            manager.setName("Store Manager");
            manager.setEmail("manager@freshcart.com");
            manager.setPassword("Manager123");
            manager.setRole("STORE_MANAGER");
            userRepository.save(manager);
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            List<Product> products = Arrays.asList(
                createProduct("Crisp Royal Gala Apples", "Sweet, crunchy, fresh orchard hand-picked apples (1kg pack)", 580.00, 45, "Fruits", "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80"),
                createProduct("Organic Cavendish Bananas", "Farm-fresh naturally ripened sweet bananas (1 dozen)", 320.00, 60, "Fruits", "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80"),
                createProduct("Juicy Valencia Oranges", "Sun-kissed vitamin C rich citrus oranges (1kg)", 650.00, 35, "Fruits", "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&auto=format&fit=crop&q=80"),
                createProduct("Fresh Farm Strawberries", "Plump sweet aromatic highland strawberries (250g punnet)", 780.00, 20, "Fruits", "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80"),
                createProduct("Ripe Hass Avocados", "Creamy, nutrient-dense fresh avocados (Pack of 2)", 620.00, 18, "Fruits", "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80"),
                createProduct("Sweet Blueberries", "Antioxidant-rich fresh mountain blueberries (125g)", 850.00, 15, "Fruits", "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&auto=format&fit=crop&q=80"),

                createProduct("Crisp Garden Broccoli", "Nutrient-packed green broccoli crowns (500g)", 420.00, 25, "Vegetables", "https://images.unsplash.com/photo-1584270359800-4740f9076f73?w=600&auto=format&fit=crop&q=80"),
                createProduct("Farm-Fresh Organic Carrots", "Crisp, sweet, vibrant orange table carrots (1kg)", 350.00, 50, "Vegetables", "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?w=600&auto=format&fit=crop&q=80"),
                createProduct("Vine Ripe Red Tomatoes", "Juicy, firm greenhouse hydroponic tomatoes (1kg)", 480.00, 40, "Vegetables", "https://images.unsplash.com/photo-1546470427-227c7369a941?w=600&auto=format&fit=crop&q=80"),
                createProduct("Tender Baby Spinach Leaves", "Pre-washed tender salad baby spinach (200g pack)", 390.00, 22, "Vegetables", "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80"),
                createProduct("Bell Peppers Trio", "Red, yellow, and green sweet bell peppers (Pack of 3)", 540.00, 30, "Vegetables", "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80"),
                createProduct("English Salad Cucumbers", "Crisp, refreshing, seedless garden cucumbers (500g)", 260.00, 40, "Vegetables", "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&auto=format&fit=crop&q=80"),

                createProduct("Fresh Pure Whole Milk (1L)", "Pasteurized cream-top farm milk with natural rich taste", 490.00, 60, "Dairy", "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80"),
                createProduct("Artisan Greek Yogurt (500g)", "Thick, high-protein traditional strained yogurt", 580.00, 25, "Dairy", "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80"),
                createProduct("Free-Range Farm Eggs (12pk)", "Golden-yolk fresh free-range country eggs", 690.00, 48, "Dairy", "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&auto=format&fit=crop&q=80"),
                createProduct("Aged English Cheddar Cheese", "Matured sharp cheddar block (200g)", 920.00, 19, "Dairy", "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=600&auto=format&fit=crop&q=80"),
                createProduct("Pure Creamery Salted Butter", "Churned traditional rich golden table butter (250g)", 750.00, 30, "Dairy", "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80"),

                createProduct("Golden Butter Croissants (4pk)", "Flaky, buttery French recipe baked fresh daily", 620.00, 16, "Bakery", "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80"),
                createProduct("Artisan Sourdough Loaf", "Naturally fermented crusty European sourdough bread", 550.00, 14, "Bakery", "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80"),
                createProduct("Whole Grain Wheat Bread", "Nutritious multi-seed sliced breakfast bread (450g)", 380.00, 35, "Bakery", "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&auto=format&fit=crop&q=80"),

                createProduct("Royal Basmati Rice (5kg)", "Aged long-grain fragrant supreme basmati rice", 2450.00, 40, "Grains", "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80"),
                createProduct("Extra Virgin Olive Oil (750ml)", "First cold-pressed Mediterranean golden olive oil", 2850.00, 24, "Cooking", "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80"),
                createProduct("Italian Penne Rigate (500g)", "Authentic bronze-cut durum wheat semolina pasta", 480.00, 50, "Grocery", "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=600&auto=format&fit=crop&q=80"),

                createProduct("Fresh Orange Juice (1L)", "100% freshly cold-squeezed citrus juice, no added sugar", 790.00, 28, "Beverages", "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80"),
                createProduct("Premium Roasted Arabica Beans (250g)", "Medium-dark roasted highland aromatic whole coffee beans", 1650.00, 20, "Beverages", "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80"),

                createProduct("Roasted Himalayan Almonds (200g)", "Slow-roasted crunchy California almonds with pink salt", 980.00, 32, "Snacks", "https://images.unsplash.com/photo-1508061252966-f72fb40222f7?w=600&auto=format&fit=crop&q=80"),
                createProduct("Belgian Dark Chocolate 72%", "Rich handcrafted premium dark cocoa chocolate bar (100g)", 650.00, 40, "Snacks", "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80")
            );
            productRepository.saveAll(products);
        }
    }

    private Product createProduct(String name, String desc, double price, int stock, String category, String imageUrl) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(desc);
        p.setPrice(price);
        p.setStockQuantity(stock);
        p.setCategory(category);
        p.setImageUrl(imageUrl);
        return p;
    }
}

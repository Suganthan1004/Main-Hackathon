-- Insert restaurants
INSERT INTO restaurant (name, location, contact) VALUES ('Pizza Hut', 'Chennai', '123-456-7890');
INSERT INTO restaurant (name, location, contact) VALUES ('Dominos', 'Chennai', '987-654-3210');
INSERT INTO restaurant (name, location, contact) VALUES ('Burger King', 'Chennai', '555-123-4567');

-- Insert menu items for Pizza Hut (id=1)
INSERT INTO menu_item (name, price, image_url, category, is_veg, restaurant_id) VALUES ('Margherita Pizza', 250.0, 'https://example.com/margherita.jpg', 'Pizza', true, 1);
INSERT INTO menu_item (name, price, image_url, category, is_veg, restaurant_id) VALUES ('Pepperoni Pizza', 350.0, 'https://example.com/pepperoni.jpg', 'Pizza', false, 1);
INSERT INTO menu_item (name, price, image_url, category, is_veg, restaurant_id) VALUES ('Garlic Bread', 100.0, 'https://example.com/garlicbread.jpg', 'Side', true, 1);

-- Insert menu items for Dominos (id=2)
INSERT INTO menu_item (name, price, image_url, category, is_veg, restaurant_id) VALUES ('Veggie Pizza', 200.0, 'https://example.com/veggie.jpg', 'Pizza', true, 2);
INSERT INTO menu_item (name, price, image_url, category, is_veg, restaurant_id) VALUES ('Chicken Pizza', 300.0, 'https://example.com/chicken.jpg', 'Pizza', false, 2);
INSERT INTO menu_item (name, price, image_url, category, is_veg, restaurant_id) VALUES ('French Fries', 80.0, 'https://example.com/fries.jpg', 'Side', true, 2);

-- Insert menu items for Burger King (id=3)
INSERT INTO menu_item (name, price, image_url, category, is_veg, restaurant_id) VALUES ('Veggie Burger', 150.0, 'https://example.com/veggieburger.jpg', 'Burger', true, 3);
INSERT INTO menu_item (name, price, image_url, category, is_veg, restaurant_id) VALUES ('Chicken Burger', 200.0, 'https://example.com/chickenburger.jpg', 'Burger', false, 3);
INSERT INTO menu_item (name, price, image_url, category, is_veg, restaurant_id) VALUES ('Onion Rings', 90.0, 'https://example.com/onionrings.jpg', 'Side', true, 3);
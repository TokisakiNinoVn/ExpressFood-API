const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db.config');
const Food = require('../models/Food');
const User = require('../models/User');
const Order = require('../models/Order');

dotenv.config();

// Sample Foods Data
const foods = [
  {
    name: 'Pizza Margherita',
    description: 'Pizza truyền thống Ý với sốt cà chua, phô mai mozzarella và húng quế tươi',
    price: 159000,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',
    rating: 4.5,
    reviews: 120,
    isAvailable: true,
    preparationTime: 25,
    ingredients: ['Bột mì', 'Sốt cà chua', 'Phô mai Mozzarella', 'Húng quế'],
    tags: ['Italian', 'Vegetarian']
  },
  {
    name: 'Pizza Pepperoni',
    description: 'Pizza với pepperoni giòn, phô mai mozzarella và sốt cà chua đậm đà',
    price: 189000,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
    rating: 4.7,
    reviews: 200,
    isAvailable: true,
    preparationTime: 25,
    ingredients: ['Bột mì', 'Pepperoni', 'Phô mai', 'Sốt cà chua'],
    tags: ['Italian', 'Spicy']
  },
  {
    name: 'Burger Bò Phô Mai',
    description: 'Burger bò Úc 100% với phô mai cheddar, rau xà lách, cà chua tươi',
    price: 129000,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    rating: 4.6,
    reviews: 180,
    isAvailable: true,
    preparationTime: 15,
    ingredients: ['Bánh burger', 'Thịt bò', 'Phô mai cheddar', 'Rau xà lách', 'Cà chua'],
    tags: ['American', 'Beef']
  },
  {
    name: 'Burger Gà Giòn',
    description: 'Burger gà giòn rụm với sốt mayonnaise đặc biệt',
    price: 99000,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500',
    rating: 4.4,
    reviews: 150,
    isAvailable: true,
    preparationTime: 15,
    ingredients: ['Bánh burger', 'Gà chiên', 'Mayonnaise', 'Rau xà lách'],
    tags: ['American', 'Chicken']
  },
  {
    name: 'Pasta Carbonara',
    description: 'Mì Ý sốt kem với bacon giòn và phô mai Parmesan',
    price: 139000,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500',
    rating: 4.5,
    reviews: 95,
    isAvailable: true,
    preparationTime: 20,
    ingredients: ['Pasta', 'Kem tươi', 'Bacon', 'Phô mai Parmesan', 'Trứng'],
    tags: ['Italian', 'Creamy']
  },
  {
    name: 'Pasta Bolognese',
    description: 'Mì Ý sốt thịt bò băm truyền thống kiểu Ý',
    price: 129000,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500',
    rating: 4.6,
    reviews: 110,
    isAvailable: true,
    preparationTime: 20,
    ingredients: ['Pasta', 'Thịt bò băm', 'Sốt cà chua', 'Rau thơm'],
    tags: ['Italian', 'Meat']
  },
  {
    name: 'Salad Caesar',
    description: 'Salad rau trộn với gà nướng, phô mai Parmesan và sốt Caesar',
    price: 89000,
    category: 'Salad',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
    rating: 4.3,
    reviews: 80,
    isAvailable: true,
    preparationTime: 10,
    ingredients: ['Xà lách', 'Gà nướng', 'Phô mai Parmesan', 'Sốt Caesar', 'Crouton'],
    tags: ['Healthy', 'Chicken']
  },
  {
    name: 'Salad Hy Lạp',
    description: 'Salad rau củ tươi với phô mai feta, ô liu và sốt dầu olive',
    price: 79000,
    category: 'Salad',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500',
    rating: 4.4,
    reviews: 65,
    isAvailable: true,
    preparationTime: 10,
    ingredients: ['Cà chua', 'Dưa chuột', 'Ô liu', 'Phô mai Feta', 'Hành tây'],
    tags: ['Healthy', 'Vegetarian', 'Greek']
  },
  {
    name: 'Phở Bò Việt Nam',
    description: 'Phở bò truyền thống Hà Nội với nước dùng thanh ngọt',
    price: 75000,
    category: 'Asian',
    image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=500',
    rating: 4.8,
    reviews: 250,
    isAvailable: true,
    preparationTime: 15,
    ingredients: ['Bánh phở', 'Thịt bò', 'Hành lá', 'Rau thơm', 'Nước dùng'],
    tags: ['Vietnamese', 'Soup', 'Beef']
  },
  {
    name: 'Bún Chả Hà Nội',
    description: 'Bún chả Hà Nội với thịt nướng thơm lừng',
    price: 65000,
    category: 'Asian',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500',
    rating: 4.7,
    reviews: 180,
    isAvailable: true,
    preparationTime: 15,
    ingredients: ['Bún', 'Thịt nướng', 'Nước mắm', 'Rau sống'],
    tags: ['Vietnamese', 'Grilled']
  },
  {
    name: 'Pad Thai',
    description: 'Mì xào Thái Lan với tôm, đậu phộng và rau củ',
    price: 89000,
    category: 'Asian',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500',
    rating: 4.5,
    reviews: 130,
    isAvailable: true,
    preparationTime: 18,
    ingredients: ['Mì phở', 'Tôm', 'Đậu phộng', 'Trứng', 'Rau củ'],
    tags: ['Thai', 'Seafood', 'Spicy']
  },
  {
    name: 'Tacos Mexico',
    description: 'Tacos thịt bò kiểu Mexico với guacamole tươi',
    price: 95000,
    category: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500',
    rating: 4.4,
    reviews: 90,
    isAvailable: true,
    preparationTime: 12,
    ingredients: ['Bánh tortilla', 'Thịt bò', 'Guacamole', 'Pho mai', 'Salsa'],
    tags: ['Mexican', 'Spicy']
  },
  {
    name: 'Tiramisu',
    description: 'Bánh Tiramisu Ý truyền thống với cà phê espresso và mascarpone',
    price: 69000,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
    rating: 4.7,
    reviews: 140,
    isAvailable: true,
    preparationTime: 5,
    ingredients: ['Bánh ladyfinger', 'Mascarpone', 'Cà phê', 'Bột cacao'],
    tags: ['Italian', 'Sweet', 'Coffee']
  },
  {
    name: 'Brownies Chocolate',
    description: 'Brownies socola đậm đà với hạt óc chó',
    price: 59000,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=500',
    rating: 4.6,
    reviews: 120,
    isAvailable: true,
    preparationTime: 5,
    ingredients: ['Socola đen', 'Bơ', 'Trứng', 'Đường', 'Hạt óc chó'],
    tags: ['Chocolate', 'Sweet']
  },
  {
    name: 'Trà Sữa Trân Châu',
    description: 'Trà sữa trân châu đường đen thơm ngon',
    price: 45000,
    category: 'Beverage',
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=500',
    rating: 4.5,
    reviews: 200,
    isAvailable: true,
    preparationTime: 8,
    ingredients: ['Trà', 'Sữa', 'Trân châu', 'Đường đen'],
    tags: ['Drink', 'Sweet', 'Cold']
  },
  {
    name: 'Cà Phê Sữa Đá',
    description: 'Cà phê phin truyền thống Việt Nam',
    price: 35000,
    category: 'Beverage',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500',
    rating: 4.8,
    reviews: 300,
    isAvailable: true,
    preparationTime: 5,
    ingredients: ['Cà phê', 'Sữa đặc', 'Đá'],
    tags: ['Vietnamese', 'Coffee', 'Cold']
  },
  {
    name: 'Sinh Tố Bơ',
    description: 'Sinh tố bơ sánh mịn, béo ngậy',
    price: 50000,
    category: 'Beverage',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500',
    rating: 4.6,
    reviews: 150,
    isAvailable: true,
    preparationTime: 5,
    ingredients: ['Bơ', 'Sữa tươi', 'Đường', 'Đá'],
    tags: ['Healthy', 'Smoothie', 'Cold']
  }
];

// Sample Users Data
const users = [
  {
    name: 'Admin User',
    email: 'admin@foodexpress.com',
    password: 'admin123',
    phone: '0901234567',
    role: 'admin',
    address: {
      street: '123 Nguyễn Huệ',
      city: 'TP. Hồ Chí Minh',
      zipCode: '700000'
    }
  },
  {
    name: 'Nguyễn Văn A',
    email: 'user1@gmail.com',
    password: 'user123',
    phone: '0912345678',
    role: 'user',
    address: {
      street: '456 Lê Lợi',
      city: 'TP. Hồ Chí Minh',
      zipCode: '700000'
    }
  },
  {
    name: 'Trần Thị B',
    email: 'user2@gmail.com',
    password: 'user123',
    phone: '0923456789',
    role: 'user',
    address: {
      street: '789 Hai Bà Trưng',
      city: 'Hà Nội',
      zipCode: '100000'
    }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Food.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    console.log('👥 Creating users...');
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    console.log('🍔 Creating foods...');
    const createdFoods = await Food.create(foods);
    console.log(`✅ Created ${createdFoods.length} foods`);

    console.log('📦 Creating sample orders...');
    const sampleOrders = [
      {
        user: createdUsers[1]._id,
        items: [
          {
            food: createdFoods[0]._id,
            quantity: 2,
            price: createdFoods[0].price
          },
          {
            food: createdFoods[2]._id,
            quantity: 1,
            price: createdFoods[2].price
          }
        ],
        totalAmount: createdFoods[0].price * 2 + createdFoods[2].price,
        deliveryAddress: {
          street: '456 Lê Lợi',
          city: 'TP. Hồ Chí Minh',
          zipCode: '700000'
        },
        status: 'delivered',
        paymentMethod: 'cash',
        paymentStatus: 'paid'
      },
      {
        user: createdUsers[2]._id,
        items: [
          {
            food: createdFoods[8]._id,
            quantity: 1,
            price: createdFoods[8].price
          },
          {
            food: createdFoods[15]._id,
            quantity: 2,
            price: createdFoods[15].price
          }
        ],
        totalAmount: createdFoods[8].price + createdFoods[15].price * 2,
        deliveryAddress: {
          street: '789 Hai Bà Trưng',
          city: 'Hà Nội',
          zipCode: '100000'
        },
        status: 'preparing',
        paymentMethod: 'card',
        paymentStatus: 'paid'
      }
    ];

    const createdOrders = await Order.create(sampleOrders);
    console.log(`✅ Created ${createdOrders.length} orders`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Foods: ${createdFoods.length}`);
    console.log(`   - Orders: ${createdOrders.length}`);
    console.log('\n👤 Test accounts:');
    console.log('   Admin: admin@foodexpress.com / admin123');
    console.log('   User1: user1@gmail.com / user123');
    console.log('   User2: user2@gmail.com / user123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();


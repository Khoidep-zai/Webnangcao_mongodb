// CLI: node seed.js
const mongoose = require('mongoose');
require('./utils/MongooseUtil');
const Models = require('./models/Models');

async function seedData() {
  console.log('🌱 Starting seed data...');

  try {
    // Check and insert Admin
    const adminExists = await Models.Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const admin = new Models.Admin({
        _id: new mongoose.Types.ObjectId(),
        username: 'admin',
        password: '123'
      });
      await admin.save();
      console.log('✅ Admin account created: admin/123');
    } else {
      console.log('ℹ️  Admin account already exists');
    }

    // Check and insert Categories
    const categoryCount = await Models.Category.countDocuments();
    if (categoryCount === 0) {
      const categories = [
        { _id: new mongoose.Types.ObjectId(), name: 'Electronics' },
        { _id: new mongoose.Types.ObjectId(), name: 'Fashion' },
        { _id: new mongoose.Types.ObjectId(), name: 'Books' },
        { _id: new mongoose.Types.ObjectId(), name: 'Home & Kitchen' },
        { _id: new mongoose.Types.ObjectId(), name: 'Sports' }
      ];
      await Models.Category.insertMany(categories);
      console.log('✅ Categories created: 5 categories');
    } else {
      console.log('ℹ️  Categories already exist');
    }

    // Check and insert Customer
    const customerExists = await Models.Customer.findOne({ username: 'customer' });
    if (!customerExists) {
      const customer = new Models.Customer({
        _id: new mongoose.Types.ObjectId(),
        username: 'customer',
        password: '123',
        name: 'Test Customer',
        phone: '0123456789',
        email: 'customer@test.com',
        active: 1,
        token: ''
      });
      await customer.save();
      console.log('✅ Customer account created: customer/123');
    } else {
      console.log('ℹ️  Customer account already exists');
    }

    console.log('\n🎉 Seed data completed successfully!');
    console.log('📋 Default accounts:');
    console.log('   Admin: admin/123');
    console.log('   Customer: customer/123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

// Wait for MongoDB connection
mongoose.connection.once('open', () => {
  console.log('✅ Connected to MongoDB');
  seedData();
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

const Food = require('../models/Food');

exports.getAllFoods = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const foods = await Food.find(query).sort('-createdAt');
    res.status(200).json({ success: true, count: foods.length, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }
    res.status(200).json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json({ success: true, data: food });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }
    res.status(200).json({ success: true, data: food });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }
    res.status(200).json({ success: true, message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



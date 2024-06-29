// routes/foodRoutes.js

const express = require('express');
const router = express.Router();
const Food = require('../models/fooditem');

// Create a new food item
router.post('/foods', async (req, res) => {
  try {
    const { foodName, pricePerKilo, unitsInKilos, region, phoneNumber } = req.body;
    const newFood = new Food({ foodName, pricePerKilo, unitsInKilos, region, phoneNumber });
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create food item' });
  }
});

// Get all food items
router.get('/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve food items' });
  }
});

// Delete a food item by ID
router.delete('/foods/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete food item' });
  }
});

// update the  food item by ID

router.put('/foods/:id', async (req, res) => {
  const { id } = req.params;
  const { pricePerKilo, unitsInKilos } = req.body;

  try {
    const updatedFood = await Food.findByIdAndUpdate(
      id,
      { pricePerKilo, unitsInKilos },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json(updatedFood);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

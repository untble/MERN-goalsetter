const express = require('express');
const {getGoals,
    updateGoal,
    deleteGoal,
    setGoal
} = require("../controllers/goalController");
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect,setGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

// router.get('/', getGoals);
// router.post('/', updateGoal);
// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);

module.exports = router;
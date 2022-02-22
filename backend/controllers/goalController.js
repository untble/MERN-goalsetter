const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc         GET GOALS
// @route        GET /api/goals
// @access       Public
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });

    res.status(200).json(goals);
});

// @desc         SET GOAL
// @route        SET /api/goals
// @access       Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        throw new Error('Add a text field');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal);
});

// @desc         UPDATE GOAL
// @route        PUT /api/goals/:id
// @access       Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    if (!req.user) {
        res.status(400);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal);
});

// @desc         DELETE GOALS=
// @route        DELETE /api/goals
// @access       Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findByIdAndDelete(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    if (!req.user) {
        res.status(400);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    res.status(200).json({message: `${goal.title} has been deleted`});
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}
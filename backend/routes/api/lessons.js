const express = require('express');
const { User, Lesson } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { route } = require('./lessons');

const router = express.Router();


router.get('/current', async ( req, res, next) => {

    const lessons = await Lesson.findAll({
        where: {
            userId: req.user.id
        }
    });


    return res.status(200).json({
        Lessons: lessons
    })
});

router.put('/update', async (req, res, next) => {
    const {lessonId,userId,unlocked} = req.body;
    const lesson = await Lesson.findOne({
        where: {
            userId: userId,
            lessonId: lessonId,
        }
    })

    if(!lesson){
        return res.status(404).json({
            message: "Lesson not found",
            statusCode: 404
        })
    }
    if(lessonId) {
        lesson.lessonId = lessonId;
    };
    if(userId){
        lesson.userId = userId;
    }
    if(unlocked){
        lesson.unlocked = unlocked;
    }
    await lesson.save();

    return res.status(200).json({
        lesson: lesson
    });
})


module.exports = router;
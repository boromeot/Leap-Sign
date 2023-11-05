const express = require('express');
const { User, Lesson } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { route } = require('./lessons');

const router = express.Router();


//get current user lessons
router.get('/current', async ( req, res, next) => {

    // console.log('req.user in lessons route: ', req.user.id);
    const lessons = await Lesson.findAll({
        where: {
            userId: req.user.id
        }
    });

    // console.log(lessons,"lessons from backend");

    return res.status(200).json({
        Lessons: lessons
    })
});

router.put('/update', async (req, res, next) => {
    const {lessonId,userId,unlocked} = req.body;
    // console.log('lessonId in lessons route: ', lessonId);
    const lesson = await Lesson.findOne({
        where: {
            userId: userId,
            lessonId: lessonId,
        }
    })
    // console.log("search lesson in lesson route: ", lesson);

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

    // console.log('lesson updated: ', lesson);
    return res.status(200).json({
        lesson: lesson
    });
})


module.exports = router;
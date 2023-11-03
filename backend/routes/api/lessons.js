const express = require('express');
const { User, Lesson } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { route } = require('./lessons')
const router = express.Router();


//get current user lessons
router.get('/current', async ( req, res, next) => {

    console.log('req.user in lessons route: ', req.user.id);
    const lessons = await Lesson.findAll({
        where: {
            userId: req.user.id
        }
    });

    console.log(lessons,"lessons from backend");

    return res.status(200).json({
        Lessons: lessons
    })
});


module.exports = router;
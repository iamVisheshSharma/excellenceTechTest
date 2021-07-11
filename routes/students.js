const express = require('express');
const router = express();
const Student = require('../models/student');

// Creating Student
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    first_round: req.body.first_round,
    second_round: req.body.second_round,
    third_round: req.body.third_round
  })

  try {
    const newStudent = await student.save()
    res.status(201).json(newStudent)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});


// Getting all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find()
    res.json(students)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

router.get('/max-score', async (req, res) => {
  try {
    const students = await Student.find()
    res.json(maxScoredStudent(students))    
  } catch (error) {
    res.status(500).json({message: error.message})    
  }
})

router.get('/avg-scores', async (req, res) => {
  try {
    const students = await Student.find()
    const first_round_avg = await Student.aggregate([{$group: { _id: null, "Student": {$avg: "$first_round"}}}])
    const second_round_avg = await Student.aggregate([{$group: { _id: null, "Student": {$avg: "$second_round"}}}])
    const third_round_avg = await Student.aggregate([{$group: { _id: null, "Student": {$avg: "$third_round"}}}])
    res.send({first_round_avg: first_round_avg, second_round_avg: second_round_avg, third_round_avg: third_round_avg})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


function maxScoredStudent(students) {
  let max_score = 0;
  let student_name = '';
  let data = {};
  students.forEach((student) => {
    let score = student.first_round + student.second_round + student.third_round;
    if (score > max_score) {
      max_score = score;
      student_name = student.name;
      data = {name: student_name, scored: max_score}
    } 
  })
  return data;
}

module.exports = router
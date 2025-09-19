const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const {jwtAuthMiddleware} = require('../jwt');
const bcrypt = require('bcryptjs');

const checkAdminRole = async(userID) =>{
    try{
        const user = await User.findById(userID);
        return user.role === 'admin';
    }catch(err){
        return false;
    }
}

// POST route to add a candidate
router.post('/', async (req, res) =>{
    try{
        if(!await checkAdminRole(req.user.id))
            return res.status(403).json({error: 'Access denied'});
        const data = req.body // Assuming the request body contains the candidate data

        // Create a new Candidate document using the Mongoose model
        const newCandidate = new Candidate(data);

        // Save the new candidate to the database
        const response = await newCandidate.save();
        console.log('data saved');

        res.status(200).json({response: response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})




// GET method to get the user
router.get('/', async (req, res) =>{
    try{
        const data = await User.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:candidateID', async (req, res)=>{
    try{
        if(!await checkAdminRole(req.user.id))
            return res.status(403).json({error: 'Access denied'});

        const candidateID = req.params.candidateID; // Extract the candidate ID from the URL parameter
        const updateCandidateData = req.body; // Extract name and party from request body

        // Find the candidate by ID
        const response = await Candidate.findByIdAndUpdate(candidateID, updateCandidateData, {
            new: true,
            runValidators: true});

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log(' candidate data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:candidateID', async (req, res)=>{
    try{
        if(!await checkAdminRole(req.user.id))
            return res.status(403).json({error: 'Access denied'});

        const candidateID = req.params.candidateID; // Extract the candidate ID from the URL parameter

        // Find the candidate by ID
        const response = await Candidate.findByIdAndDelete(candidateID);

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log(' candidate data deleted');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})



module.exports = router;
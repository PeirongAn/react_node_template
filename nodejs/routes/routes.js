const express = require('express');

const router = express.Router();
const Model = require('../models/model');
const { v4: uuidv4 } = require('uuid');

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        desc: req.body.desc,
        testAddress: req.body.testAddress,
        releaseAddress: req.body.releaseAddress,
        gitLab: req.body.gitLab,

    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    const getQueryParams = (query) => {
        const fullQuery = {};
        const keys = ['name', 'desc', 'testAddress', 'releaseAddress', 'gitLab'];
        keys.forEach(key => {
            if(query[key]){
                fullQuery[key] = new RegExp(query[key]);
            }
        })
        return fullQuery;
    }
    try{
        const page = Number(req.query.current);
        const rows = Number(req.query.pageSize);    
        const query = Model.find(getQueryParams(req.query));
        query.skip((page - 1) * rows);
        query.limit(rows);
        query.exec(function (err, rs) {
            if (err) {
                res.json({err, success: false});
            } else {
            //计算数据总数
          
                Model.find(function (err, result) {
                    const jsonArray = {
                        data: rs,
                        total: result?.length,
                        pageSize: rows,
                        success: true,
                        current: page,
                    };
                    res.json(jsonArray);
                });
            

            }
        });
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.post('/update', async (req, res) => {
    try {
        const {id, ...others} = req.body;
        const updatedData = others;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.post('/delete', async (req, res) => {
    try {
        const id = req.body.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



module.exports = router;
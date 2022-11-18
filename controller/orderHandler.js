const arr = require('../struct/model');
const order = arr[3];
const nodemail = require('./nodemail');
exports.addOrder = async(req,res) =>{
    try{
        const aOrder=req.body;
        console.log(aOrder);
        const newOrder = await order.create(aOrder);
        res.status(201).json({
            status:"success",
            data:{newOrder}
        });
        nodemail.mailto(req);
    }
    catch (err) {
        return res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

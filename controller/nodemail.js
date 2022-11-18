const nodemailer = require('nodemailer');
const reghandler = require('./registerHandler');
exports.mailto = async(req,res)=>{
    const transporter = nodemailer.createTransport({
        service:"hotmail",
        auth:{
            user:"akashnagarajan5@outlook.com",
            pass:"Akash@11"
        }
    });
    console.log(req.body);
    const curuser = req.body['userID'];
    // const users=reghandler.getReg();
    // const usermail = JSON.stringify(users.filter(currUser =>currUser.userName === curuser)['email']);
    const options = {
        from:"akashnagarajan5@outlook.com",
        to:"cricdonman@gmail.com",
        subject:"Demo mail for order",
        // html:`<table>
        //  <thead>
        //     <tr class="tableheadercolor">
        //     <th class="center">Product</th>
        //     <th class="center">Quantity</th>
        //     <th class="center">Price</th>
        //     <th class="center">Total Price</th>
        //     <th></th>
        //     </tr>
        // </thead>
        // <tbody>
        //     <tr *ngFor='let product of selectedProducts; let i=index'>
        //     <td class="center">{{product.productName}}</td>
        //     <td class="center">{{ product.price | currency:"&#8377;" }}</td>
        //     <td class="center">{{ product.totalPrice | currency:"&#8377;"}}</td>
        //     <td>
              
        //     </td>
        // </tr>`
        html:`<p>Thank you for ordering with GoVeggies<br>Please pay the cash during delivery</p>`
        
    };
    
    transporter.sendMail(options,function(err,info){
        if(err){
            console.log(err);
            return;
        }
        console.log("Sent "+info.response);
    })
}

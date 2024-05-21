import express from 'express';
import { createuserData, fetchuserData, updateduserData, deleteduserData } from '../userController/userController.js';
//import dataModel from '../model/userSchema.js';

const router = express();

router.post('/v1/api/postuserData', createuserData);
router.get('/v2/api/getuserData', fetchuserData );
//router.get('/v2.1/api/getuserCount', getUserTotalCount);
router.put('/v3/api/putuserData/:id', updateduserData);
router.delete('/v4/api/deleteuserData/:id', deleteduserData);



// router.put('/v3/api/putuserData/:id', async(req,res)=>{
//     let updatedUser = await dataModel.findByIdAndUpdate(req.params.id,req.body,{
//         new : true,
//         runValidators:true
//     });
//    try{
//     res.status(200).json({
//         status : 'Success',
//         data : {
//             updatedUser
//         }
//     })
//    }catch(err){
//     console.log(err)
//    }
// });

export default router;
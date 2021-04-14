const router = require('express').Router();

const File = require('../models/file');

router.get('/:uuid',async (res,req)=>{
    // colon mtlb ki ye dynamic parameter hai or hrr request k saat chnage ho jayega
    try{
        const file = await File.findOne({ uuid:req.params.uuid})
        if(!file){
            return res.render('download',{error: 'Link expired'})
        }

    return res.render('download',{
        // db se chize extract krr rhe hai
        uuid: file.uuid,
        fileName: file.fileName,
        fileSize: file.size,
        downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
    })
    }catch(err){
        return res.render('download',{error: 'Something went wrong'})
    }
})

module.exports = router;
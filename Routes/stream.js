

const router = require('express').Router()
const {startFfmpeg,stopFfmpeg,getAllfeeds} =require('rtsp2hls')
const {sendNotification} =require('../socket')
// streamName
// rtspUrl
// from the body

router.post('/addStream',async (req,res)=>{

try {

  let response=  await startFfmpeg(req.body.streamName,req.body.rtspUrl)
return res.status(200).json({status:true,message:response})
} catch (error) {
    return res.status(500).json({status:false,message:error.message})
}

})
router.get('/getAllFeeds',(req,res)=>{
try {

let streamList=getAllfeeds()
return res.status(200).json({status:'true',AllFeeds:streamList})

} catch (error) {
    return res.status(500).json({status:false,message:error.message})
}

})

// streamname from query
router.get('/deleteFeed',async(req,res)=>{
    try {
        let response=await stopFfmpeg(req?.query?.streamName)
        return res.send(response)
    } catch (error) {
        return res.status(500).json({status:false,message:error.message})
    }
})


let detections=[]
router.post('/addDetection',async(req,res)=>{
  let body=req.body
      detections.push(body)

      sendNotification(detections)
    return res.status(200).json({status:false,detections})
})


module.exports=router
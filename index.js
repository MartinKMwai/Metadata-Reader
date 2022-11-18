const ffprobe = require ('ffprobe')
const express = require('express')
const multer = require ('multer')
const path = (require ('path'))
const bodyparser = require ('body-parser')
const app = express ()
app.use(express.static(path.join(__dirname + "/uploads")))
const storage = multer .diskStorage ({
    destination: function (req, file, cb){
        cb(null, "uploads");
    }, filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
        
    },
});
const upload = multer ({storage:storage})

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

const ffprobestatic = require ('ffprobe-static')

app.get('/',(req, res ) => {
    res.sendFile(__dirname+ "/index.html")
}) 

app.listen(5000, ()=> {
    console.log("App is listening on port 5000")
})

app.post('/metadata_reader', upload.single('file'), (req,res)=>{
    console.log(req.file.path)
    ffprobe(req.file.path,{path:ffprobestatic.path},(err,info)=>{
        if (err)
            {console.log(err)
            }
        else 
            {
                console.log(info);
                res.json({
                    info:info
                })
            }

})}) 
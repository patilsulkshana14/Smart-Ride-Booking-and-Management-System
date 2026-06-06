let exp=require('express')
let mysql=require('mysql2')
let app=exp()
let cors = require('cors')
app.use(exp.json());              // for JSON
app.use(exp.urlencoded({extended:true})); // for form data
let con=mysql.createConnection({
'host':'localhost',
'database':'project_db',
'user':'root',
'password':'system'
})
con.connect(function(err){
    if(!err){
        console.log("dabase connected")
    }
    else{
        console.log("database not connected")
    }
})
app.use(cors())

app.post('/login',function(req,res){
    let {username,password}=req.body;
    let str="select * from users where username=? and password=?";
    con.query(str,[username,password],function(err,result){
        if(result.length==1){
           res.status(200).json({user:{userid:result[0].username,password:result[0].password}});
        }
        else{
            res.status(400).json({MSG:"data not fetched"});
        }
    })
})
app.listen(3000,function(){
    console.log("server is running")
})  
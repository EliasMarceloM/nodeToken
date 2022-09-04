const express = require('express')
const app = express()
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const bodyParser = require('body-parser')
app.use(express.json()) //para poder receber json 

//-- para usar body-parser
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//-- para usar body-parser


app.get('/', async (req, res) => {
 
  
      
  
  return res.sendFile(__dirname + '/cadastro.html')
  
  })


app.post('/login',async(req, res) => {
    const password= await bcrypt.hash("superman",8); 
   
    if (req.body.cNome=="Jon") {
    
 
      //-------verifica se a senha é correta 
      if (await bcrypt.compare(req.body.cSenha,password) ){
        console.log("senha correta");
        
        var token= jwt.sign({id:11111},"adssffgasdfdgs",{
          expiresIn:'8d'// 8 dias
        })
        console.log(token)
 
       var gravarToken=`<script>localStorage.setItem("nCracha","${token}")</script>`
        

        return res.send(`<html>${gravarToken} verifique o Local Storage</html>`);
      }else {
       console.log("senha errada");
       return res.status(400).json({erro:true,menssagem:"acesso negado"})
        } 
      //-------verifica se a senha é correta 

  //-----
}else {
    return res.status(400).json({erro:true,menssagem:"acesso negado"});
  }


 }) 








 

app.listen(3000, () => {console.log(`servidor porta 3000`)})


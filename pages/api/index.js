import Cors from 'cors'

var cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "ecommerceberlin",
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
})

const cors = Cors({
  methods: ['GET', 'HEAD'],
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {

  await runMiddleware(req, res, cors)

  const { id, folder } = req.query

  if(!id || !folder){
  
    res.status(400).send("bad params")
  
  }else{

    const url = await cloudinary.utils.download_folder(`${folder}/${id}`, {
      target_public_id: `${folder}_${id}`,
      flatten_folders: true
    });
  
    res.redirect(307, url)
  }
    
}

export default handler
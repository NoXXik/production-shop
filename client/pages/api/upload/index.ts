import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors'
var mv = require('mv');

const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
  })


function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
  ) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }
 
export default async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors)
    try {
        // console.log(req)
        const file = req.body
        console.log('file',file)
        
        // file.mv('../public/uploads')
        return res.status(200).json({status: 'OK'})
    } catch (e) {
        console.log(e)
        // @ts-ignores
        return res.status(500).json({message: e.message})
    }
}


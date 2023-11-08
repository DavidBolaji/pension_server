import { Request, Response } from 'express'
import { BaseModel } from '../../base.model'

export class LgaController {
  public async get(req: Request, res: Response) {
    try {
      const lga = await BaseModel.findAll('lga')
      res.status(200).send({ message: 'LGA fetch succesfully', data: lga })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async getUser(req: Request, res: Response) {
    console.log(req.body.staffId)
    try {
      const lga = await BaseModel.findOne('lga', req.body.staffId)
      res.status(200).send({ message: 'LGA fetch succesfully', data: lga })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async create(req: Request, res: Response) {
    try {
      const lga = await BaseModel.create({ ...req.body }, 'lga')
      res.status(200).send({ message: 'LGA create succesfully', data: lga })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const lga = await BaseModel.update({ ...req.body }, 'lga')
      res.status(200).send({ message: 'LGA update succesfully', data: lga })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const lga = await BaseModel.delete('lga', +id)
      res.status(200).send({ message: 'LGA update succesfully', data: lga })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  async search(req: Request, res: Response) {
    const name: string = req.query.name as string
    try {
      const lgaUsers = await BaseModel.search({ name, path: 'lga' })
      res
        .status(200)
        .send({ message: 'Fetch successfull', data: lgaUsers ? lgaUsers : [] })
    } catch (error: any) {
      console.log(error)
      res.status(400).send({ message: error.message, data: [] })
    }
  }
}

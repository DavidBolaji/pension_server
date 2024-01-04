import { Request, Response } from 'express'
import { BaseModel } from '../../base.model'

export class MiddleController {
  public async get(req: Request, res: Response) {
    try {
      const middle = await BaseModel.findAll('middle')
      res
        .status(200)
        .send({ message: 'Middle fetch succesfully', data: middle })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async getUser(req: Request, res: Response) {
    console.log(req.body.staffId)
    try {
      const lga = await BaseModel.findOne('middle', req.body.staffId)
      res.status(200).send({ message: 'Middle fetch succesfully', data: lga })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async create(req: Request, res: Response) {
    try {
      const middle = await BaseModel.create({ ...req.body }, 'middle')
      res
        .status(200)
        .send({ message: 'Middle create succesfully', data: middle })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const middle = await BaseModel.update({ ...req.body }, 'middle')
      res
        .status(200)
        .send({ message: 'Middle update succesfully', data: middle })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const middle = await BaseModel.delete('middle', +id)
      res
        .status(200)
        .send({ message: 'Middle update succesfully', data: middle })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  async search(req: Request, res: Response) {
    const name: string = req.query.name as string
    try {
      const middleUsers = await BaseModel.search({ name, path: 'middle' })
      res.status(200).send({
        message: 'Fetch successfull',
        data: middleUsers ? middleUsers : [],
      })
    } catch (error: any) {
      console.log(error)
      res.status(400).send({ message: error.message, data: [] })
    }
  }
}

import { Request, Response } from 'express'
import { BaseModel } from '../../base.model'

export class SubebController {
  public async get(req: Request, res: Response) {
    try {
      const subeb = await BaseModel.findAll('subeb')
      res.status(200).send({ message: 'Subeb fetch succesfully', data: subeb })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async create(req: Request, res: Response) {
    try {
      const subeb = await BaseModel.create({ ...req.body }, 'subeb')
      res.status(200).send({ message: 'Subeb create succesfully', data: subeb })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const subeb = await BaseModel.update({ ...req.body }, 'subeb')
      res.status(200).send({ message: 'Subeb update succesfully', data: subeb })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const subeb = await BaseModel.delete('subeb', +id)
      res.status(200).send({ message: 'Subeb update succesfully', data: subeb })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }

  async search(req: Request, res: Response) {
    const name: string = req.query.name as string
    try {
      const subebUsers = await BaseModel.search({ name, path: 'subeb' })
      res.status(200).send({
        message: 'Fetch successfull',
        data: subebUsers ? subebUsers : [],
      })
    } catch (error: any) {
      console.log(error)
      res.status(400).send({ message: error.message, data: [] })
    }
  }
}

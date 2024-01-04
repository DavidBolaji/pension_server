import { Request, Response } from 'express'
import { BaseModel } from '../../base.model'

export class PhcbController {
  public async get(req: Request, res: Response) {
    try {
      const phcb = await BaseModel.findAll('phcb')
      res.status(200).send({ message: 'Phcb fetch succesfully', data: phcb })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async getUser(req: Request, res: Response) {
    console.log(req.body.staffId)
    try {
      const phcb = await BaseModel.findOne('phcb', req.body.staffId)
      res.status(200).send({ message: 'PHCB fetch succesfully', data: phcb })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async create(req: Request, res: Response) {
    try {
      const phcb = await BaseModel.create({ ...req.body }, 'phcb')
      res.status(200).send({ message: 'Phcb create succesfully', data: phcb })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const phcb = await BaseModel.update({ ...req.body }, 'phcb')
      res.status(200).send({ message: 'Phcb update succesfully', data: phcb })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const phcb = await BaseModel.delete('phcb', +id)
      res.status(200).send({ message: 'Phcb update succesfully', data: phcb })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  async search(req: Request, res: Response) {
    const name: string = req.query.name as string
    try {
      const phcbUsers = await BaseModel.search({ name, path: 'phcb' })
      res.status(200).send({
        message: 'Fetch successfull',
        data: phcbUsers ? phcbUsers : [],
      })
    } catch (error: any) {
      console.log(error)
      res.status(400).send({ message: error.message, data: [] })
    }
  }
}

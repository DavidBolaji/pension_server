import { Request, Response } from 'express'
import db from '../../../db/db-two'

export class TeacherController {
  public async get(req: Request, res: Response) {
    try {
      const teacher = await db.teacher.findMany({})
      console.log(teacher)
      res
        .status(200)
        .send({ message: 'Teacher fetch succesfully', data: teacher })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async getUser(req: Request, res: Response) {
    console.log(req.body.name)
    try {
      const teacher = await db.teacher.findFirst({
        where: {
          name: req.body.name,
        },
      })
      res.status(200).send({ message: 'PHCB fetch succesfully', data: teacher })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const teacher = await db.teacher.create({
        data: {
          ...req.body,
        },
      })
      res
        .status(200)
        .send({ message: 'Subeb create succesfully', data: teacher })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }
  public async update(req: Request, res: Response) {
    const { id } = req.params
    try {
      const subeb = await db.teacher.update({
        where: {
          id,
        },
        data: { ...req.body },
      })
      res.status(200).send({ message: 'Subeb update succesfully', data: subeb })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }

  public async updateOne(req: Request, res: Response) {
    const { id } = req.query
    const key = Object.keys(req.body)

    const teachers = key.map(async k => {
      await db.teacher.update({
        where: {
          id: id as string,
        },
        data: {
          [k]: req.body[k],
        },
      })
    })
    try {
      const teacher = await Promise.all([teachers])
      res
        .status(200)
        .send({ message: 'Teacher update succesful', data: teacher })
    } catch (error) {
      console.log((error as Error).message)
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const subeb = await db.teacher.delete({
        where: {
          id,
        },
      })
      res.status(200).send({ message: 'Subeb update succesfully', data: subeb })
    } catch (error) {
      res.status(500).send({ message: 'Server Error', data: [] })
    }
  }

  async search(req: Request, res: Response) {
    const temp = Object.keys(req.query)
    const search = temp[0]
    const value = req.query[search]

    try {
      const subebUsers = await db.teacher.findMany({
        where: {
          [search]: {
            contains: value,
          },
        },
      })
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

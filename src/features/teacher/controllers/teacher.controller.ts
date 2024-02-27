import { Request, Response } from 'express'
import db from '../../../db/db-two'

export class TeacherController {
  public async get(req: Request, res: Response) {
    try {
      const teacher = await db.teacher.findMany({
        include: {
          deduction: true,
        },
      })
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
        include: {
          deduction: true,
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

    const teachers = await db.teacher.update({
      where: {
        id: id as string,
      },
      data: {
        name: typeof req.body.name !== 'undefined' ? req.body.name : undefined,
        staffId:
          typeof req.body.staffId !== 'undefined'
            ? req.body.staffId
            : undefined,
        phoneNumber:
          typeof req.body.phoneNumber !== 'undefined'
            ? req.body.phoneNumber
            : undefined,
        DOR: typeof req.body.DOR !== 'undefined' ? req.body.DOR : undefined,
        pfa: typeof req.body.pfa !== 'undefined' ? req.body.pfa : undefined,
        RSA: typeof req.body.RSA !== 'undefined' ? req.body.RSA : undefined,
        gab: typeof req.body.gab !== 'undefined' ? req.body.gab : undefined,
        notes:
          typeof req.body.notes !== 'undefined' ? req.body.notes : undefined,
        attachement1:
          typeof req.body.attachement1 !== 'undefined'
            ? req.body.attachement1
            : undefined,
        attachement2:
          typeof req.body.attachement2 !== 'undefined'
            ? req.body.attachement2
            : undefined,
        attachement3:
          typeof req.body.attachement3 !== 'undefined'
            ? req.body.attachement3
            : undefined,
      },
    })

    // const teachers = key.map(async k => {
    //   await db.teacher.update({
    //     where: {
    //       id: id as string,
    //     },
    //     data: {
    //       [k]: req.body[k],
    //     },
    //   })
    // })

    const deduction = await db.deduction.upsert({
      where: {
        teacherId: teachers.id as string,
      },
      update: {
        otherstate:
          typeof req.body['otherstate'] !== 'undefined'
            ? req.body['otherstate']
            : undefined,
        overstay:
          typeof req.body['overstay'] !== 'undefined'
            ? req.body['overstay']
            : undefined,
        vloan:
          typeof req.body['vloan'] !== 'undefined'
            ? req.body['vloan']
            : undefined,
        ossadec:
          typeof req.body['ossadec'] !== 'undefined'
            ? req.body['ossadec']
            : undefined,
        totalde:
          typeof req.body['totalde'] !== 'undefined'
            ? req.body['totalde']
            : undefined,
        nab:
          typeof req.body['nab'] !== 'undefined' ? req.body['nab'] : undefined,
        cab:
          typeof req.body['cab'] !== 'undefined' ? req.body['cab'] : undefined,
      },
      create: {
        otherstate:
          typeof req.body['otherstate'] !== 'undefined'
            ? req.body['otherstate']
            : undefined,
        overstay:
          typeof req.body['overstay'] !== 'undefined'
            ? req.body['overstay']
            : undefined,
        vloan:
          typeof req.body['vloan'] !== 'undefined'
            ? req.body['vloan']
            : undefined,
        ossadec:
          typeof req.body['ossadec'] !== 'undefined'
            ? req.body['ossadec']
            : undefined,
        totalde:
          typeof req.body['totalde'] !== 'undefined'
            ? req.body['totalde']
            : undefined,
        nab:
          typeof req.body['nab'] !== 'undefined' ? req.body['nab'] : undefined,
        cab:
          typeof req.body['cab'] !== 'undefined' ? req.body['cab'] : undefined,
        teacherId: teachers.id,
      },
    })

    try {
      res
        .status(200)
        .send({ message: 'Teacher update succesful', data: teachers })
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

import { query } from '../db/db'
import { RowDataPacket } from 'mysql2'

export class BaseModel {
  static async findAll(path: string) {
    let sql = `SELECT * FROM ${path}`
    try {
      const [result] = await (query.execute(sql) as Promise<RowDataPacket[]>)
      return result
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }
  static async findOne(path: string, id: string) {
    let sql = `SELECT * FROM ${path} WHERE staffId = ?`
    console.log(id)
    try {
      const [result] = await (query.execute(sql, [id]) as Promise<
        RowDataPacket[]
      >)
      return result
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  static async delete(path: string, id: number) {
    let sql = `DELETE FROM ${path} WHERE id = ?`
    try {
      await (query.execute(sql, [id]) as Promise<RowDataPacket[]>)
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  static async create(data: any, path: string) {
    let sql2 = `INSERT INTO ${path}(`
    let val = `VALUES(`
    const updateList = Object.keys(data)
    const update = [
      'staffId',
      'sex',
      'phoneNumber',
      'penNumber',
      'LGA',
      'pfa',
      'amount_pending',
      'amount_paid',
      'amount_expected',
      'attachement1',
      'attachement2',
      'attachement3',
    ]
    const keys: any[] = []
    updateList.forEach((list: string, ind) => {
      if (update.includes(list)) {
        if (ind === updateList.length - 1) {
          sql2 += `${list}) `
          val += `?)`
        } else {
          sql2 += `${list}, `
          val += `?, `
        }
        keys.push((data as any)[list])
      }
    })

    sql2 += val
    console.error(sql2)
    console.log(keys)

    try {
      const [result] = await (query.execute(sql2, [...keys]) as Promise<
        RowDataPacket[]
      >)
      console.log(result)
      console.log(result.insertId)
      return { id: result.insertId }
    } catch (error: any) {
      console.log(error.message)
      throw new Error(error.message)
    }
  }

  static async update(data: any, path: string) {
    let sql2 = `UPDATE ${path} SET `
    const updateList = Object.keys(data)
    const updateFields = [
      'amount_pending',
      'amount_paid',
      'amount_expected',
      'attachement1',
      'attachement2',
      'attachement3',
    ]
    const keys: any[] = []
    let setFields: any[] = []

    updateFields.forEach((field: string) => {
      if (updateList.includes(field) && data[field] !== null) {
        //@ts-ignore
        setFields.push(`${field} = ?`)
        keys.push(data[field])
      }
    })

    sql2 += setFields.join(', ')
    sql2 += ` WHERE staffId = ?`
    console.error(sql2)
    console.log(keys)

    try {
      const [result] = await (query.execute(sql2, [
        ...keys,
        data.staffId,
      ]) as Promise<RowDataPacket[]>)

      return { id: result.insertId }
    } catch (error: any) {
      console.log(error.message)
      throw new Error(error.message)
    }
  }

  static async search(data: { name: string; path: string }) {
    const sql = `
    SELECT staffId
    FROM ${data.path}
    WHERE staffId LIKE ?
  `
    try {
      const [result] = await query.execute(sql, [`%${data.name}%`])
      return result
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }
}

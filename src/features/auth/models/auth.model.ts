import { RowDataPacket } from 'mysql2'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { query } from '../../../db/db'
import { IAuthDb, Itoken } from '../interfaces/auth.interface'
const saltRounds = 10

export class AuthModel {
  public static table = 'auth'

  static async findbyEmail(email: string) {
    const sql = `SELECT * FROM ${AuthModel.table} WHERE email = ?`
    try {
      const [result] = await query.execute(sql, [email])
      return result
    } catch (error: any) {
      // console.log('error fetching')
      console.error(error)
      throw new Error(error.message)
    }
  }
  static async storeToken(id: number, token: string) {
    const sql = `SELECT * FROM ${AuthModel.table} WHERE id = ?`
    const sql2 = `UPDATE ${AuthModel.table} SET token = ? WHERE id = ?`
    const newToken = JSON.stringify([{ token }])
    try {
      const [result] = await (query.execute(sql, [id]) as Promise<
        RowDataPacket[]
      >)
      if (result[0].token === null) {
        await query.execute(sql2, [newToken, id])
      } else {
        let tokenList = result[0].token as unknown as string
        const mtokenList = JSON.parse(tokenList)
        mtokenList.push({ token })
        await query.execute(sql2, [JSON.stringify(mtokenList), id])
      }
    } catch (error) {
      console.log(error)
    }
  }
  static async signin(email: string, password: string) {
    try {
      const result = (await this.findbyEmail(email)) as unknown as IAuthDb[]
      if (result && result.length > 0) {
        const passwordMatch = bcrypt.compare(password, result[0].password!)

        if (!passwordMatch) throw new Error('invalid credentials')

        const token = jwt.sign(
          { id: JSON.stringify(result[0].id) },
          process.env.JWT_SECRET!,
        )

        await this.storeToken(result[0].id!, token)

        return { ...result[0], token }
      } else {
        throw new Error('invalid credentials')
      }
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }
  static async findAuth(id: number, token: string) {
    const sql = `SELECT * FROM ${AuthModel.table} WHERE id = ?`

    try {
      const [result] = await (query.execute(sql, [id]) as Promise<
        RowDataPacket[]
      >)
      let holder = result[0].token!
      holder = JSON.parse(holder)
      const tokenExist = holder.filter((t: any) => t.token === token)
      if (tokenExist.length > 0) {
        return result[0]
      }
    } catch (error) {
      console.error(error)
    }
  }

  static async removeToken(id: number, token: string) {
    const sql = `SELECT * FROM ${AuthModel.table}  WHERE id = ?`
    try {
      const [result] = await (query.execute(sql, [id]) as Promise<
        RowDataPacket[]
      >)
      const holder = JSON.parse(result[0].token)
      const tokenList = holder.filter((t: any) => t.token !== token)
      this.replaceToken(id, tokenList)
    } catch (error) {
      console.log(error)
    }
  }

  static async replaceToken(id: number, token: Itoken) {
    const sql2 = `UPDATE ${AuthModel.table} SET token = ? WHERE id = ?`
    let tokenList = token
    try {
      const ntokenList = JSON.stringify(tokenList)
      await query.execute(sql2, [ntokenList, id])
    } catch (error) {
      console.log(error)
    }
  }
}

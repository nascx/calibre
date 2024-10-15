import { db } from "../config/db"
import {HistoricData} from '../interfaces/HistoricData'

export class User {

    static findByCalibrator = async (calibratorId: string) => {
        return new Promise(async (resolve, reject) => {
            const sql = `SELECT 
                id, calibrator_id, calibrator_type, calibrator_description, calibrator_model, location, departament, input_date, out_date 
                FROM historic 
                WHERE calibrator_id = ?`
            await db.query(sql, [calibratorId], (err, data) => {
                if (err) {
                    return reject({ message: 'Erro na consulta sql' })
                }

                if (data && data.length > 0) {
                    return resolve(data)
                } else {
                    return reject({ message: 'Não foi encontrado calibrador com esse código' })
                }
            })
        })
    }

    static createNewRegister = async ({ calibrator_id, calibrator_type, calibrator_description, calibrator_model, location, departament, input_date, out_date }: HistoricData) => {
        return new Promise(async (resolve, reject) => {
            const query = `INSERT INTO historic 
            (calibrator_id, calibrator_type, calibrator_description, calibrator_model, location, departament, input_date, out_date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
            await db.query(query, [
                calibrator_id,
                calibrator_type,
                calibrator_description,
                calibrator_model,
                location,
                departament,
                input_date,
                out_date
            ], (err, data) => {
                if (err) {
                    console.log(err)
                    reject({ message: 'Erro no servidor ao atualizar os dados!', error: err })
                }
                if (data.affectedRows > 0) {
                    resolve({ message: `O calibrador ${calibrator_id}, mudou de ${location} (${departament}), para ${location} (${departament})` })
                } else {
                    console.log('err')
                    reject({ message: 'Erro no servidor ao atualizar os dados!' })
                }
            })
        })
    }

    static updateLocationAndOutDate = async (historicId: number, newOutDate: string) => {
        return new Promise(async (resolve, reject) => {
            const query = `UPDATE historic 
            SET out_date = ? WHERE id = ?`

            await db.query(query, [
                newOutDate, historicId
            ], (error, data) => {
                if (error) {
                    console.log(error)
                    reject({ message: 'Erro no servidor ao atualizar dados!', error })
                }
                if (data.affectedRows > 0) {
                    resolve({ message: 'Dados atualizados com sucesso!' })
                } else {
                    console.log('Erro incomum')
                    reject({ message: 'Erro no servidor ao atualizar dados!' })
                }
            })
        })
    }
}

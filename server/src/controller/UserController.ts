import express, { Request, Response } from 'express'
import { User } from '../model/User'
import moment from 'moment'

export class UserController {
    static getStoric = async (req: Request, res: Response) => {

        try {
            const { calibratorId } = req.query

            const historic = await User.findByCalibrator(calibratorId as string)

            if (historic) {
                res.status(200).json(historic)
            }

        } catch (error) {
            res.status(400).json({ message: error })
        }
    }

    static changeLocation = async (req: Request, res: Response) => {
        try {
            const { historicId, calibratorId, calibratorType, calibratorModel, calibratorDescription, newLocation, newDepartament } = req.body
            await User.updateLocationAndOutDate(historicId, moment().format('DD/MM/YYYY')).then(async (response) => {
                await User.createNewRegister(
                    {
                        calibrator_id: calibratorId,
                        calibrator_type: calibratorType,
                        calibrator_description: calibratorDescription,
                        calibrator_model: calibratorModel,
                        location: newLocation,
                        departament: newDepartament,
                        input_date: moment().format('DD/MM/YYYY'),
                        out_date: '00/00/0000'
                    }
                )
            }).then(response => res.status(200).json({message: 'Dados atualizados com sucesso!'}))
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
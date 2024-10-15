import { ChangeEvent, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'

interface HistoricData {
    id: number,
    calibrator_id: string,
    calibrator_type: string,
    calibrator_description: string,
    calibrator_model: string,
    location: string,
    departament: string,
    input_date: string,
    out_date: string
}

const useGetCalibratorData = () => {

    const [changeLocation, setChangeLocation] = useState<boolean>(false)

    const [calibratorIdCurrent, setCalibratorIdCurrent] = useState<number>()

    const [input, setInput] = useState<string>('')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const [historic, setHistoric] = useState<HistoricData[]>([])

    const handleSearchByCalibrator = () => {
        axios.get('http://localhost:1777/historic', {
            params: {
                calibratorId: input
            }
        }).then((res) => {
            setHistoric(res.data as HistoricData[])
            console.log(res.data)
            setCalibratorIdCurrent(res.data.length - 1)
        }).catch((error) => {
            toast.error(error.response.data.message.message)
        })
    }

    const handleBack = () => {
        calibratorIdCurrent === 0 ? toast.error('Não existe registro anterior a este!') : setCalibratorIdCurrent((prev) => prev as number - 1)
    }

    const handleNext = () => {
        console.log(calibratorIdCurrent, historic.length)
        calibratorIdCurrent as number + 1 >= historic.length ? toast.error('Não existe registro posterior a este!') : setCalibratorIdCurrent((prev) => prev as number + 1)
    }

    const [id, setId] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [model, setModel] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [inputDate, setInputDate] = useState<string>('00/00/0000')
    const [outDate, setOutDate] = useState<string>('00/00/0000')
    const [departament, setDepartament] = useState<string>('')
    const [location, setLocation] = useState<string>('')

    const handleChangeLocation = async () => {
        await axios.post('http://10.12.100.156:1777/historic', {
            historicId: historic[historic.length - 1].id,
            calibratorId: historic[0].calibrator_id,
            calibratorType: historic[0].calibrator_type,
            calibratorModel: historic[0].calibrator_model,
            calibratorDescription: historic[0].calibrator_description,
            newLocation: location,
            newDepartament: departament
        }).then(async (res) => {
            toast.success(res.data.message)
            setChangeLocation(false)
            await axios.get('http://10.12.100.156:1777/historic', {
                params: {
                    calibratorId: input
                }
            }).then((res) => {
                setHistoric(res.data as HistoricData[])
                console.log(res.data)
                setCalibratorIdCurrent(res.data.length - 1)
            }).catch((error) => {
                toast.error(error.response.data.message.message)
            })
        }).catch((error) => {
            toast.error(error.response.data.message.message)
        })
    }

    return {
        id, setId,
        type, setType,
        model, setModel,
        description, setDescription,
        inputDate, setInputDate,
        outDate, setOutDate,
        departament, setDepartament,
        location, setLocation,
        input, handleInputChange,
        handleSearchByCalibrator,
        historic,
        calibratorIdCurrent,
        handleBack, handleNext,
        changeLocation, setChangeLocation,
        handleChangeLocation
    }
}

export default useGetCalibratorData
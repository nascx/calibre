'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLeftLong, faLocationDot, faLocationPin, faMagnifyingGlass, faPen, faRightLong } from "@fortawesome/free-solid-svg-icons";
import Information from "@/components/Information";
import useGetCalibratorData from './hooks/useGetCalibratorData';
import ComonInput from '@/components/ComonInput';

export default function Home() {

  const {
    departament, setDepartament,
    location, setLocation,
    input, handleInputChange,
    handleSearchByCalibrator,
    historic, calibratorIdCurrent,
    handleBack, handleNext,
    changeLocation, setChangeLocation,
    handleChangeLocation
  } = useGetCalibratorData()



  return (
    <div className="flex flex-col h-screen w-full justify-center items-center gap-8">
      <div className="flex w-full justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Pesquise pelo código do instrumento"
          className="w-[350px] border-2 border-blue-200 rounded-md p-1 focus:outline-none placeholder:text-blue-300 text-blue-800"
          value={input}
          onChange={handleInputChange}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} width={24} className="cursor-pointer text-blue-600 text-4xl" onClick={handleSearchByCalibrator} />
      </div>
      {
        historic.length > 0 ? <div className="flex flex-col border-2 border-blue-200 w-[700px] h-[310px] rounded-lg justify-center items-center gap-4">
          <div className="flex w-[650px] justify-end rounded-md cursor-pointer" onClick={() => setChangeLocation(true)}>
            <FontAwesomeIcon icon={faLocationPin} width={24} className="cursor-pointer text-blue-600 text-3xl" />
            <FontAwesomeIcon icon={faPen} width={14} className="-ml-[18px] text-white cursor-pointer text-xl mt-[2px]" />
          </div>
          <div className="flex w-full justify-around gap-2">
            <Information
              label="CÓDIGO"
              value={historic[calibratorIdCurrent as number].calibrator_id}
              classNameInput="w-[80px]"
            />
            <Information
              label="TIPO"
              value={historic[calibratorIdCurrent as number].calibrator_type}
              classNameInput="w-[30px]"
            />
            <Information
              label="MODELO/MARCA"
              value={historic[calibratorIdCurrent as number].calibrator_model}
              classNameInput="w-[180px]"
            />
          </div>
          <Information
            label="DESCRIÇÃO"
            value={historic[calibratorIdCurrent as number].calibrator_description}
            classNameInput="w-[550px]"
          />
          <div className="flex justify-center items-center w-[350px] bg-blue-200 rounded-md">
            <FontAwesomeIcon icon={faCalendar} width={15} className="text-blue-900" />
            <Information
              label="ENTRADA"
              value={historic[calibratorIdCurrent as number].input_date}
            />
            {
              historic[calibratorIdCurrent as number].out_date !== '00/00/0000' ? <Information label="SAÍDA" value={historic[calibratorIdCurrent as number].out_date} /> : <></>
            }
          </div>
          <div className="flex justify-center items-center w-[650px] bg-blue-200 rounded-md">
            <FontAwesomeIcon icon={faLocationDot} width={15} className="text-blue-900" />
            <Information
              label="ÁREA"
              value={historic[calibratorIdCurrent as number].departament}

            />
            <Information
              label="LOCAL"
              value={historic[calibratorIdCurrent as number].location}
            />
          </div>
          <div className="flex w-[650px] justify-end gap-2">
            <FontAwesomeIcon icon={faLeftLong} width={30} className="cursor-pointer text-blue-600 text-3xl" onClick={handleBack} />
            <FontAwesomeIcon icon={faRightLong} width={30} className="cursor-pointer text-blue-600 text-3xl" onClick={handleNext} />
          </div>
        </div> : <></>
      }
      {
        changeLocation && <div className="absolute h-screen w-full">
          <div className="flex justify-center items-center h-full w-full bg-white">
            <div className="flex flex-col border-2 border-blue-200 w-[500px] rounded-md items-center justify-center p-4 gap-4">
              <p className='text-blue-800'>Mudando a localização do calibrador {historic[calibratorIdCurrent as number]?.calibrator_id ?? ''}</p>
              <ComonInput placeholder='Nova área' value={departament} setValue={setDepartament}/>
              <ComonInput placeholder='Nova localização' value={location} setValue={setLocation}/>
              <div className="flex justify-end w-full">
                <button className='bg-blue-700 text-white p-1 rounded-md' onClick={handleChangeLocation}>Mudar localização</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

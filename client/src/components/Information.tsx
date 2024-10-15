import React from 'react'

interface InformationProps  {
    label: string,
    value: string
    classNameInput?: string
}

const Information = ({label, value, classNameInput} : InformationProps ) => {
    return (
        <div className="flex h-[30px] justify-center items-center p-1 rounded-md bg-blue-200 text-blue-900">
            <p className="font-bold p-1 text-blue-900">{label}:</p>
            <p className={`focus:outline-none bg-transparent p-1 ${classNameInput}`}>{value}</p>
        </div>
    )
}

export default Information
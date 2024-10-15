import React, { ChangeEvent, SetStateAction } from 'react'

interface ComonInputProps {
    placeholder: string,
    value: string,
    setValue: React.Dispatch<SetStateAction<string>>
}

const ComonInput = ({placeholder, value, setValue} : ComonInputProps) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className='border-2 border-blue-300 h-[40px] w-full rounded-md p-2 outline-none placeholder:text-blue-300 text-blue-800'
            value={value}
            onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                setValue(ev.target.value)
            }}
        />
    )
}

export default ComonInput
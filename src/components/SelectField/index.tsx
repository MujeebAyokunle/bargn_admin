import React from 'react'

function SelectField({ label, placeholder, value, options = [], setValue }: any) {
    return (
        <>
            {
                label && <p className='text-[#111827] font-medium text-sm mb-1 mt-3' >{label}</p>
            }
            <select name={label} id={label} className={`border text-black mb-3 w-full focus:outline-none p-2 border-[#E5E7EB] rounded ${!label && "mt-3"}`} value={value} onChange={(param) => setValue(param.target.value)}>
                <option value="">{placeholder}</option>
                {
                    options.map((option: string, index: number) => (
                        <option key={index} value={option}>{option}</option>
                    ))
                }
            </select>
        </>
    )
}

export default SelectField
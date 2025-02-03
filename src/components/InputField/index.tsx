import React from 'react'

function InputField({ icon, label, placeholder, setValue, value }: any) {
    return (
        <>
            {
                label && <p className='text-[#111827] font-medium text-sm mb-1 mt-3' >{label}</p>
            }
            <div className={`border mb-3 flex flex-row items-center p-2 border-[#E5E7EB] rounded ${!label && "mt-3"}`} >
                {icon ? icon : ""}
                <input onChange={(param) => setValue(param?.target?.value)} value={value} type="text" className='text-black flex focus:outline-none ms-3 text-sm w-full font-medium' placeholder={placeholder || ""} />
            </div>
        </>
    )
}

export default InputField
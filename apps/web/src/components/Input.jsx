import { useId, forwardRef } from "react"

const Input = forwardRef(function Input({label, type, className = "", ...props}, ref){
    const id = useId()

    return (
        <>
        <div className="flex w-full">
            <div>
                {label && <label htmlFor={id}>{label}</label>}
            </div>

            <div>
                <input type={type} className={`${className}`} ref={ref} {...props} id={id}/>
            </div>
        </div>
        </>
    )
})

export default Input
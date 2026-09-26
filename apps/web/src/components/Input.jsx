import { useId, forwardRef } from "react"

const Input = forwardRef(function Input({label, type, className = "", ...props}, ref){
    const id = useId()

    return (
        <>
        <div className="w-full">
            <div>
                {label && <label htmlFor={id}>{label}</label>}
            </div>

            <div>
                <input type={type} className={`${className} pl-0.5 rounded`} ref={ref} autoComplete="on" required {...props} id={id}/>
            </div>
        </div>
        </>
    )
})

export default Input
function Button({children, type="button", ...props}, className){
    return (
        <button className={`cursor-pointer ${className}`}>{children}</button>
    )
}

export default Button
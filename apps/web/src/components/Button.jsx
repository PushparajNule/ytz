function Button({children, type="button"}, className){
    return (
        <button className={`cursor-pointer ${className}`}>{children}</button>
    )
}

export default Button
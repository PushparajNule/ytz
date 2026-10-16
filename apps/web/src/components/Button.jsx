function Button({children, type="submit", className="", onClick}){
    return (
        <button type={type} onClick={onClick} className={`cursor-pointer ${className}`}>{children}</button>
    )
}

export default Button
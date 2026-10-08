function Icon({src, alt="Icon", className=""}) {
    return (
        <img src={src} alt={alt} className={`rounded-full object-cover ${className}`}></img>
    )
}

export default Icon
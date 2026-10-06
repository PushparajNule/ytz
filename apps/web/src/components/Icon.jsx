function Icon({src, alt="Icon", className=""}) {
    return (
        <div>
            <img src={src} alt={alt} className={`rounded-full object-cover ${className}`}></img>
        </div>
    )
}

export default Icon
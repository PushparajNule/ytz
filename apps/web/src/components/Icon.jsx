function Icon({src, alt="Icon"}) {
    return (
        <div className="">
            <img src={src} alt={alt} className="rounded-full w-10 h-10 object-cover"></img>
        </div>
    )
}

export default Icon
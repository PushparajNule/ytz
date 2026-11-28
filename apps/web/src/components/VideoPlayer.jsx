import conf from "../conf/conf.js"
import {Video} from '@imagekit/react'

function VideoPlayer({videoUrl, thumbnailUrl, videoRef}){

    return (
        <>
        <Video urlEndpoint={conf.VITE_IMAGE_KIT_URL_ENDPOINT} src={videoUrl} ref={videoRef} className={`w-max h-max rounded`} controls preload="none" poster={thumbnailUrl} autoPlay controlsList="nodownload" disablePictureInPicture />
        </>
    )
}

export default VideoPlayer
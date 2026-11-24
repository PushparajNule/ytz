import conf from "../conf/conf.js"
import {Video} from '@imagekit/react'

function VideoPlayer({videoUrl, thumbnailUrl}){

    return (
        <>
        <Video urlEndpoint={conf.VITE_IMAGE_KIT_URL_ENDPOINT} src={videoUrl} className={`w-max h-max p-1 rounded`} controls preload="none" poster={thumbnailUrl} autoPlay />
        </>
    )
}

export default VideoPlayer
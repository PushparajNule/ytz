import { NavLink } from 'react-router'
import Icon from './Icon'

function PostCard({src, alt="Thumbnail", title, avatar, owner, to}){

    return (
        <>
        <div className='w-max mt-4 hover:bg-gray-300 p-2 rounded'>
            <NavLink to={to}>
                <div>
                    <Icon src={src} alt={alt} className='h-80 w-130 rounded-sm'/>
                </div>
            </NavLink>

            <div className='mt-2'>
                <div className='flex items-center'>
                    <div className='mr-2'>
                        <Icon src={avatar} alt='avatar' className='h-10 w-12'/>
                    </div>

                    <div className='w-full'>
                        <div>
                            <div>
                                {title}
                            </div>
                        </div>

                        <div className='flex text-sm text-gray-500 justify-between'>
                            <div className=''>
                                {owner}
                            </div>

                            <div className=''>
                                :
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default PostCard
import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import { useQuery } from '@tanstack/react-query'
import subsApi from '../api/subs.api'

function PostCard({src, alt="Thumbnail", title, avatar, owner, to}){

    return (
        <>
        <NavLink to={to}>
            <div className='w-max mt-4 border p-2 rounded'>
                <div>
                    <Icon src={src} alt={alt} className='h-50 w-75 rounded-sm'/>
                </div>

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
        </NavLink>
        </>
    )
}

export default PostCard
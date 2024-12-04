import { sleep } from '@/lib/utils'
import React from 'react'
import Category from '@/app/(site)/components/Category'
const HomePage = async () => {
    return (
        <div className='min-h-[600px]'>
            <div className='mt-9'></div>
            <Category />
        </div>


    )
}

export default HomePage
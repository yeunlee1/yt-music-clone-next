import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const UserIcon = () => {
    return (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>

    )
}

export default UserIcon
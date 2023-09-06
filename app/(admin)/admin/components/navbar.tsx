import { ModeToggle } from '@/components/mode-toggle';
import { UserNav } from '@/components/navbar/user-nav';
import React from 'react';
import { MainNav } from './main-nav';

interface Props {
    name: string;
}

const HelloWorld: React.FC<Props> = ({ name }) => {
    return (
        <h1>
            <div className='border-b'>
                <div className='flex h-16 items-center px-4'>
                    <MainNav className='mx-6' />
                    <div className='ml-auto flex items-center space-x-4'>
                        <UserNav />
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </h1>
    );
};

export default HelloWorld;

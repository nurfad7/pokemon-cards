import { FC } from 'react'
import { cn } from '../../utils';
import usePokemonAll from '../../hooks/usePokemonAll';

const Detail: FC = () => {
  usePokemonAll();
  return (
    <div className='w-full min-h-svh flex flex-col bg-dark-grey overflow-hidden'>
        <div className='flex justify-start items-center border-b-2 
                       border-b-medium-grey w-full h-12 px-6'>
          <img src="/logo.svg" alt='pokemon logo' />
        </div>
        <div className='flex flex-col p-7'>
          <div className='text-light-grey text-lg'>
            #1001
          </div>
          <div className='h-56 flex justify-center items-center'>
          <img className='h-full aspect-auto'
             src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt='pokemon photo' />
          </div>
          <div className='flex h-16 relative'>
            <div className='text-4xl font-medium text-white'>Bulbasaur</div>
            <div className='absolute right-[-3rem] top-[-4rem]'>
              <img className='h-40 aspect-auto'
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt='pokemon pixel photo' />
            </div>
          </div>
          <div className='flex flex-col p-5 bg-dark-navy rounded-md'>
            <div className='flex flex-col gap-1 border-b border-b-light-grey pb-5'>
              <div className='text-light-grey'>Health</div>
              <div className='relative bg-light-grey w-full h-1 rounded-full'>
                <div className={cn(
                  'absolute bg-gradient-to-r from-health-green-1 to-health-green-2 h-full w-1/2 rounded-full'
                  )}>
                </div>
              </div>
              <div className='text-white text-b flex items-center'>
                <span className='text-2xl font-medium leading-none'>144&nbsp;</span>from 1000
              </div>
            </div>
            <div className='flex gap-10 pt-5'>
              <div className='w-[5.5rem]'>
                <div className='text-light-grey leading-none'>Attack</div>
                <div className='text-2xl text-white leading-none'>32</div>
              </div>
              <div className='flex flex-col'>
                <div className='text-light-grey leading-none'>Defense</div>
                <div className='text-2xl text-white leading-none'>50</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Detail;
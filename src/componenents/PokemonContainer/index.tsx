import { FC } from 'react'
import { cn } from '../../utils';
import usePokemonDetails from '../../hooks/usePokemonDetail';

interface PokemonContainerProps {
    isGrid: boolean,
    pokemon: PokemonDetails
}

const PokemonContainer: FC<PokemonContainerProps> = ({isGrid, pokemon}) => {
  const pokemonDetail = usePokemonDetails(pokemon.name);
  console.log(pokemonDetail)

  return (
    <div className='w-full flex flex-col bg-white gap-3 p-2 font-medium'>
        <div className='flex justify-between'>
            <div className={cn('text-grass-green')}>Grass</div>
            <div className='text-base'>#1001</div>
        </div>
        <div className={cn('flex justify-center items-center', !isGrid ? 'h-[10.8rem]' : 'h-[5.625rem]')}>
          IMG
        </div>
        <div className={cn('text-lg text-center', !isGrid ? 'text-nowrap' : 'text-wrap')}>{pokemon.name}</div>
    </div>
  )
}

export default PokemonContainer;
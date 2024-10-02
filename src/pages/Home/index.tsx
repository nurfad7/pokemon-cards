import { FC, useState, useContext } from 'react'
import { cn } from '../../utils';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSearch, faSquare, faBorderAll } from '@fortawesome/free-solid-svg-icons';
import PokemonContainer from '../../componenents/PokemonContainer';
import { PokemonListContext } from '../../context/PokemonListContext';

const Home: FC = () => {
  //const [filterText, setFilterText] = useState<string>("");
  const [isGrid, setIsGrid] = useState(false);
  const { loading, error, pokemonList } = useContext(PokemonListContext);
  
  return (
    <div className='w-full min-h-svh flex flex-col bg-dark-grey'>
        <div className='flex justify-between items-center  border-b-2 
                       border-b-medium-grey w-full h-12 px-6'>
          <img src="/logo.svg" alt='pokemon logo' />
          <Icon icon={faSearch} className='text-2xl text-center text-white' />
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-evenly gap-3 my-3 h-10'>
            <div className='w-3/5'>
              <select name='sort' aria-label='sort by' defaultValue={""}
                  className='bg-medium-grey w-full h-full rounded-md text-light-grey'>
                <option value="" disabled>Sort by</option>
                <option value="type">Type</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className='w-1/4 grid grid-cols-2'>
              <div onClick={() => {setIsGrid(false)}}
                  className={cn('flex justify-center items-center rounded-l-md border-r border-light-grey', 
                                !isGrid ? 'bg-medium-navy' : 'bg-medium-grey cursor-pointer')}>
                <Icon icon={faSquare} 
                  className='text-xs text-transparent border-2 rounded-sm border-light-grey text-center' />
              </div>
              <div onClick={() => {setIsGrid(true)}}
                  className={cn('flex justify-center items-center rounded-r-md border-l border-light-grey', 
                                isGrid ? 'bg-medium-navy' : 'bg-medium-grey cursor-pointer')}>
                <Icon icon={faBorderAll} className='text-lg text-center text-light-grey' />
              </div>
            </div>
          </div>
            {
              loading ? (
                <div className='flex h-96 justify-center items-center text-center text-light-grey'>
                  <div>Loading...</div>
                </div>) :
              error ? (<div className='flex h-96 justify-center items-center text-center text-light-grey'>
                  <div>Failed to fetch Pokémon :(</div>
                </div>) :
              (
                <div className={cn('gap-3 justify-center items-center', 
                                  isGrid ? 'grid grid-cols-2 p-3' : 'flex flex-col p-6')}>
                {pokemonList.map((pokemon, key) => (
                  <PokemonContainer key={key} pokemon={pokemon} isGrid={isGrid} />
                ))}
                </div>
              )
            }
        </div>
    </div>
  )
}

export default Home;
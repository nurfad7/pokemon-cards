import { FC, useState, useEffect } from 'react'
import { cn } from '../../utils';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSearch, faSquare, faBorderAll } from '@fortawesome/free-solid-svg-icons';
import PokemonContainer from '../../componenents/PokemonContainer';
import { fetchList } from '../../features/pokemonList/pokemonListSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import { Filter } from '../../types/pokemonDetail';
import { useDebouncedCallback } from 'use-debounce';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { pokemons, error, status } = useAppSelector(state => state.pokemonList);
  const [ filterText, setFilterText ] = useState<string>("");
  const [ sortBy, setSortBy ] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  
  const debounceFilter = useDebouncedCallback(
    (value) => {
      setFilterText(value)
  }, 500);
  
  const debounceSortBy = useDebouncedCallback(
    (value) => {
      setSortBy(value)
  }, 500);

  useEffect(() => {
    let filter: Filter = { name: filterText, sortBy: sortBy};
    if (status === "idle") {
      dispatch(fetchList(filter));
    }
  }, [dispatch, status]);

  useEffect(() => {
    let filter: Filter = { name: filterText, sortBy: sortBy};
    if (status === "succeeded") {
      dispatch(fetchList(filter));
    }
  }, [filterText, sortBy]);

  const [isGrid, setIsGrid] = useState(false);

  return (
    <div className='w-full min-h-svh flex flex-col bg-dark-grey'>
        <div className='flex justify-between items-center  border-b-2 
                       border-b-medium-grey w-full h-12 px-6'>
          <img src="/logo.svg" alt='pokemon logo' />
        { !isSearch ? (
          <Icon onClick={() => {setIsSearch(true)}} 
            icon={faSearch} type='text'
            className='text-2xl text-center text-white' />
        ) : (
          <input className='rounded-lg text-center'
            onBlur={() => {setIsSearch(false)}} 
            onChange={(e) => {debounceFilter(e.target.value)}}
            placeholder='Search...' />  
        )}  
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-evenly gap-3 my-3 h-10'>
            <div className='w-3/5'>
              <select name='sort' aria-label='sort by' defaultValue={""}
                  onChange={(e) => {debounceSortBy(e.target.value)}}
                  className='bg-medium-grey w-full h-full rounded-md text-light-grey'>
                <option value="" disabled>Sort by</option>
                <option value="type">Type</option>
                <option value="name">Name</option>
                <option value="health">Health</option>
                <option value="attack">Attack</option>
                <option value="defense">Defense</option>
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
              status === "idle" || status === "loading" ? (
                <div className='flex h-96 justify-center items-center text-center text-light-grey'>
                  <div>Loading...</div>
                </div>) :
              error ? (<div className='flex h-96 justify-center items-center text-center text-light-grey'>
                  <div>{error} :(</div>
                </div>) :
              (
                <div className={cn('gap-3 justify-center items-center', 
                                  isGrid ? 'grid grid-cols-2 p-3' : 'flex flex-col p-6')}>
                { pokemons.map((value, key) => (
                    <PokemonContainer key={key} pokemon={value} isGrid={isGrid} />
                )) }
                </div>
              )
            }
        </div>
    </div>
  )
}

export default Home;
import { 
  FC, 
  useEffect, 
  useState,
  useCallback
} from 'react'
import { cn } from '../../utils';
import { Pokemon, PokemonDetail } from '../../types/pokemonDetail';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import { fetchDetail } from '../../features/pokemonDetail/pokemonDetailSlice';
import { useNavigate } from 'react-router-dom';

interface PokemonContainerProps {
    isGrid: boolean,
    pokemon: Pokemon
}

const PokemonContainer: FC<PokemonContainerProps> = ({isGrid, pokemon}) => {
  const dispatch = useAppDispatch();
  const { detail, error, status } = useAppSelector(state => state.pokemonDetail);
  const [ pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = localStorage.getItem(pokemon?.name);
    if (storedData) {
      setPokemonDetail(JSON.parse(storedData))
    } else if (status === "idle" && pokemon?.name) {
      dispatch(fetchDetail(pokemon?.name));
    }
  }, [dispatch, pokemon?.name, status]);

  const handleShowDetail = useCallback(() => {
    navigate(`/detail/${pokemon?.name}`)
  }, [pokemon?.name, navigate]);
  
  return (
    <div onClick={handleShowDetail} className='w-full flex flex-col bg-white gap-3 p-2 font-medium'>
      {
        pokemonDetail === null && status === "idle" || status === "loading" ? (
          <div className={cn('flex justify-center items-center text-center text-light-grey', !isGrid ? 'h-[10.8rem]' : 'h-[5.625rem]')}>
            <div>Loading...</div>
          </div>) :
        error ? (<div className={cn('flex justify-center items-center text-center text-light-grey', !isGrid ? 'h-[10.8rem]' : 'h-[5.625rem]')}>
            <div>{error}</div>
          </div>) :
        (
          <div>
            <div className='flex justify-between'>
                <div className={cn(pokemonDetail?.type ? `text-type-${pokemonDetail?.type}` : `text-type-${detail?.type}`)}>{pokemonDetail?.type || detail?.type}</div>
                <div className='text-base'>#{pokemonDetail?.id || detail?.id}</div>
            </div>
            <div className={cn('flex justify-center items-center', !isGrid ? 'h-[10.8rem]' : 'h-[5.625rem]')}>
              <img className='h-full aspect-auto' src={pokemonDetail?.artworkFront || detail?.artworkFront} alt="pokemon photo" />
            </div>
            <div className={cn('text-lg text-center', !isGrid ? 'text-nowrap' : 'text-wrap')}>{pokemon.name}</div>    
          </div>
        )
      }
    </div>
  )
}

export default PokemonContainer;
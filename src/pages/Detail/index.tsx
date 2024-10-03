import { 
  FC, 
  useEffect, 
  useState 
} from 'react'
import { cn } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDetail } from '../../features/pokemonDetail/pokemonDetailSlice';
import { PokemonDetail } from '../../types/pokemonDetail';

const Detail: FC = () => {
  const { name = "" } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { detail, error, status } = useAppSelector(state => state.pokemonDetail);
  const [ pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(name);
    if (storedData) {
      setPokemonDetail(JSON.parse(storedData))
    } else if (status === "idle" && name) {
      dispatch(fetchDetail(name));
    }
  }, [dispatch, name, status]);

  return (
    <div className='w-full min-h-svh flex flex-col bg-dark-grey overflow-hidden'>
        <div className='flex justify-start items-center border-b-2 
                       border-b-medium-grey w-full h-12 px-6'>
          <img src="/logo.svg" alt='pokemon logo' onClick={() => navigate('/')} />
        </div>
      {
        pokemonDetail === null && status === "idle" || status === "loading" ? (
          <div className='flex h-96 justify-center items-center text-center text-light-grey'>
            <div>Loading...</div>
          </div>) :
        error ? (<div className='flex h-96 justify-center items-center text-center text-light-grey'>
            <div>{error}</div>
          </div>) :
        (
          <div>
            <div className='flex flex-col p-7'>
              <div className='text-light-grey text-lg'>
                #{pokemonDetail?.id || detail?.id}
              </div>
              <div className='h-56 flex justify-center items-center'>
              <img className='h-full aspect-auto'
                src={pokemonDetail?.artworkFront || detail?.artworkFront} alt='pokemon photo' />
              </div>
              <div className='flex h-16 relative'>
                <div className='text-4xl font-medium text-white'>{name}</div>
                <div className='absolute right-[-3rem] top-[-4rem]'>
                  <img className='h-40 aspect-auto'
                  src={pokemonDetail?.spriteFront || detail?.spriteFront} alt='pokemon pixel photo' />
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
                    <span className='text-2xl font-medium leading-none'>{pokemonDetail?.health || detail?.health}0&nbsp;</span>from 1000
                  </div>
                </div>
                <div className='flex gap-10 pt-5'>
                  <div className='w-[5.5rem]'>
                    <div className='text-light-grey leading-none'>Attack</div>
                    <div className='text-2xl text-white leading-none'>{pokemonDetail?.attack || detail?.attack}</div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='text-light-grey leading-none'>Defense</div>
                    <div className='text-2xl text-white leading-none'>{pokemonDetail?.defense || detail?.defense}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Detail;
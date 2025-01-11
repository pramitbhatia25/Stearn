import Trade from '../Trade';

function SwapComponent() {
  return <div className='p-5 bg-image-landing min-h-fit h-full'>
  <div className="text-[15px] md:text-[25px] mb-5">Swap</div>

    <div className='flex justify-center items-center light min-h-fit min-h-[70dvh]'>
      <Trade />
    </div>
  </div>
}
export default SwapComponent;

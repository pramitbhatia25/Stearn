import { Swap } from '@swing.xyz/ui';
import '@swing.xyz/ui/theme.css';

function SwapComponent() {
  return <div className='flex justify-center items-center light h-[90dvh] min-h-fit'>
    <div className='h-fit w-fit md:min-w-[600px]'>
      <Swap projectId="testing-pramit" />
    </div>
  </div>
}
export default SwapComponent;

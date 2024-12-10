import '@swing.xyz/ui/theme.css';
import { Swap } from '@swing.xyz/ui';

function SwapComponent() {
  return <div className='w-[84.5dvw] h-[90dvh] flex justify-center items-center'>
    <div className='h-fit w-fit'>
        <Swap
            projectId="testing-pramit"
        />    
    </div>
  </div>
}

export default SwapComponent;
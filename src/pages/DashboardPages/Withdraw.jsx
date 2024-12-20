import { Withdraw } from "@swing.xyz/ui";
import '@swing.xyz/ui/theme.css';

function WithdrawComponent() {
  return <div className='flex justify-center items-center light h-[90dvh] min-h-fit'>
  <div className='h-fit w-fit md:min-w-[600px]'>
    <Withdraw projectId="testing-pramit" />
    </div>
  </div>
}
export default WithdrawComponent;

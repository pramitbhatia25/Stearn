import CustomNavbar from "../components/Navbar";
import Trade from "./Trade";

function MainSwapComponent() {
  return <div className='bg-image-landing min-h-[100dvh] w-[100dvw]'>
    <div className=" fixed w-full top-0 z-[200]">
      <CustomNavbar />
    </div>

    <div className=" pt-[14dvh] min-h-[100dvh]">
      <div className='flex justify-center items-center light h-fit my-[5dvh] w-full'>
        <div className="max-w-[350px]">
          <Trade />
        </div>
      </div>
    </div>
  </div>
}
export default MainSwapComponent;

import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from './components';

function DashboardLayout() {
  // if (error) {
  //   return (
  //     <div className="app-wrapper !bg-[#f8f8f8] min-h-screen">
  //       <Backdrop>
  //         <div className="flex flex-col items-center justify-center w-full h-full bg-white gap-y-4 font-landing">
  //           <img src={images.illustration_500} alt="" className="object-cover w-[400px] h-[300px]" />
  //           <div className="text-center">
  //             <h4 className="text-3xl font-bold text-icon">Hệ thống đang gặp sự cố</h4>
  //             <p className="text-lg font-semibold text-icon2">Xin vui lòng quay lại sau!</p>
  //           </div>
  //         </div>
  //       </Backdrop>
  //     </div>
  //   );
  // }

  return (
    <div className="app-wrapper !bg-[#f8f8f8] min-h-screen">
      <Fragment>
        <div>
          <SideBar />
        </div>
        <div className="relative app-main">
          <div className="ml-[300px] px-3 flex w-full h-[74px]">
            <></>
          </div>
          <div className="app-content !pl-[300px]">
            <div className="app-content--inner">
              <Outlet />
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
}

export default DashboardLayout;

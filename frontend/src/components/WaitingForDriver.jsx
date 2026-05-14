import React from 'react'

const WaitingForDriver = (props) => {

  const vehicleImages = {
    car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
    moto: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Regular/MotorcycleOrange-249-0.png",
    auto: "https://imgs.search.brave.com/wG2p8ALi4lsvGzs5jhRSr8XRjX1X7XohJWxsC2MSKPI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1Lzc0LzkwLzcy/LzM2MF9GXzE1NzQ5/MDcyMjBfYzRENHFz/a1RrcW5FcVVnMGRu/MnF6Rmh0ZzhFa2pJ/N00uanBn"
  }

  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.waitingForDriver(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between mt-4'>
        <img className='h-12' src={vehicleImages[ props.ride?.captain.vehicle.vehicleType ]} alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600 capitalize'>{props.ride?.captain.vehicle.color} {props.ride?.captain.vehicle.vehicleType}</p>
        </div>
      </div>

      {/* OTP SECTION - VERY PROMINENT */}
      <div className='flex items-center justify-between bg-yellow-400 p-3 rounded-lg mt-4'>
          <div>
              <h3 className='text-lg font-semibold'>OTP for Ride</h3>
              <p className='text-sm text-gray-800'>Give this to the captain</p>
          </div>
          <h1 className='text-3xl font-bold tracking-widest'>
              {props.ride?.otp || "000000"}
          </h1>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-4'>
          <div className='flex items-center gap-5 p-2 border-b-2'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-base font-medium'>Pickup</h3>
              <p className='text-xs text-gray-600 line-clamp-1'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-2 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-base font-medium'>Destination</h3>
              <p className='text-xs text-gray-600 line-clamp-1'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-2'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-base font-medium'>₹{props.ride?.fare} </h3>
              <p className='text-xs text-gray-600'>Cash Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver
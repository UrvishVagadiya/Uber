import React from 'react'

const ConfirmRide = (props) => {

    const vehicleImages = {
        car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
        moto: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Regular/MotorcycleOrange-249-0.png",
        auto: "https://imgs.search.brave.com/wG2p8ALi4lsvGzs5jhRSr8XRjX1X7XohJWxsC2MSKPI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1Lzc0LzkwLzcy/LzM2MF9GXzE1NzQ5/MDcyMjBfYzRENHFz/a1RrcW5FcVVnMGRu/MnF6Rmh0ZzhFa2pJ/N00uanBn"
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-xl font-semibold mb-5'>Confirm your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className={`${props.vehicleType === "moto" ? 'h-24' : 'h-16'} `} src={vehicleImages[props.vehicleType]} alt="" />
                <div className='w-full mt-2 no-scrollbar overflow-y-auto max-h-[35vh]'>
                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-base font-medium'>Pickup</h3>
                            <p className='text-xs text-gray-600 line-clamp-1'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-2 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-base font-medium'>Destination</h3>
                            <p className='text-xs text-gray-600 line-clamp-1'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-2'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-base font-medium'>₹{props.fare.fares?.[ props.vehicleType ]}</h3>
                            <p className='text-xs text-gray-600'>{props.fare.distanceTime?.duration.text} away</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()

                }} className='w-full mt-4 bg-green-600 text-white font-semibold p-2 rounded-lg text-lg'>Confirm Ride</button>
            </div>
        </div>
    )
}

export default ConfirmRide
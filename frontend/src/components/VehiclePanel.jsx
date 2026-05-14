import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehiclePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('car')
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-2 items-center justify-between'>
                <img className='h-8' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-sm'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-xs'>{props.fare.distanceTime?.duration.text} away </h5>
                    <p className='font-normal text-[10px] text-gray-600 leading-tight'>Affordable, compact rides</p>
                </div>
                <h2 className='text-base font-semibold'>₹{props.fare.fares?.car}</h2>
            </div>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('moto')
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-2 items-center justify-between'>
                <img className='h-15' src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Regular/MotorcycleOrange-249-0.png" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-sm'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-xs'>{props.fare.distanceTime?.duration.text} away </h5>
                    <p className='font-normal text-[10px] text-gray-600 leading-tight'>Affordable motorcycle rides</p>
                </div>
                <h2 className='text-base font-semibold'>₹{props.fare.fares?.moto}</h2>
            </div>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('auto')
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-2 items-center justify-between'>
                <img className='h-10' src="https://imgs.search.brave.com/wG2p8ALi4lsvGzs5jhRSr8XRjX1X7XohJWxsC2MSKPI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1Lzc0LzkwLzcy/LzM2MF9GXzE1NzQ5/MDcyMjBfYzRENHFz/a1RrcW5FcVVnMGRu/MnF6Rmh0ZzhFa2pJ/N00uanBn   " alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-sm'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-xs'>{props.fare.distanceTime?.duration.text} away </h5>
                    <p className='font-normal text-[10px] text-gray-600 leading-tight'>Affordable Auto rides</p>
                </div>
                <h2 className='text-base font-semibold'>₹{props.fare.fares?.auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel
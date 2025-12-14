import { BsFingerprint } from 'react-icons/bs'

import MenuItem from './MenuItem'
import { GrTransaction } from 'react-icons/gr'

const CustomerMenu = () => {
  // const [isOpen, setIsOpen] = useState(false)

  // const closeModal = () => {
  //   setIsOpen(false)
  // }

  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Bookings' address='my-bookings' />

      {/* <div
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      > */}
   
      <MenuItem icon={GrTransaction} label='Transaction History' address='transaction' />
       
     

      {/* <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} /> */}
    </>
  )
}

export default CustomerMenu

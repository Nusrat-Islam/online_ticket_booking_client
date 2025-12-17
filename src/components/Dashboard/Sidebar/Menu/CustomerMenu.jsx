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

      
   
      <MenuItem icon={GrTransaction} label='Transaction History' address='transaction' />
       
     

      {/* <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} /> */}
    </>
  )
}

export default CustomerMenu

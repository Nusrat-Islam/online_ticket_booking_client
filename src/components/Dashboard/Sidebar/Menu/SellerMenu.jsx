import { BsFillHouseAddFill, BsGraphUp } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Ticket'
        address='add-ticket'
      />
      <MenuItem icon={MdHomeWork} label='My Added Tickets' address='my-tickets' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='requested Bookings'
        address='requested-bookings'
      />
         <MenuItem
                icon={BsGraphUp}
                label='Revenue Overview'
                address='overview'
              />
    </>
  )
}

export default SellerMenu

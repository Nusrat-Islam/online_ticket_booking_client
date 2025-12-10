
import Banner from '../../components/Home/Banner'
import FlightDeals from '../../components/Home/FlightDeals'

import Tickets from '../../components/Home/Tickets'
import WhyChooseTicketBari from '../../components/Home/WhyChooseTicketBari'

const Home = () => {
  return (
    <div>
       <Banner></Banner>
      {/* More components */}
      <FlightDeals></FlightDeals>
      <WhyChooseTicketBari></WhyChooseTicketBari>
     
    </div>
  )
}

export default Home
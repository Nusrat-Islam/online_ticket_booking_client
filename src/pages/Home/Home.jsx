
import AdvertisementSection from '../../components/Home/AdvertisementSection'
import Banner from '../../components/Home/Banner'
import FlightDeals from '../../components/Home/FlightDeals'
import LatestTickets from '../../components/Home/latestTickets'


import WhyChooseTicketBari from '../../components/Home/WhyChooseTicketBari'

const Home = () => {
  return (
    <div>
       <Banner></Banner>
      {/* More components */}
      <AdvertisementSection></AdvertisementSection>
      <LatestTickets></LatestTickets>
      <FlightDeals></FlightDeals>
      <WhyChooseTicketBari></WhyChooseTicketBari>
     
    </div>
  )
}

export default Home
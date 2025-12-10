import Card from './Card'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'

const Tickets = () => {
  const {data:tickets, isLoading} = useQuery({
    queryKey: ['flights'],
    queryFn: async () => {
      const result = await axios (`${import.meta.env.VITE_API_URL}/flights`)
      return result.data
    },
})

  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <Container>
     {tickets && tickets.length>0 ?(
       <div className='pt-16 grid lg:grid-cols-2 gap-5'>
       {tickets.map(ticket => <Card key={ticket._id}
       ticket={ticket}>

       </Card>)}
       
      </div>
     ):null}
      
    </Container>
  )
}

export default Tickets
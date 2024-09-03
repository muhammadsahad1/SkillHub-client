import React from 'react'
import EventsLists from '../../components/event/EventsLists'
import NavBar from '../../components/common/navBar'

const EventsPage = () => {
  return (
    <div className='bg-zinc-100 m-0'>
      <NavBar/>
      <EventsLists />
    </div>
  )
}

export default EventsPage

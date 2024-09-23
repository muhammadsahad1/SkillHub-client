  import EventsLists from "../../components/event/EventsLists";
  import NavBar from "../../components/common/navBar";


  const EventsPage = () => {
    return (
      <div>
        <NavBar />
        <div>
          <EventsLists />
        </div>
      </div>
    );
  };

  export default EventsPage;

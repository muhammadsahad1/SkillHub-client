import NavBar from "../../components/navBar";
import useGetUser from "../../hook/getUser";


const Home : React.FC = () => {

  const user = useGetUser()
  console.log("user Home",user)

  return (
    <div className=" bg-zinc-950 flex flex-col h-screen">
      <NavBar/>
    </div>
  );
};

export default Home;

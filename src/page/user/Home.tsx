import NavBar from "../../components/common/navBar";
import useGetUser from "../../hook/getUser";


const Home : React.FC = () => {

  const user = useGetUser()
  console.log("user Home",user)

  return (
    <div className=" bg-zinc-950 flex flex-col h-screen">
      <NavBar/>
      <div className="flex justify-center items-center"> 
        <h2 className="text-white text-4xl font-bold mt-6">WELCOME TO SKILL SHARING PLATFORM</h2></div>
    </div>
  );
};

export default Home;

  import { useForm } from "react-hook-form";
  import { useNavigate } from 'react-router-dom'
  import toast,{Toaster} from 'react-hot-toast'
  import { validateUsername,validateEmail,validatePassword} from '../../utils/validation'
  import sideImg from "../../assets/sideImage.png"
  import { useState } from "react";
  import { userSignup } from "../../API/user";
  import { DotLoader } from "react-spinners";

  type UserData = {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  };

  const SignUp :React.FC  = () => {

    const [isLoading , setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const { register,handleSubmit,watch,formState: { errors } } = useForm({
      mode : "onChange"
    });

    

  // check && registering && api call start from here
  const check = async(user : UserData) => {
    setLoading(true)
    const response = await userSignup(user)
    
    if(response && response.success){
      setLoading(false)
      // success()
      navigate(`/auth/otp/`,{state : { email : user.email}})
    }else{
      
      toast.error(response.message);
      setLoading(false)
    }
  }



  // after submit 
    const onSubmit = async(data: UserData) => {
      try {
  
        const user =  {
          name : data.name || '',
          email : data.email || '',
          password : data.password || '',
          confirm_password : data.confirm_password || ''
        }
        console.log(user)
        check(user)
      } catch (error) {
        console.log(error)
      }
    };

    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex w-full">
        {/* Left side: Signup Form */}
        <div className="md:w-1/2 bg-white p-8 shadow-lg flex flex-col items-center justify-center border-10\">
        {isLoading && <DotLoader />}
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

          <form className="w-full max-w-md " onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 w-full"> 
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { validate : validateUsername })}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required/>
              <span className="text-xs text-red-700">
              { typeof errors.username?.message === "string" && errors.username?.message}  
              </span> 
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {  validate : validateEmail })}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span className="text-xs text-red-700">
              { typeof errors.email?.message === "string" && errors.email?.message}
              </span>
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                { ...register('password',{ validate : validatePassword})}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span className="text-xs text-red-700"> 
                {typeof errors.password?.message === "string" && errors.password?.message}
              </span>
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                {...register('confirm_password', { validate : (value) => {
                  if(value !== watch('password')) return "Confirmation password should match password."
                }})}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span className="text-xs text-red-700"> 
                {typeof errors.confirm_password?.message === "string" && errors.confirm_password?.message}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
        
          </form>
        </div>
        <Toaster/>
        <div className="hidden md:block md:w-1/2 h-screen bg-cover" style={{ backgroundImage: `url(${sideImg})` }}>
        </div>
      </div>
    </div>
    );
  };

  export default SignUp;

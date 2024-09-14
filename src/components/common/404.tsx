import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

// const Animated404Error = () => (
//   <div className="relative w-full h-48 flex items-center justify-center">
//     <img
//       src="https://media.giphy.com/media/l4FGfZRtE7EkXZsnG/giphy.gif"
//       alt="Animated 404 Error"
//       className="w-full h-full object-cover"
//     />
//   </div>
// );



const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font- font-extrabold text-gray-900 sm:text-4xl">
            Oops! Page Not Found
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 sm:text-base">
            It seems the skill you're looking for is still undiscovered.
          </p>
        </div>
        
        {/* <div className="relative">
          <Animated404Error />
        </div>
         */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
  
        </div>
        
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-zinc-900 hover:text-indigo-500"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Go back to previous page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
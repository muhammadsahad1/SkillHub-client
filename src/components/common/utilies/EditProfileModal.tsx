import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { User } from "../../../@types/allTypes";
import useGetUser from "../../../hook/getUser";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { fallbackCountries } from "../../../needObject/fallbackCountries";
import { skillLists } from "../../../needObject/skills";
import { createProfile } from "../../../API/user";
import { setUser } from "../../../redux/userSlices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";


interface EditProfileModalProps {
  isOpen: boolean;
  isRequestClose: () => void;
}

const customModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    background: "#09090b",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "55rem",
    height: "40rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translate(-50%, -50%)",
  },
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  isRequestClose,
}) => {

  const [imagePreview, setimagePreview] = useState<string | null>(null);
  const [selectedCountry, setSelectCountries] = useState<string>("");
  const [countries, setCountries] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentUser = useGetUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({ mode: "onChange" });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setimagePreview(URL.createObjectURL(file));
    }
  };

  // Fetching countries through API 
  const fetchCountriesApi = async () => {
    const url = import.meta.env.VITE_COUNTRIES_API_URL;
    if (!url) {
      console.log("not valid url");
      return;
    }
    try {
      const response = await axios.get(url);
      const countries = response.data.data;
      setCountries(countries);
    } catch (error: any) {
      setCountries(fallbackCountries);
      toast.error("Unable to fetch countries. Using fallback data.");
      console.log(error);
    }
  };

  // Then based on contries fetching the states
  const fetchCitiesApi = (currentCountry: string) => {
    try {
      const selectedCountryData = countries.find(
        (country: any) => country.country === currentCountry
      );
      if (selectedCountryData && selectedCountryData.cities) {
        setCities([...selectedCountryData.cities]);
      } else {
        setCities([]);
      }
    } catch (error) {
      toast.error("Unable to fetch state. Using fallback data.");
    }
  };

  // inital API call to fetch Countries
  useEffect(() => {
    fetchCountriesApi();
  }, []);

  // TO passing selected country to  fetch theri states
  useEffect(() => {
    if (selectedCountry) {
      fetchCitiesApi(selectedCountry);
    }
  }, [selectedCountry, countries]);

  // submiting....>
  const onSubmit = async (data: User) => {
    setIsLoading(true);
    if (!imagePreview) {
      toast.error("Profile image is required");
      return;
    }
    const fileInput = document.getElementById(
      "profileImageInput"
    ) as HTMLInputElement;
    const file = fileInput.files?.[0];

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", currentUser.email);
    formData.append("bio", data.bio);
    formData.append("profileImage", file);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("skill", data.skill);

    // checking if the data entered to formData
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {

      const response = await createProfile(formData);
      console.log("ressss ===> ",response)
      dispatch(setUser(response.user)); 
      setIsLoading(false);
      isRequestClose()
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error);
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={isRequestClose}
      ariaHideApp={false}
      style={customModalStyle}
      >
                {/* <div className="flex justify-end">
          <button 
            onClick={isRequestClose}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div> */}

      <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row mt-2"
          >
          <div className="mb-6 md:mr-6">
            { isLoading && <DotLoader color="white"/>}
            <label className="block text-gray-300 font-bold mb-2">
              Profile Image
            </label>
            {imagePreview ? (
              <img
                className="rounded-full w-24 h-24 mb-2 cursor-pointer object-cover"
                src={imagePreview}
                alt="profile image preview"
                onClick={() =>
                  document.getElementById("profileImageInput")?.click()
                }
              />
            ) : (
              <div
                className="rounded-full w-24 h-24 mb-2 bg-gray-700 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  document.getElementById("profileImageInput")?.click()
                }>
                <span className="text-gray-400">Add Image</span>
              </div>
            )}
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              {...register("profileImage")}
              onChange={handlePreviewImage}/>
            {errors.profileImage && (
              <span className="text-red-500">
                {errors.profileImage.message}
              </span>
            )}
          </div>

          <div className="flex-grow">
            <div className="mb-4">
              <label className="block text-gray-300 font-bold">Name</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-600 bg-gray-800 text-gray-300 rounded-md p-2"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span> )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 font-bold">Bio</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-600 bg-gray-800 text-gray-300 rounded-md p-2"
                {...register("bio", { required: "Bio is required" })}
              />
              {errors.bio && (
                <span className="text-red-500">{errors.bio.message}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 font-bold">Country</label>
              <select
                className="mt-1 block w-full border border-gray-600 bg-gray-800 text-gray-300 rounded-md p-2"
                {...register("country", { required: "Country is required" })}
                onChange={(e) => setSelectCountries(e.target.value)}
              >
                <option value="">Select your country</option>
                {countries.map((country: any) => (
                  <option key={country.iso2} value={country.country}>
                    {country.country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 font-bold">City</label>
              <select
                className="mt-1 block w-full border border-gray-600 bg-gray-800 text-gray-300 rounded-md p-2"
                {...register("city", { required: "City is required" })}
              >
                <option value="">Select your city</option>
                {cities.map((city: string) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && (
                <span className="text-red-500">{errors.city?.message}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 font-bold">Skill</label>
              <select
                className="mt-1 block w-full border border-gray-600 bg-gray-800 text-gray-300 rounded-md p-2"
                {...register("skill", { required: "Skill is required" })}
              >
                <option value="">Select your skill</option>
                {skillLists.map((skill: string) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              {errors.skill && (
                <span className="text-red-500">{errors.skill?.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full tracking-wide bg-emerald-500 font-bold  text-white py-2 rounded-md"
            >
              Save Profile
            </button>
          </div>
        </form>
    </Modal>
  );
};

export default EditProfileModal;

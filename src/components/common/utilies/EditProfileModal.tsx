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
import { CgProfile } from "react-icons/cg";

interface EditProfileModalProps {
  isOpen: boolean;
  isRequestClose: () => void;
}

const customModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: "8%",
    marginRight: "-50%",  
    width: "44rem",
    height: "39rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#F4F4F5", // Tailwind's bg-zinc-200 hex value
  },
  overlay: {
    background: "rgba(0,0,0,0.1)",
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

  useEffect(() => {
    if (currentUser?.picture?.imageUrl) {
      setimagePreview(currentUser?.picture?.imageUrl);
    }
  }, [currentUser]);

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setimagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
// For country api
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
// listing the cities corresponding to contry
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
// fetching the countries api
  useEffect(() => {
    fetchCountriesApi();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchCitiesApi(selectedCountry);
    }
  }, [selectedCountry, countries]);

  const onSubmit = async (data: User) => {
    setIsLoading(true);
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

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await createProfile(formData);
      if (response.success === true) {
        dispatch(setUser(response.user));
        setIsLoading(false);
        isRequestClose();
        navigate("/");
      } else {
        setIsLoading(false);
        isRequestClose();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={isRequestClose}
      ariaHideApp={false}
      style={customModalStyle}
    >
      <div className="fixed inset bg-opacity-50 flex items-center justify-center z-50">
        {isLoading && <DotLoader color="black" />}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col md:flex-row mt-2 ${
          isLoading ? "blur-sm" : ""
        }`}
      >
        <div className="mb-6 md:mr-6">
          <label className="block text-zinc-900 font-bold mb-2">
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
              }
            >
              <CgProfile size={32} className="object-cover rounded-full" />
            </div>

          )}
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("profileImage")}
            onChange={handlePreviewImage}
          />
          {errors.profileImage && (
            <span className="text-red-500">{errors.profileImage.message}</span>
          )}
        </div>

        <div className="flex-grow">
          <div className="mb-4">
            <label className="block text-zinc-900 font-bold">Name</label>
            <input
            defaultValue={currentUser.name}
              type="text"
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-gray-300 rounded-md p-2"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-zinc-900 font-bold">Bio</label>
            <input
              defaultValue={currentUser.bio}
              type="text"
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-gray-300 rounded-md p-2"
              {...register("bio")}
            />
            {errors.bio && (
              <span className="text-red-500">{errors.bio.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-zinc-900 font-bold">Country</label>
            <select
              defaultValue={currentUser.country}
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-gray-300 rounded-md p-2"
              {...register("country")}
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
            <label className="block text-zinc-900 font-bold">State</label>
            <select
            defaultValue={currentUser.states}
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-gray-300 rounded-md p-2"
              {...register("city")}
            >
              <option value="">Select your city</option>
              {cities.map((city: string) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-zinc-900 font-bold">Skill</label>
            <select
            defaultValue={currentUser.skill}
              className="mt-1 block w-full border border-gray-600 bg-gray-800 text-gray-300 rounded-md p-2"
              {...register("skill")}
            >
              <option value="">Select your skill</option>
              {skillLists.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            {errors.skill && (
              <span className="text-red-500">{errors.skill.message}</span>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Save profile
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import { User } from "../../../@types/allTypes";
import useGetUser from "../../../hook/getUser";
import axios from "axios";
import toast from "react-hot-toast";
import { fallbackCountries } from "../../../needObject/fallbackCountries";
import { skillLists } from "../../../needObject/skills";
import { createProfile } from "../../../API/user";
import { setUser } from "../../../redux/userSlices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import noProfile from "../../../assets/no profile.png"; // Ensure this path is correct

interface EditProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [imagePreview, setImagePreview] = useState<string>(noProfile);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countries, setCountries] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentUser = useGetUser();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    mode: "onChange",
    defaultValues: {
      name: currentUser?.name || "",
      bio: currentUser?.bio || "",
      country: currentUser?.country || "",
      city: currentUser?.city || "",
      skill: currentUser?.skill || "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("curr =>",currentUser.picture?.imageUrl)
    // Show user's current profile image if available, else show noProfile
    if (currentUser?.picture?.imageUrl) {
      setImagePreview(currentUser.picture.imageUrl);
    } else {
      setImagePreview(noProfile);
    }
    if (currentUser?.country) {
      setSelectedCountry(currentUser.country);
    }
  }, [currentUser]);

  // Handle new image selection and preview update
  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(noProfile);
    }
  };

  // Fetch countries API
  const fetchCountriesApi = async () => {
    const url = import.meta.env.VITE_COUNTRIES_API_URL;
    if (!url) return;

    try {
      const response = await axios.get(url);
      const countries = response.data.data;
      setCountries(countries);
    } catch (error) {
      setCountries(fallbackCountries);
      toast.error("Unable to fetch countries. Using fallback data.");
    }
  };

  // Fetch cities for the selected country
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
      toast.error("Unable to fetch cities. Using fallback data.");
    }
  };

  useEffect(() => {
    fetchCountriesApi();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchCitiesApi(selectedCountry);
    }
  }, [selectedCountry, countries]);

  // Submit profile form data
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
    formData.append("profileImage", file || ""); // Use file if available
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("skill", data.skill);

    try {
      const response = await createProfile(formData);
      if (response.success) {
        dispatch(setUser(response.user));
        setIsLoading(false);
        onRequestClose();
        navigate("/");
      } else {
        setIsLoading(false);
        onRequestClose();
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleCloseModal = () => {
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-0"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto my-8 overflow-hidden">
        <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
        </div>
        <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
              <DotLoader color="black" />
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <img
                  className="w-24 h-24 rounded-full object-cover cursor-pointer border-4 border-indigo-500"
                  src={imagePreview}
                  alt="profile image preview"
                  onClick={() =>
                    document.getElementById("profileImageInput")?.click()
                  }
                />
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("profileImage")}
                  onChange={handlePreviewImage}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                {...register("bio", { required: "Bio is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setSelectedCountry(e.target.value);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select your country</option>
                    {countries.map((country: any) => (
                      <option key={country.iso2} value={country.country}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select your city</option>
                    {cities.map((city: string) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skill
              </label>
              <Controller
                name="skill"
                control={control}
                rules={{ required: "Skill is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select your skill</option>
                    {skillLists.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.skill && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.skill.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
            <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 mr-2 bg-gray-800 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;

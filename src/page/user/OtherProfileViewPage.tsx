import { useLocation, useParams } from "react-router-dom";
import OtherProfileView from "../../components/user/OtherProfileView";

interface ImageUrls {
  profileImageUrl: string;
  coverImageUrl: string;
}

const OtherProfileViewPage = () => {
  const { userId } = useParams();
  const location = useLocation();
  const { profileImageUrl, coverImageUrl }: ImageUrls =
    (location.state as ImageUrls) || {};

  return (
    <div>
      <OtherProfileView
        userId={userId}
        profileImageUrl={profileImageUrl}
        coverImageUrl={coverImageUrl}
      />
    </div>
  );
};

export default OtherProfileViewPage;

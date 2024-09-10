import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { registerEvent } from "../../API/event";
import { showToastSuccess, showToastError } from "../common/utilies/toast";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";

const EventSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const completeRegistration = async () => {
      const sessionId = searchParams.get("session_id");
      const eventId = searchParams.get("event_id");
      const userId = searchParams.get("userId");

      if (sessionId && eventId && userId) {
        try {
          const registerData = {
            paymentId: sessionId,
            eventId: eventId,
            userId: userId,
          };

          const result = await registerEvent(registerData);
          console.log("Result after registration:", result);

          // Strictly check for success
          if (result && result.success === true) {
            showToastSuccess("Event registration successful");
            console.log("Registration success");
            navigate("/auth/events");
          } else {
            console.log(
              "Registration error:",
              result?.message || "Unknown error"
            );
            // showToastError(result?.message || "Registration failed");
          }
        } catch (error: any) {
          console.log("Caught error:", error.message);
          // showToastError(error.message || "An unexpected error occurred during registration");
        }
      } else {
        // showToastError("Missing parameters for registration");
      }
    };

    completeRegistration();
  }, [searchParams, navigate]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <DotLoader />
    </div>
  );
};

export default EventSuccessPage;

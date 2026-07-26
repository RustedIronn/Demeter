import BasicInformation from "@/features/profile/components/BasicInformation/BasicInformation";
import GoalSummary from "@/features/goals/components/GoalSummary/GoalSummary";

import "./Profile.css";

export default function Profile() {
  return (
    <div className="Profile">

      <section className="ProfileHeader">

        <h1>
          Profile
        </h1>

        <p>
          Manage your profile information and goals.
        </p>

      </section>

      <div className="ProfileGrid">

        <div className="ProfileInfo">
          <BasicInformation />
        </div>

        <div className="ProfileGoals">
          <GoalSummary />
        </div>

      </div>

    </div>
  );
}
import BasicInformation from "@/features/profile/components/BasicInformation/BasicInformation";
import GoalSummary from "@/features/profile/components/GoalSummary/GoalSummary";

import "./Profile.css";


export default function Profile() {
  return (
    <div className="Profile">

      <section className="ProfileHeader">

        <h1>
          Profile
        </h1>

        <p>
          Manage your personal information and goals.
        </p>

      </section>


      <div className="ProfileGrid">

        <BasicInformation />

        <GoalSummary />

      </div>


    </div>
  );
}
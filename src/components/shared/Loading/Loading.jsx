import { LoaderCircle } from "lucide-react";

import "./Loading.css";

export default function Loading({
  loading,
}) {

  if (!loading) return null;

  return (

    <div className="Loading">

      <LoaderCircle
        size={36}
        className="LoadingSpinner"
      />

    </div>

  );

}
import { Navigate, useParams } from "react-router";
import ProfileInfo from "@/components/profile/ProfileInfo.tsx";

export default function PostDetailPage() {
  const params = useParams();
  const userId = params.userId;
  if (!userId) return <Navigate to={"/"} replace />;

  return (
    <div>
      <ProfileInfo userId={userId} />
    </div>
  );
}

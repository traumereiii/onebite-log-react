import { Routes, Route, Navigate } from "react-router";
import SignInPage from "@/pages/SignInPage.tsx";
import SignUpPage from "@/pages/SignUpPage.tsx";
import ForgetPasswordPage from "@/pages/ForgetPasswordPage.tsx";
import IndexPage from "@/pages/IndexPage.tsx";
import PostDetailPage from "@/pages/PostDetailPage.tsx";
import ProfileDetailPage from "@/pages/ProfileDetailPage.tsx";
import ResetPasswordPage from "@/pages/ResetPasswordPage.tsx";
import GlobalLayout from "@/components/layout/GlobalLayout.tsx";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />

        <Route path="/" element={<IndexPage />} />
        <Route path="/post/:postId" element={<PostDetailPage />} />
        <Route path="/profile/:userId" element={<ProfileDetailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}

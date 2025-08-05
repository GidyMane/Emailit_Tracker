import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <div className="text-center px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          LANDING PAGE WILL BE HERE
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          .
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LoginLink>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </LoginLink>
          <RegisterLink>
            <button className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg border hover:bg-gray-200 transition">
              Sign Up
            </button>
          </RegisterLink>
        </div>
      </div>
    </main>
  );
}

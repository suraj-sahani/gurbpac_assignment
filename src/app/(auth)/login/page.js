import { LoginForm } from "@/components/forms/auth/login-form";
import { getSession, redirectUserByRole } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  await redirectUserByRole();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-foreground">Welcome</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your Content Broadcasting account
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}

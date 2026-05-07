"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/lib/action";
import { loginSchema } from "@/lib/schema";
import { AlertCircleIcon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ViewOffSlashIcon } from "@hugeicons/core-free-icons/index";
import { ViewIcon } from "@hugeicons/core-free-icons/index";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      setError(null);

      const result = await loginAction(data.email, data.password);

      if (!result.success) {
        setError(result.error || "Login failed");
        return;
      }

      // Redirect based on user role
      if (result.user?.role === "teacher") {
        router.push("/teacher");
      } else if (result.user?.role === "principal") {
        router.push("/principal");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...form.register("email")}
          disabled={isLoading}
          aria-invalid={form.formState.errors.email ? "true" : "false"}
        />
        {form.formState.errors.email && (
          <p className="text-xs text-red-600">
            {form.formState.errors.email.message}
          </p>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="password"
            placeholder="Enter your password"
            {...form.register("password")}
            disabled={isLoading}
            aria-invalid={form.formState.errors.password ? "true" : "false"}
            type={showPassword ? "text" : "password"}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (
                <HugeiconsIcon
                  icon={ViewIcon}
                  size={24}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              ) : (
                <HugeiconsIcon
                  icon={ViewOffSlashIcon}
                  size={24}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        {form.formState.errors.password && (
          <p className="text-xs text-red-600">
            {form.formState.errors.password.message}
          </p>
        )}
      </Field>

      <Button type="submit" className="w-full" disabled={isLoading} size="lg">
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      {error && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
          <HugeiconsIcon
            icon={AlertCircleIcon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
            className="h-4 w-4 shrink-0"
          />

          {error}
        </div>
      )}

      <div className="mt-6 rounded-md border bg-muted/40 p-3 text-xs">
        <p className="mb-2 font-medium">
          Demo accounts (password: <code>password123</code>)
        </p>
        <div className="space-y-1 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.setValue("email", "teacher@example.com");
              form.setValue("password", "password123");
            }}
            className={"w-full"}
          >
            Teacher · teacher@example.com
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.setValue("email", "principal@example.com");
              form.setValue("password", "password123");
            }}
            className={"w-full"}
          >
            Principal · principal@example.com
          </Button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Looking for live broadcasts?{" "}
        <Link href="/live" className="font-medium text-primary hover:underline">
          Browse as student
        </Link>
      </p>
    </form>
  );
}

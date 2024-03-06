"use client";

import { cn } from "@/lib/utils";
import { Icons } from "../icon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { setCookieToken } from "@/helpers/cookie";
import { AuthRequest, login } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertError } from "../alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

interface UserAuthLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  // .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
  password: z.string().min(8, {
    message: "Your password must be at least 8 characters.",
  }),
});

export function UserAuthLoginForm({
  className,
  ...props
}: UserAuthLoginFormProps) {
  const { push } = useRouter();
  const [errMessage, setErrMessage] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (authData: AuthRequest) => login(authData),
    mutationKey: ["login"],
    onSuccess(data, variables, context) {
      setCookieToken(data.data?.access_token);
      push("/");
    },
    onError: (_error, variables, _context) => {
      form.reset({ ...variables });
      setErrMessage("Your email or password is not correct, please try again!");
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    loginMutation.mutate(data);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitSuccessful}
            type="submit"
            className="w-full mt-9"
          >
            {form.formState.isSubmitSuccessful ? (
              <Icons.spinner className="mr-2 h-4 w-full animate-spin" />
            ) : (
              "Login with Email"
            )}
          </Button>
        </form>

        <AlertError errMessage={errMessage} />
      </Form>
    </div>
  );
}

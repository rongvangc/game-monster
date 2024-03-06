"use client";

import { HTMLAttributes, useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "../icon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { AuthRequest, register } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { RocketIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertError } from "../alert";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

interface UserAuthRegisterFormProps extends HTMLAttributes<HTMLDivElement> {}

const FormSchema = z
  .object({
    fullName: z.string().min(3, { message: "This field has to be filled." }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    // .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
    password: z.string().min(8, {
      message: "Your password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Your password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function UserAuthRegisterForm({
  className,
  ...props
}: UserAuthRegisterFormProps) {
  const [errMessage, setErrMessage] = useState("");
  const [successRegister, setSucessRegiser] = useState(false);
  const registerMutation = useMutation({
    mutationFn: (authData: AuthRequest) => register(authData),
    mutationKey: ["register"],
    onError: (_error, _variables, _context) => {
      setErrMessage("Ops, Something wrong!. Please try again");
    },
    onSuccess(data, _variables, _context) {
      if (+data?.status === 201) {
        setSucessRegiser(true);
      }
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setErrMessage("");
    setSucessRegiser(false);
    registerMutation.mutate(data);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="fullname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="confirm password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form?.formState.isSubmitSuccessful}
            type="submit"
            className="w-full mt-9"
          >
            {form?.formState.isSubmitSuccessful && (
              <Icons.spinner className="mr-2 h-4 w-full animate-spin" />
            )}
            Register with Email
          </Button>
        </form>

        <AlertError errMessage={errMessage} />

        {successRegister && (
          <Alert variant="success">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Create account successfully, please try login now!
            </AlertDescription>
          </Alert>
        )}
      </Form>
    </div>
  );
}

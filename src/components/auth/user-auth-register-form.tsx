"use client";

import { ChangeEvent, HTMLAttributes, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { toastError } from "@/helpers/toasts";
import { useEdgeStore } from "@/lib/edgestore";
import { AuthRequest, register } from "@/services/auth";
import { EdgeStoreApiClientError } from "@edgestore/react/shared";
import { formatFileSize } from "@edgestore/react/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { RocketIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import AvatarPlaceholder from "../../../public/images/avatar-placeholder.png";
import { Icons } from "../common/icon";
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
    displayName: z.string().min(3, { message: "This field has to be filled." }),
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
    photoURL: z.any(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function UserAuthRegisterForm({
  className,
  ...props
}: UserAuthRegisterFormProps) {
  const { edgestore } = useEdgeStore();
  const [successRegister, setSuccessRegiser] = useState(false);
  const [fileUpload, setFileUpload] = useState<File>();
  const [filePreview, setFilePreview] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      displayName: "",
      email: "info@gmail.com",
      password: "Admin@123",
      confirmPassword: "Admin@123",
      photoURL: null,
    },
  });

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setFileUpload(file);
    file && setFilePreview(URL.createObjectURL(file));
  };

  const registerMutation = useMutation({
    mutationFn: (authData: AuthRequest) => register(authData),
    mutationKey: ["register"],
    onSuccess(data, _variables, _context) {
      setSuccessRegiser(true);
      form.reset();
    },
    onError(data) {
      toastError(data?.message ?? "Oop's! Something wrong");
      form.reset();
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (fileUpload) {
      try {
        const res = await edgestore.publicFiles.upload({
          file: fileUpload,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            console.log("upload file progress ", progress);
          },
        });

        const file = res?.url;

        if (!file) {
          toastError(`Can't upload file`);
        }

        registerMutation.mutate({
          ...data,
          photoURL: file,
        });
      } catch (error) {
        if (error instanceof EdgeStoreApiClientError) {
          // if it fails due to the `maxSize` set in the router config
          if (error.data.code === "FILE_TOO_LARGE") {
            toastError(
              `File too large. Max size is ${formatFileSize(
                error.data.details.maxFileSize
              )}`
            );
          }
          // if it fails due to the `accept` set in the router config
          if (error.data.code === "MIME_TYPE_NOT_ALLOWED") {
            toastError(
              `File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(
                ", "
              )}`
            );
          }
          // if it fails during the `beforeUpload` check
          if (error.data.code === "UPLOAD_NOT_ALLOWED") {
            toastError("You don't have permission to upload files here.");
          }
        }

        form.resetField("photoURL");
      }
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="nick name" {...field} />
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
          <FormField
            control={form.control}
            name="photoURL"
            render={({ field }) => (
              <div className="flex flex-col justify-center items-start gap-2">
                <div className="relative rounded-full overflow-hidden inline-block m-auto gap-1.5 mb-2 border-dashed border-2 border-primary">
                  <Image
                    id="upload-avatar"
                    src={fileUpload ? filePreview : AvatarPlaceholder}
                    width={120}
                    height={120}
                    alt="file-preview"
                    className="overflow-hidden"
                  />
                </div>
                <div className="relative m-auto">
                  <Button
                    className="flex items-center gap-2 cursor-pointer"
                    variant="outline"
                    size="sm"
                  >
                    <Upload size={16} />
                    Upload avatar
                  </Button>
                  <Input
                    onChange={handleUploadImage}
                    className="absolute top-0 left-0 opacity-0"
                    id="picture"
                    type="file"
                  />
                </div>
                <FormMessage />
              </div>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full mt-9"
          >
            {form.formState.isSubmitting ? (
              <Icons.spinner className="mr-2 h-4 w-full animate-spin" />
            ) : (
              "Register with Email"
            )}
          </Button>
        </form>

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

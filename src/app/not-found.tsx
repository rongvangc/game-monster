"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import NotFoundSvg from "./../../public/not-found.svg";

export default function NotFound() {
  return (
    <div className="container h-screen flex flex-col justify-center items-center gap-4">
      <Image src={NotFoundSvg} width={500} height={400} alt="not found" />
      <p className="mt-6">Could not find requested resource</p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "default" }),
          "right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Back to home
      </Link>
    </div>
  );
}

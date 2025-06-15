import LoginForm from "@/components/forms/login-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";

export default function Register() {
  return (
    <Card className="min-w-[290px] sm:min-w-[600px] min-h-94 relative">
      <CardHeader>
        <CardTitle className="font-bold text-3xl text-center">Log in</CardTitle>
        <p className=" text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="font-bold underline">
            Register
          </Link>
        </p>

        <Link href={"/"} className="hidden sm:block absolute top-2 left-2">
          <Button size="lg" variant="outline">
            <ArrowLeftFromLine className="w-5 h-5" /> Back To Home
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <Link
          href={"/"}
          className="flex sm:hidden gap-x-1 text-xs underline items-center mx-auto w-fit mt-2"
        >
          <ArrowLeft className="w-3 h-3" /> Back To Home
        </Link>
      </CardContent>
    </Card>
  );
}

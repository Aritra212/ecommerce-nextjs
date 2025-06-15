import RegisterForm from "@/components/forms/register-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";

export default function Register() {
  return (
    <Card className="relative min-w-[290px] sm:min-w-[600px] min-h-94">
      <CardHeader>
        <CardTitle className="font-bold text-3xl text-center">
          Create an Account
        </CardTitle>
        <p className=" text-center text-sm">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="font-bold text-primary hover:underline"
          >
            Log in
          </Link>
        </p>

        <Link href={"/"} className="hidden sm:block absolute top-2 left-2">
          <Button size="lg" variant="outline">
            <ArrowLeftFromLine className="w-5 h-5" /> Back To Home
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        <RegisterForm />
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

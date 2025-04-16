"use client";

// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUser from "@/hooks/use-user";
import { IProfileForm, ProfileSchema } from "./schemas/profile-schema";
import { Mail } from "lucide-react";

export default function ProfileForm() {
  const { user } = useUser();

  const form = useForm<IProfileForm>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.user_metadata?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (values: IProfileForm) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      readOnly
                      disabled
                      type="email"
                      placeholder="Enter admin email"
                      {...field}
                    />
                    <Mail className="top-2.5 right-2.5 absolute w-4 h-4 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <Button type="submit" disabled={isLoading} loading={isLoading}>
          Update Profile
        </Button> */}
      </form>
    </Form>
  );
}

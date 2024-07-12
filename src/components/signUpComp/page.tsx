"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { Spinner } from "@/components/ui/spinner" 
import Link from "next/link"

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }).max(20, {
    message: "Password must be 20 or fewer characters long",
  }),
  confirmpassword: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
}).refine((data) => data.password === data.confirmpassword, {
  message: "Passwords do not match",
  path: ["confirmpassword"],
})

type FormData = z.infer<typeof FormSchema>;

export function InputForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: ""
    },
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const response = await axios.post('/api/signup', {
        email: data.email,
        password: data.password,
        confirmpassword : data.confirmpassword
      })
      console.log(response);
      toast({
        title: "Success!",
        description: "Your data has been submitted successfully.",
      })
      router.push('/login')
    } catch (error:any) {
      console.log(`err while submmiting : `,error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "There was an error submitting your data."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/4 space-y-6 mx-auto md:w-1/3 mt-10">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email here" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="flex items-center justify-center">
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </form>
      <div className="text-center">
        <Link href={`/login`} className="text-black">
        Already have an account?
        </Link>
      </div>
    </Form>
  )
}

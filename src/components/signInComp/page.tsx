"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password : z.string().min(6,{
    message:"Password must be at least 6 characters"
  }).max(20,{
    message:"Password must be 20 or fewer characters long"
  })
})

export function InputForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
  type FormData = z.infer<typeof FormSchema>;

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const response = await axios.post('/api/login',{
        email : data.email,
        password : data.password
      })
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      console.log(response);
      if(response.status === 200){
        router.push('/dashboard');
      }
    } catch (error:any) {
      console.log('err while submiting : ',error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: error.response?.data?.message || "There was an error submitting your data."
      // })
    } finally{
      setLoading(false);
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
                <Input type="email" placeholder="Enter your mail address" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
        <Button type="submit" disabled={loading} className="flex items-center justify-center">
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </form>
      <div className="text-center ">

      <Link href={`/signup`} className="text-black">
      Not have an account?
      </Link>
      </div>
    </Form>
  )
}

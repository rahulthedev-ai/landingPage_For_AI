
"use client";

import React from "react";
import emailjs from "emailjs-com";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { toast, ToastContainer } from "react-toastify";

function ContactPage() {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "serviceid1234",
        "templateid1234",
        e.target,
        "targetid1234"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          toast.error("Failed to send message, please try again.");
        }
      );

    e.target.reset(); // Reset form fields after submission
  };
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <main className="w-full max-w-3xl p-4 mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Contact Me</h1>
            <p className="text-gray-600 dark:text-gray-400">
              I&apos;d love to hear from you. Here&apos;s how you can reach
              me...❤️
            </p>
          </div>
          <div className="flex justify-center">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold">Rahul Bhandari</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Full-Stack Developer
              </p>            
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Send me a message</h2>
              <p className="text-gray-500 dark:text-gray-400 ">
                Fill out the form below, and I&apos;ll get back to you as soon
                as possible.
              </p>
            </div>
            <form onSubmit={sendEmail} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  name="from_name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="from_email"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  className="min-h-[100px]"
                  placeholder="Enter your message"
                />
              </div>
              <button
                type="submit"
                className="relative px-8 py-3 font-bold text-gray bg-gray-600 rounded-md overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gray-700 transform translate-x-full group-hover:translate-x-0 transition-all duration-700 ease-out"></span>
                <span className="relative">Send message</span>
              </button>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default ContactPage;

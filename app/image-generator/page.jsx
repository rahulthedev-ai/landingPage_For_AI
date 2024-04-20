
"use client";
import React, { useState } from "react";
import Image from 'next/image';
import { Puff } from "react-loader-spinner";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import Footer from "@/components/footer";

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [promptError, setPromptError] = useState("");
  const [selectedModel, setSelectedModel] = useState("playground-v2");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("1:1");
  const [imageUrl, setImageUrl] = useState("/placeholder.svg");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateClick = () => {
    if (!prompt.trim()) {
      setPromptError("Please enter a creative prompt.");
      return;
    }
    // Implement image generation logic here (frontend only).
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
    if (promptError) setPromptError("");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDownload = () => {
    // Implement image download logic here (frontend only).
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">Image Generator</h1>
        <section className="w-full max-w-2xl mb-8 flex justify-center">
          {isLoading ? (
            <Puff color="#00BFFF" height={100} width={100} />
          ) : (
            <div onClick={toggleModal} className="cursor-pointer">
              <Image
                alt="Generated Image"
                className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                src={imageUrl}
                onContextMenu={(e) => e.preventDefault()}
                width="512"
                height="512"
              />
            </div>
          )}
        </section>

        {/* Modal for full-size image preview */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-start pt-10"
            onClick={toggleModal}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <Image
                alt="Generated Image in full size"
                src={imageUrl}
                onContextMenu={(e) => e.preventDefault()}
                className="max-w-full max-h-full rounded-lg"
                style={{ maxHeight: "90vh" }}
              />
              <button
                onClick={toggleModal}
                className="absolute right-10 top-10 text-white bg-black p-2 rounded-full hover:bg-opacity-80 focus:outline-none focus:ring z-50"
                style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" }}
              >
                &times;
              </button>
            </div>
          </div>
        )}

        <div className="w-full max-w-md mb-4">
          <Label htmlFor="aspectRatio">Image size</Label>
          <Select
            id="aspectRatio"
            value={selectedAspectRatio}
            onValueChange={setSelectedAspectRatio}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={selectedAspectRatio} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1:1">1:1</SelectItem>
              <SelectItem value="9:16">9:16</SelectItem>
              <SelectItem value="16:9">16:9</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full max-w-md mb-4">
          <Label htmlFor="model">Model</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full" variant="outline">
                Select Model
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup
                value={selectedModel}
                onValueChange={setSelectedModel}
              >
                <DropdownMenuRadioItem value="playground-v2">
                  Playground V2
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="kandinsky-2.2">
                  Kandinsky 2.2
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full max-w-md mb-4">
          <Label htmlFor="prompt">Prompt</Label>
          <Input
            id="prompt"
            placeholder="Describe what you want to see."
            type="text"
            value={prompt}
            onChange={handleChange}
          />
          {promptError && (
            <div style={{ color: "red", marginTop: "4px", fontSize: "12px" }}>
              {promptError}
            </div>
          )}
        </div>

        <Button
          className="mb-4 px-6 py-2 text-white font-bold rounded transition duration-300 ease-in-out bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 disabled:opacity-50"
          onClick={handleGenerateClick}
          disabled={isLoading}
        >
          Generate
        </Button>

        {imageUrl !== "/placeholder.svg" && (
          <Button variant="outline" onClick={handleDownload}>
            Download
          </Button>
        )}
      </main>
      <Footer />
    </>
  );
}

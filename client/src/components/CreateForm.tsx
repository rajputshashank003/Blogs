import React, { useState } from "react";
import { Input } from "./Input";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CreateForm() {
  const [title ,setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image , setImage] = useState<any>();
  const [uploading , setUploading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if( uploading ){
      return ;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("title" , title);
    formData.append("description", description);
    formData.append("file", image);

    try {
      const response : any = await axios.post("/api/blog/create", formData , {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });      
      if(!response.data.success){
        throw new Error(response);
      }
      navigate("/blog/" + response.data.id);
    } catch (e : any) {
      console.log(e);
    }

    setUploading(false);
  };

  const handleImageChange = (e : any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };



  return (
    <div className="shadow-black shadow-[5px_5px_0px_0px_rgba(109,40,217)] rounded-2xl p-4 md:p-8 bg-[#9DD9D2]">
      {
        uploading && 
        <div className="fixed z-[9999] h-screen flex justify-center items-center font-bold w-screen top-0 left-0 bg-zinc-400/40 backdrop-blur-sm text-4xl">
          Uploading...
        </div>
      }
      <h2 className="font-bold text-xl text-neutral-800 ">
        Create Blog
      </h2>
      <p className="text-neutral-600 text-sm mt-2 ">
        Share Your Thoughts with the World!
      </p>

      <form className="my-8 mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div>
            <label htmlFor="Title">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} id="Title" placeholder="Title" type="text" />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <Input onChange={(e) => handleImageChange(e)} id="image" placeholder="Durden" type="file" />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="blog">Blog Description</label>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className={`
              flex h-60 w-full border-none bg-zinc-800 text-white shadow-input rounded-md px-3 py-2 text-xl file:border-0 file:bg-transparent 
              file:text-sm file:font-medium placeholder-text-neutral-600 
              focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-600
              disabled:cursor-not-allowed disabled:opacity-50
              shadow-[0px_0px_1px_1px_var(--neutral-700)]
              group-hover/input:shadow-none transition duration-400
            `}
            id="blog" 
            placeholder="Your Blog" 
          />
        </div>
        <div className="w-full flex justify-center items-center">
            <div onClick={(e : any) => handleSubmit(e)}>
              <Button >
                Submit
              </Button>
            </div>
        </div>
      </form>
    </div>
  );
}
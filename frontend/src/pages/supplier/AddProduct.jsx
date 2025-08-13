import React, { useState, useRef, useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";
  import { IoIosClose } from "react-icons/io";
  import { addProduct, getCategories } from "../../services/productService";
  import { toast } from "react-toastify";
  import { PulseLoader } from 'react-spinners';


  function AddProduct({ className }) {

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    const fileInputRef = useRef(null);
    const navigate = useNavigate()
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      const fetchCategories = async () => {
          const data = await getCategories();
          setCategories(data);
      };
  fetchCategories();
   }, []);



    const onSubmit = async (formDataObj) => {

      const formData = new FormData();
      Object.keys(formDataObj).forEach(key => {
          if (key !== "images") {
              formData.append(key, formDataObj[key]);
          }
      });

      images.forEach(imgObj => {
          formData.append("images", imgObj.file);
      });
      console.log(formData)
      setIsLoading(true)
      
        try {
         const response = await addProduct(formData); 
          reset();
          setImages([]);
          toast.success(response)
          
        } catch (error) {
          toast.error(error || "Product couldn't added.");
        } finally {
          setIsLoading(false)
        }
    };

      // Handle image selection
      const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
          if (images.length + files.length > 4) {
            toast.error('You can only upload up to 4 images.')
            return;
          }
        const updatedImages = [
          ...images,
          ...files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
          })),
        ];
        setImages(updatedImages);
      };
    
      // Open file picker when button is clicked
      const handleAddImagesClick = () => {
        fileInputRef.current.click();
      };
    
      // Remove selected image
      const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, idx) => idx !== index);
        setImages(updatedImages);
      };


    return (
      <div className={`mt-24 mx-2 lg:mx-10 rounded-xl ${className}`}>
        <h1 className="text-2xl font-semibold mb-5">Add Product</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-5"
        >
          {/* Right Side */}
          <div className="w-full lg:w-2/3 space-y-5">
            {/* General Information */}
            <div className="px-5 py-2 bg-white rounded-lg shadow">
              <h2 className="pb-5 text-lg font-semibold">
                General Information
              </h2>

              {/* Title */}
              <div className="flex flex-col mb-3">
                <label className="text-textcolor">Title</label>
                <input
                  {...register("title", {
                    required: "Title is required",
                  })}
                  className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1
                  ring-blue-500 bg-[#f8fafb] border-textcolor"
                  type="text"
                />
                {errors.title && (
                  <span className="text-red-500 text-xs">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col mb-2">
                <label className="text-textcolor">Description</label>
                <textarea
                  {...register("description", {
                    required: "Description is required"
                  })}
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 
                  ring-blue-500 bg-[#f8fafb]  border-textcolor"
                  rows={3}
                />
                {errors.description && (
                  <span className="text-red-500 text-xs">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="px-5 py-3 bg-white rounded-lg shadow">
              <h2 className="pb-5 text-lg font-semibold">Pricing</h2>
              
              <div className="flex gap-5 w-full">
              {/* Base Price */}
              <div className="w-1/2 flex flex-col mb-3">
                <label className="text-textcolor">Base Price</label>
                <input
                  {...register("price", {
                    required: "Base Price is required",
                    valueAsNumber: true,
                  })}
                  className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1 
                  ring-blue-500 bg-[#f8fafb] border-textcolor"
                  type="number"
                />
                {errors.basePrice && (
                  <span className="text-red-500 text-xs">
                    {errors.basePrice.message}
                  </span>
                )}
              </div>

              {/* Discount */}
              <div className="w-1/2 flex flex-col mb-3">
                <label className="text-textcolor">Discount (%)</label>
                <input
                  {...register("discount", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1
                  ring-blue-500 bg-[#f8fafb] border-textcolor"
                  type="number"
                />
              </div>
              </div>

            </div>

            {/* Inventory */}
            <div className="px-5 py-2 bg-white rounded-lg shadow">
              <h2 className="pb-5 text-lg font-semibold">Inventory</h2>

              <div className="flex flex-col mb-3">
                <label className="text-textcolor">Quantity</label>
                <input
                  {...register("quantity", {
                    required: "Quantity is required",
                    valueAsNumber: true,
                  })}
                  className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1
                  ring-blue-500 bg-[#f8fafb] border-textcolor"
                  type="number"
                />
                {errors.quantity && (
                  <span className="text-red-500 text-xs">
                    {errors.quantity.message}
                  </span>
                )}
              </div>
            </div>

            {/* Additional Details */}
            <div className="px-5 py-3 bg-white rounded-lg shadow">
              <h2 className="pb-5 text-lg font-semibold">Additional Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Material */}
              <div className=" flex flex-col mb-3">
                <label className="text-textcolor">Material</label>
                <input
                  {...register("material")}
                  className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1
                  ring-blue-500 bg-[#f8fafb] border-textcolor"
                  type="text"
                />
              </div>

              {/* Condition */}
              <div className="flex flex-col mb-3">
                <label className="text-textcolor">Condition</label>
                <select
                  {...register("condition")}
                  className="border rounded-md px-3 py-1 bg-[#f8fafb] focus:outline-none 
                  focus:ring-1 ring-blue-500 border-textcolor"
                >
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </div>

              {/* Warranty */}
              <div className="flex flex-col mb-3">
                <label className="text-textcolor">Warranty (Months)</label>
                <input
                  {...register("warranty", { valueAsNumber: true })}
                  className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1
                  ring-blue-500 bg-[#f8fafb] border-textcolor"
                  type="number"
                />
              </div>
              </div>

              {/* Free Shipping */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("freeShipping")}
                />
                <label className="font-medium">Free Shipping</label>
              </div>
            </div>
          </div>

          {/* Left Side */}
          <div className="w-full lg:w-1/3 space-y-5">
            {/* Product Photo */}
            <div className="bg-white px-3 py-3 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">Product Photo</h2>
            
              <div className="flex flex-col items-center gap-3 py-5 px-2 border-dashed border
              border-gray-500 bg-[#f8fafb] rounded-md">
                <div className="flex justify-center items-center gap-2">
                  {images.length > 0 ? (
                    images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-20 h-20 overflow-hidden rounded-md bg-white"
                      >
                        <img
                          src={img.preview}
                          alt="Product"
                          className="w-full h-full object-cover bg-white"
                        />
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-0 right-0 bg-red-500  text-white text-xs 
                          cursor-pointer rounded-bl"
                        >
                          <IoIosClose/>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No images selected</p>
                  )}
                </div>
                <button
                  onClick={handleAddImagesClick}
                  type="button"
                  className="px-3 py-1 border border-blue-500 rounded-md bg-[#e7e7f5]
                  cursor-pointer text-blue-600"
                >
                  Add more Images
                </button>

                
                {/* Hidden file input */}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Category */}
            <div className="bg-white p-3 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">Category</h2>
              <div className="flex flex-col">
              <label className="text-textcolor">Product Category</label>
              <select
                  {...register("category")}
                  className="bg-[#f8fafb] border-gray-200 rounded-md px-3 py-1 border 
                  focus:outline-none focus:ring-1 ring-blue-500"
                >
            
                 {Array.isArray(categories) && categories.map(cat => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
            </div>
            </div>

            <div className="flex flex-col gap-2">
            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md
              hover:bg-blue-700 cursor-pointer">
              { isLoading ? <PulseLoader size={8} color="#fff"/> : "Save Product" }
            </button>
            <button 
            onClick={() => navigate(-1)}
            className="w-full py-1.5 text-textcolor font-semibold 
            rounded-md border hover:bg-gray-200 cursor-pointer">
              Back
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  export default AddProduct;

  import React, { useRef, useState, useEffect } from 'react'
  import { useForm } from 'react-hook-form'
  import { useNavigate, useLocation } from 'react-router-dom';
  import Avatar from '../assets/Avatar.png'
  import { FaPen } from "react-icons/fa6";
  import { axiosInstance as axios } from '../services/axiosInstance';
  import { useDispatch, useSelector } from 'react-redux';
  import { setSupplier } from '../store/authSlice'
  import { toast } from 'react-toastify';
  import { PulseLoader } from 'react-spinners';

  function EditProfile() {

    const location = useLocation();
    const dispatch = useDispatch();
    const fileInputRef = useRef();
    const navigate = useNavigate()
    const supplier = useSelector(state => state.auth.supplier);
    const buyer = useSelector(state => state.auth.buyer);
    const isSupplierEdit = location.pathname === '/supplier/edit';
    const isBuyerEdit = location.pathname === '/buyer/edit';

     const profile = isSupplierEdit
    ? supplier
    : isBuyerEdit
    ? buyer || supplier
    : supplier || {} 
    
      const {
    avatar = '',
    firstName = '',
    lastName = '',
    email = '',
    contact = '',
    address = '',
    description = '',
    } = profile || {}
  

    const [previewAvatar, setPreviewAvatar] = useState(avatar || Avatar);
    const [isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
  setPreviewAvatar(profile?.avatar || Avatar);
}, [profile]);

    const { register, handleSubmit, reset, formState: { errors },
    } = useForm({
        defaultValues: {
         firstName,
         lastName,
         email,
         contact,
         address,
         password: '',
         description,
      }
    })

       useEffect(() => {
        reset({
          firstName: profile?.firstName || '',
          lastName: profile?.lastName || '',
          email: profile?.email || '',
          contact: profile?.contact || '',
          address: profile?.address || '',
          password: '',
          description: profile?.description || '',
        })
        setPreviewAvatar(profile?.avatar || Avatar)
      }, [profile, reset])

   const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewAvatar(imageUrl);
    }
  };

    const onSubmit = async (data) => {

      setIsLoading(true)
      const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('contact', data.contact || '');
        formData.append('address', data.address)
        formData.append('password', data.password || '');
        formData.append('description', data.description || '');
        if (data.avatar && data.avatar.length > 0) {
          formData.append('avatar', data.avatar[0]);
        }  
        
      try {

      if (profile.role === 'supplier') {
          const res =  await axios.put('/supplier/update-profile', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
        dispatch(setSupplier(res.data.supplier));
        toast.success(res.data.message)

      } else if (profile.role === 'buyer') {
        await axios.put('/buyer/profile', payload, { withCredentials: true });
      }

    } catch(error) {
         toast.error(error.response?.data?.error || "Failed to update profile")
    } finally {
       setIsLoading(false)
    }
      }


    return (
      <div className='my-20 mx-10 bg-white p-6 rounded-md shadow-md max-w-2xl'>
        {/* Title */}
        <h1 className='text-2xl font-bold mb-6'>Edit Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        
          {/* Profile Image with upload trigger */}
          <div className='flex justify-center'>
            <div className='relative border-2 border-gray-200  rounded-full'>
              <div className='w-20 h-20 overflow-hidden '>
              <img
                src={previewAvatar}
                alt="Avatar"
                className='w-full h-full object-cover  rounded-full'
              /></div>

              {/* Hidden file input */}
               <input
                 type="file"
                 accept="image/*"
                 style={{ display: 'none' }}
                 {...register('avatar')}
                 ref={(el) => {
                   register('avatar').ref(el);
                   fileInputRef.current = el;
                 }}
                 onChange={(e) => {
                   register('avatar').onChange(e); 
                   handleAvatarChange(e);  
                 }}
               />
              {/* Pen icon triggers file input */}
              <div
                className='absolute bottom-0 right-1 z-20 w-fit px-1 py-1 
                bg-blue-500 rounded-full text-white cursor-pointer'
                onClick={() => fileInputRef.current?.click()}
              >
                <FaPen className='text-xs' />
              </div>
            </div>
          </div>
          {/* First and Last Name */}
          <div className='flex gap-4'>
            <div className='flex flex-col w-full'>
              <label>First Name</label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                className='border rounded-sm px-2 py-1 border-gray-300 focus:outline-0 
              focus:ring-1 focus:border-0 ring-blue-500'
                type="text"
              />
              {errors.firstName && (
                <span className='text-red-500 text-xs'>{errors.firstName.message}</span>
              )}
            </div>

            <div className='flex flex-col w-full'>
              <label>Last Name</label>
              <input
                {...register('lastName', { required: 'Last name is required' })}
                className='border rounded-sm px-2 py-1 focus:outline-0 border-gray-300
                focus:ring-1 focus:border-0 ring-blue-500'
                type="text"
              />
              {errors.lastName && (
                <span className='text-red-500 text-xs'>{errors.lastName.message}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className='flex flex-col'>
            <label>Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
              className='border rounded-sm px-2 py-1 focus:outline-0 border-gray-300
              focus:ring-1 focus:border-0 ring-blue-500'
              type="email"
              disabled={true}
            />
            {errors.email && (
              <span className='text-red-500 text-xs'>{errors.email.message}</span>
            )}
          </div>

          {/* Contact Number */}
          <div className='flex flex-col'>
            <label>Contact Number</label>
            <input
              {...register('contact', {
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: 'Enter a valid number (10–15 digits)',
                },
              })}
              className='border rounded-sm px-2 py-1 focus:outline-0 border-gray-300
              focus:ring-1 focus:border-0 ring-blue-500'
              type="text"
            />
            {errors.contact && (
              <span className='text-red-500 text-xs'>{errors.contact.message}</span>
            )}
          </div>

          {/* Address */}
          <div className='flex flex-col'>
            <label>Address</label>
            <input
              {...register('address', {
                minLength: {
                  value: 3,
                  message: 'Address must be at least 3 characters',
                },
              })}
              className='border rounded-sm px-2 py-1 focus:outline-0 border-gray-300
              focus:ring-1 focus:border-0 ring-blue-500'
              type="text"
            />
            {errors.address && (
              <span className='text-red-500 text-xs'>{errors.address.message}</span>
            )}
          </div>

          {/* Password */}
          <div className='flex flex-col'>
            <label>Password</label>
            <input
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'At least 6 characters required',
                },
              })}
              className='border rounded-sm px-2 py-1 focus:outline-0 border-gray-300
              focus:ring-1 focus:border-0 ring-blue-500'
              type="password"
            />
            {errors.password && (
              <span className='text-red-500 text-xs'>{errors.password.message}</span>
            )}
          </div>

          {/* Description */}
          <div className='flex flex-col'>
            <label>Description</label>
            <textarea
              {...register('description')}
              className='border rounded-sm px-2 py-1 focus:outline-0 border-gray-300
              focus:ring-1 focus:border-0 ring-blue-500'
              rows={3}
            />
          </div>

          <div className='flex gap-3'>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className='px-4 py-2 text-gray-700 border rounded-md 
              hover:bg-gray-200 text-sm' >
              Back
            </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className='px-4 py-2 bg-blue-500 text-white rounded-md
            hover:bg-blue-600 text-sm'
          >
           { isLoading ? <PulseLoader size={8} color="#fff"/> : "Save" }
          </button>
          </div>
        </form>
      </div>
    )
  }

  export default EditProfile

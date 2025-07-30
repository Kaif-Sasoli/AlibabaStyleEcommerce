import React from 'react'
import { useForm } from 'react-hook-form'

function PostForm({
  fields = [],
  onSubmit,
  defaultValues = {},
  submitLabel = "Submit",
  className = ""
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="mb-1 font-medium">
            {field.label}
          </label>
          <input
            id={field.name}
            type={field.type || 'text'}
            placeholder={field.placeholder}
            {...register(field.name, field.validation)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors[field.name] && (
            <span className="text-red-500 text-sm mt-1">
              {errors[field.name].message}
            </span>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  )
}

export default PostForm

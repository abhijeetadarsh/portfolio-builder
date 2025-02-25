// src/components/portfolios/PortfolioForm.tsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Portfolio, PortfolioCreateData } from "../../types/auth";

const portfolioSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  template: z.enum(["modern", "classic", "minimal"], {
    errorMap: () => ({ message: "Please select a valid template" }),
  }),
  skills: z
    .array(z.string())
    .min(1, "At least one skill is required")
    .max(20, "Cannot have more than 20 skills"),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

interface PortfolioFormProps {
  initialData?: Portfolio;
  onSubmit: (data: PortfolioCreateData) => Promise<void>;
  isLoading: boolean;
}

const PortfolioForm = ({
  initialData,
  onSubmit,
  isLoading,
}: PortfolioFormProps) => {
  const [newSkill, setNewSkill] = useState("");

  const defaultValues: PortfolioFormData = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    template: (initialData?.template as any) || "modern",
    skills: initialData?.skills || [],
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues,
  });

  const skills = watch("skills");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setValue("skills", [...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setValue(
      "skills",
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const onFormSubmit = (data: PortfolioFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Portfolio Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Template
        </label>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Controller
            name="template"
            control={control}
            render={({ field }) => (
              <>
                <div
                  className={`border rounded-md p-4 cursor-pointer ${
                    field.value === "modern"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-300 hover:border-primary-300"
                  }`}
                  onClick={() => field.onChange("modern")}
                >
                  <div className="h-20 bg-primary-100 mb-2 rounded flex items-center justify-center">
                    <span className="text-primary-600">Modern Preview</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={field.value === "modern"}
                      onChange={() => field.onChange("modern")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">Modern</label>
                  </div>
                </div>

                <div
                  className={`border rounded-md p-4 cursor-pointer ${
                    field.value === "classic"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-300 hover:border-primary-300"
                  }`}
                  onClick={() => field.onChange("classic")}
                >
                  <div className="h-20 bg-primary-100 mb-2 rounded flex items-center justify-center">
                    <span className="text-primary-600">Classic Preview</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={field.value === "classic"}
                      onChange={() => field.onChange("classic")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Classic
                    </label>
                  </div>
                </div>

                <div
                  className={`border rounded-md p-4 cursor-pointer ${
                    field.value === "minimal"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-300 hover:border-primary-300"
                  }`}
                  onClick={() => field.onChange("minimal")}
                >
                  <div className="h-20 bg-primary-100 mb-2 rounded flex items-center justify-center">
                    <span className="text-primary-600">Minimal Preview</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={field.value === "minimal"}
                      onChange={() => field.onChange("minimal")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Minimal
                    </label>
                  </div>
                </div>
              </>
            )}
          />
        </div>
        {errors.template && (
          <p className="mt-1 text-sm text-red-600">{errors.template.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Skills
        </label>
        <div className="mt-1 flex">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Add a skill..."
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Add
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-primary-50 text-primary-700 px-2 py-1 rounded"
            >
              <span className="text-sm">{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="ml-1 text-primary-500 hover:text-primary-700"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {errors.skills && (
          <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {isLoading
            ? "Saving..."
            : initialData
            ? "Update Portfolio"
            : "Create Portfolio"}
        </button>
      </div>
    </form>
  );
};

export default PortfolioForm;

// src/components/projects/ProjectForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Project, ProjectCreateData } from "../../types/auth";

const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  repoUrl: z
    .string()
    .url("Please enter a valid URL")
    .or(z.literal(""))
    .optional(),
  demoUrl: z
    .string()
    .url("Please enter a valid URL")
    .or(z.literal(""))
    .optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: ProjectCreateData) => Promise<void>;
  isLoading: boolean;
}

const ProjectForm = ({
  initialData,
  onSubmit,
  isLoading,
}: ProjectFormProps) => {
  const defaultValues: ProjectFormData = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    repoUrl: initialData?.repoUrl || "",
    demoUrl: initialData?.demoUrl || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const onFormSubmit = (data: ProjectFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Project Title
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
        <label
          htmlFor="repoUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Repository URL (Optional)
        </label>
        <input
          id="repoUrl"
          type="text"
          {...register("repoUrl")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="https://github.com/username/repo"
        />
        {errors.repoUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.repoUrl.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="demoUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Demo URL (Optional)
        </label>
        <input
          id="demoUrl"
          type="text"
          {...register("demoUrl")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="https://example.com"
        />
        {errors.demoUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.demoUrl.message}</p>
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
            ? "Update Project"
            : "Create Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;

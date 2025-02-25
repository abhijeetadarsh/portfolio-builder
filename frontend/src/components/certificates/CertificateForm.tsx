// src/components/certificates/CertificateForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Certificate, CertificateCreateData } from "../../types/auth";

const certificateSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  issuer: z
    .string()
    .min(2, "Issuer must be at least 2 characters")
    .max(100, "Issuer cannot exceed 100 characters"),
  issueDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Please enter a valid date",
    }),
  url: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
});

type CertificateFormData = z.infer<typeof certificateSchema>;

interface CertificateFormProps {
  initialData?: Certificate;
  onSubmit: (data: CertificateCreateData) => Promise<void>;
  isLoading: boolean;
}

const CertificateForm = ({
  initialData,
  onSubmit,
  isLoading,
}: CertificateFormProps) => {
  // Format date for the default value
  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const defaultValues: CertificateFormData = {
    title: initialData?.title || "",
    issuer: initialData?.issuer || "",
    issueDate: formatDateForInput(initialData?.issueDate),
    url: initialData?.url || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    defaultValues,
  });

  const onFormSubmit = (data: CertificateFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Certificate Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="e.g. AWS Solutions Architect"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="issuer"
          className="block text-sm font-medium text-gray-700"
        >
          Issuing Organization
        </label>
        <input
          id="issuer"
          type="text"
          {...register("issuer")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="e.g. Amazon Web Services"
        />
        {errors.issuer && (
          <p className="mt-1 text-sm text-red-600">{errors.issuer.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="issueDate"
          className="block text-sm font-medium text-gray-700"
        >
          Issue Date
        </label>
        <input
          id="issueDate"
          type="date"
          {...register("issueDate")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
        {errors.issueDate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.issueDate.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700"
        >
          Certificate URL (Optional)
        </label>
        <input
          id="url"
          type="text"
          {...register("url")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="https://credential.example.com/verify/abc123"
        />
        {errors.url && (
          <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
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
            ? "Update Certificate"
            : "Add Certificate"}
        </button>
      </div>
    </form>
  );
};

export default CertificateForm;

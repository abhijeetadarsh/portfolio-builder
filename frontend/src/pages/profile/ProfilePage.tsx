// src/pages/profile/ProfilePage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { userService } from "../../services/api";
import { UserUpdateData } from "../../types/auth";

const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  githubUrl: z
    .string()
    .url("Please enter a valid URL")
    .or(z.literal(""))
    .optional(),
  linkedinUrl: z
    .string()
    .url("Please enter a valid URL")
    .or(z.literal(""))
    .optional(),
  twitterUrl: z
    .string()
    .url("Please enter a valid URL")
    .or(z.literal(""))
    .optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: user, isLoading } = useQuery("profile", () =>
    userService.getProfile().then((res) => res.data)
  );

  const mutation = useMutation(
    (data: UserUpdateData) => userService.updateProfile(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
        setSuccess("Profile updated successfully");
        setError("");
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || "Failed to update profile");
        setSuccess("");
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      githubUrl: user?.githubUrl || "",
      linkedinUrl: user?.linkedinUrl || "",
      twitterUrl: user?.twitterUrl || "",
    },
    values: user
      ? {
          name: user.name,
          bio: user.bio || "",
          githubUrl: user.githubUrl || "",
          linkedinUrl: user.linkedinUrl || "",
          twitterUrl: user.twitterUrl || "",
        }
      : undefined,
  });

  const onSubmit = (data: ProfileFormData) => {
    setError("");
    setSuccess("");
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Profile">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-500">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Profile">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-6">Profile Settings</h3>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                {...register("bio")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Tell us about yourself..."
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Social Links
              </h4>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="githubUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    GitHub
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      <i className="feather-github"></i>
                    </span>
                    <input
                      id="githubUrl"
                      type="text"
                      {...register("githubUrl")}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  {errors.githubUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.githubUrl.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="linkedinUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    LinkedIn
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      <i className="feather-linkedin"></i>
                    </span>
                    <input
                      id="linkedinUrl"
                      type="text"
                      {...register("linkedinUrl")}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://linkedin.com/in/yourusername"
                    />
                  </div>
                  {errors.linkedinUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.linkedinUrl.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="twitterUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Twitter
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      <i className="feather-twitter"></i>
                    </span>
                    <input
                      id="twitterUrl"
                      type="text"
                      {...register("twitterUrl")}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://twitter.com/yourusername"
                    />
                  </div>
                  {errors.twitterUrl && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.twitterUrl.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={mutation.isLoading || !isDirty}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                  isDirty
                    ? "bg-primary-600 hover:bg-primary-700"
                    : "bg-gray-400 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
              >
                {mutation.isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;

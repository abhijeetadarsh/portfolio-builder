// src/pages/projects/ProjectCreatePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProjectForm from "../../components/projects/ProjectForm";
import { projectService } from "../../services/api";
import { ProjectCreateData } from "../../types/auth";

const ProjectCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const mutation = useMutation(
    (data: ProjectCreateData) => projectService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
        navigate("/projects");
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || "Failed to create project");
      },
    }
  );

  const handleSubmit = async (data: ProjectCreateData) => {
    setError("");
    mutation.mutate(data);
  };

  return (
    <DashboardLayout title="Add Project">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-6">Create a New Project</h3>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <ProjectForm onSubmit={handleSubmit} isLoading={mutation.isLoading} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectCreatePage;

// src/pages/projects/ProjectsPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { projectService } from "../../services/api";

const ProjectsPage = () => {
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const { data: projects, isLoading } = useQuery("projects", () =>
    projectService.getAll().then((res) => res.data)
  );

  const deleteMutation = useMutation(
    (id: number) => projectService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
        setConfirmDelete(null);
      },
    }
  );

  const handleDelete = (id: number) => {
    if (confirmDelete === id) {
      deleteMutation.mutate(id);
    } else {
      setConfirmDelete(id);
    }
  };

  return (
    <DashboardLayout title="Projects">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Your Projects</h3>
        <Link
          to="/projects/create"
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          <i className="mr-2 feather-plus"></i>
          Add Project
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-500">Loading...</div>
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between">
                <h4 className="text-lg font-semibold">{project.title}</h4>
                <div className="flex space-x-2">
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className={`text-${
                      confirmDelete === project.id ? "red" : "gray"
                    }-600 hover:text-${
                      confirmDelete === project.id ? "red" : "gray"
                    }-700`}
                  >
                    {confirmDelete === project.id ? "Confirm" : "Delete"}
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mt-2">{project.description}</p>

              <div className="flex mt-4 space-x-4">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary-600"
                  >
                    <i className="mr-1 feather-github"></i>
                    Repository
                  </a>
                )}

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary-600"
                  >
                    <i className="mr-1 feather-external-link"></i>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 mb-4">
            You haven't added any projects yet.
          </p>
          <Link
            to="/projects/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <i className="mr-2 feather-plus"></i>
            Add Project
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProjectsPage;

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import PortfolioForm from "../components/PortfolioForm";
import ProjectForm from "../components/ProjectForm";
import { getPortfolios, updatePortfolio } from "../services/api";

const EditPortfolio = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    loadPortfolio();
  }, [id]);

  const loadPortfolio = async () => {
    try {
      const portfolios = await getPortfolios();
      const currentPortfolio = portfolios.find((p) => p.id === id);
      if (currentPortfolio) {
        setPortfolio(currentPortfolio);
      } else {
        toast.error("Portfolio not found");
      }
    } catch (error) {
      toast.error("Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  };

  const handlePortfolioSubmit = async (formData) => {
    return await updatePortfolio(id, formData);
  };

  const handleProjectSubmit = async (projectData) => {
    const updatedPortfolio = {
      ...portfolio,
      projects: [...(portfolio.projects || []), projectData],
    };
    await updatePortfolio(id, updatedPortfolio);
    setPortfolio(updatedPortfolio);
    setShowProjectForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!portfolio) {
    return <div>Portfolio not found</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-6">Edit Portfolio</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <PortfolioForm
          initialData={portfolio}
          onSubmit={handlePortfolioSubmit}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Projects</h2>
          <button
            onClick={() => setShowProjectForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Project
          </button>
        </div>

        {showProjectForm && (
          <div className="mt-4">
            <ProjectForm
              portfolioId={id}
              onSubmit={handleProjectSubmit}
              onCancel={() => setShowProjectForm(false)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {portfolio.projects?.map((project, index) => (
            <div key={index} className="border p-4 rounded">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 block mt-2"
                >
                  GitHub Repository
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 block mt-2"
                >
                  Live Demo
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditPortfolio;

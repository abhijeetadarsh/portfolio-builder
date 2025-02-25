// src/pages/portfolios/SharedPortfolioPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { portfolioService } from "../../services/api";
import { Portfolio, Project, Certificate } from "../../types/auth";
import { format } from "date-fns";

const SharedPortfolioPage = () => {
  const { link } = useParams<{ link: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (!link) return;
        setLoading(true);
        const res = await portfolioService.getByShareableLink(link);
        setPortfolio(res.data);
        setLoading(false);
      } catch (error) {
        setError("Portfolio not found or no longer available");
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [link]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-500">Loading portfolio...</div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Portfolio Not Found
          </h1>
          <p className="text-gray-600">
            {error ||
              "The portfolio you are looking for does not exist or is no longer available."}
          </p>
        </div>
      </div>
    );
  }

  const renderModernTemplate = () => (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 px-8 py-12 text-white">
          <h1 className="text-4xl font-bold mb-2">{portfolio.title}</h1>
          <p className="text-xl opacity-90">{portfolio.description}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {portfolio.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="p-8">
          {portfolio.projects && portfolio.projects.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.projects.map((project) => (
                  <div
                    key={project.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-4 mt-4">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary-600 hover:text-primary-700"
                        >
                          <i className="mr-1 feather-github"></i>
                          View Code
                        </a>
                      )}
                      // src/pages/portfolios/SharedPortfolioPage.tsx
                      (continued)
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary-600 hover:text-primary-700"
                        >
                          <i className="mr-1 feather-external-link"></i>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {portfolio.certificates && portfolio.certificates.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                Certifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.certificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-semibold mb-1 text-gray-800">
                      {certificate.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{certificate.issuer}</p>
                    <p className="text-gray-500 text-sm">
                      Issued: {formatDate(certificate.issueDate)}
                    </p>

                    {certificate.url && (
                      <div className="mt-4">
                        <a
                          href={certificate.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary-600 hover:text-primary-700"
                        >
                          <i className="mr-1 feather-external-link"></i>
                          View Certificate
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">{portfolio.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {portfolio.description}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {portfolio.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {portfolio.projects && portfolio.projects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Projects</h2>
            <div className="space-y-8">
              {portfolio.projects.map((project) => (
                <div key={project.id} className="border-b pb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="flex gap-4">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <i className="mr-1 feather-github"></i>
                        Code Repository
                      </a>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <i className="mr-1 feather-external-link"></i>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {portfolio.certificates && portfolio.certificates.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Certifications
            </h2>
            <div className="space-y-4">
              {portfolio.certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h3 className="text-lg font-medium">{certificate.title}</h3>
                    <p className="text-gray-600">
                      {certificate.issuer} • {formatDate(certificate.issueDate)}
                    </p>
                  </div>

                  {certificate.url && (
                    <a
                      href={certificate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <i className="feather-external-link"></i>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {portfolio.template === "modern"
        ? renderModernTemplate()
        : renderMinimalTemplate()}
    </div>
  );
};

export default SharedPortfolioPage;

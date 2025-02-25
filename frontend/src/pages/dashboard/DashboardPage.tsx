// src/pages/dashboard/DashboardPage.tsx
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  portfolioService,
  projectService,
  certificateService,
} from "../../services/api";

const DashboardPage = () => {
  const { data: portfolios, isLoading: isLoadingPortfolios } = useQuery(
    "portfolios",
    () => portfolioService.getAll().then((res) => res.data)
  );

  const { data: projects, isLoading: isLoadingProjects } = useQuery(
    "projects",
    () => projectService.getAll().then((res) => res.data)
  );

  const { data: certificates, isLoading: isLoadingCertificates } = useQuery(
    "certificates",
    () => certificateService.getAll().then((res) => res.data)
  );

  const isLoading =
    isLoadingPortfolios || isLoadingProjects || isLoadingCertificates;

  if (isLoading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-500">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portfolios Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Portfolios</h3>
            <span className="text-2xl font-bold text-primary-600">
              {portfolios?.length || 0}
            </span>
          </div>
          <p className="text-gray-500 mb-4">Your professional showcases</p>
          <Link
            to="/portfolios"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View all portfolios →
          </Link>
        </div>

        {/* Projects Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Projects</h3>
            <span className="text-2xl font-bold text-primary-600">
              {projects?.length || 0}
            </span>
          </div>
          <p className="text-gray-500 mb-4">Your work and creations</p>
          <Link
            to="/projects"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View all projects →
          </Link>
        </div>

        {/* Certificates Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Certificates</h3>
            <span className="text-2xl font-bold text-primary-600">
              {certificates?.length || 0}
            </span>
          </div>
          <p className="text-gray-500 mb-4">
            Your achievements and qualifications
          </p>
          <Link
            to="/certificates"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View all certificates →
          </Link>
        </div>
      </div>

      {/* Recent Portfolios */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Recent Portfolios</h3>

        {portfolios && portfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.slice(0, 3).map((portfolio) => (
              <div
                key={portfolio.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-40 bg-primary-100 flex items-center justify-center">
                  <i className="text-primary-300 text-4xl feather-layout"></i>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">
                    {portfolio.title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Template: {portfolio.template}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/portfolios/${portfolio.id}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Edit
                    </Link>
                    <button className="flex items-center text-sm text-primary-600">
                      <i className="mr-1 feather-share-2"></i>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 mb-4">
              You haven't created any portfolios yet.
            </p>
            <Link
              to="/portfolios/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <i className="mr-2 feather-plus"></i>
              Create Portfolio
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;

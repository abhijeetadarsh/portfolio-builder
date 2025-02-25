// src/pages/portfolios/PortfoliosPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { portfolioService } from "../../services/api";
import { Portfolio } from "../../types/auth";

const PortfoliosPage = () => {
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const { data: portfolios, isLoading } = useQuery("portfolios", () =>
    portfolioService.getAll().then((res) => res.data)
  );

  const deleteMutation = useMutation(
    (id: number) => portfolioService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("portfolios");
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

  const handleShareLink = (portfolio: Portfolio) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/portfolio/${portfolio.shareableLink}`
    );
    alert("Portfolio link copied to clipboard!");
  };

  return (
    <DashboardLayout title="Portfolios">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Your Portfolios</h3>
        <Link
          to="/portfolios/create"
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          <i className="mr-2 feather-plus"></i>
          Create Portfolio
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-500">Loading...</div>
        </div>
      ) : portfolios && portfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-40 bg-primary-100 flex items-center justify-center">
                // Continuing from the previous code...
                <i className="text-primary-300 text-4xl feather-layout"></i>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">
                  {portfolio.title}
                </h4>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {portfolio.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {portfolio.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Link
                      to={`/portfolios/${portfolio.id}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(portfolio.id)}
                      className={`text-${
                        confirmDelete === portfolio.id ? "red" : "gray"
                      }-600 hover:text-${
                        confirmDelete === portfolio.id ? "red" : "gray"
                      }-700`}
                    >
                      {confirmDelete === portfolio.id ? "Confirm" : "Delete"}
                    </button>
                  </div>
                  <button
                    onClick={() => handleShareLink(portfolio)}
                    className="flex items-center text-sm text-primary-600"
                  >
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
    </DashboardLayout>
  );
};

export default PortfoliosPage;

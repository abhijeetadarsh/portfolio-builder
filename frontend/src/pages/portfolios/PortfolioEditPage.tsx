// src/pages/portfolios/PortfolioEditPage.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PortfolioForm from "../../components/portfolios/PortfolioForm";
import { portfolioService } from "../../services/api";
import { PortfolioCreateData } from "../../types/auth";

const PortfolioEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const { data: portfolio, isLoading: isLoadingPortfolio } = useQuery(
    ["portfolio", id],
    () => portfolioService.getById(Number(id)).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  const mutation = useMutation(
    (data: PortfolioCreateData) => portfolioService.update(Number(id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["portfolio", id]);
        queryClient.invalidateQueries("portfolios");
        navigate("/portfolios");
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || "Failed to update portfolio");
      },
    }
  );

  const handleSubmit = async (data: PortfolioCreateData) => {
    setError("");
    mutation.mutate(data);
  };

  if (isLoadingPortfolio) {
    return (
      <DashboardLayout title="Edit Portfolio">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-500">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Portfolio">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-6">Edit Portfolio</h3>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {portfolio && (
            <PortfolioForm
              initialData={portfolio}
              onSubmit={handleSubmit}
              isLoading={mutation.isLoading}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioEditPage;

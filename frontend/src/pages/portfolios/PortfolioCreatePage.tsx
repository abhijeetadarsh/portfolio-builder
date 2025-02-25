// src/pages/portfolios/PortfolioCreatePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PortfolioForm from "../../components/portfolios/PortfolioForm";
import { portfolioService } from "../../services/api";
import { PortfolioCreateData } from "../../types/auth";

const PortfolioCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const mutation = useMutation(
    (data: PortfolioCreateData) => portfolioService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("portfolios");
        navigate("/portfolios");
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || "Failed to create portfolio");
      },
    }
  );

  const handleSubmit = async (data: PortfolioCreateData) => {
    setError("");
    mutation.mutate(data);
  };

  return (
    <DashboardLayout title="Create Portfolio">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-6">Create a New Portfolio</h3>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <PortfolioForm
            onSubmit={handleSubmit}
            isLoading={mutation.isLoading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioCreatePage;

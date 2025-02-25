// src/pages/certificates/CertificateCreatePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CertificateForm from "../../components/certificates/CertificateForm";
import { certificateService } from "../../services/api";
import { CertificateCreateData } from "../../types/auth";

const CertificateCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const mutation = useMutation(
    (data: CertificateCreateData) => certificateService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("certificates");
        navigate("/certificates");
      },
      onError: (error: any) => {
        setError(
          error.response?.data?.message || "Failed to create certificate"
        );
      },
    }
  );

  const handleSubmit = async (data: CertificateCreateData) => {
    setError("");
    mutation.mutate(data);
  };

  return (
    <DashboardLayout title="Add Certificate">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-6">Add a New Certificate</h3>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <CertificateForm
            onSubmit={handleSubmit}
            isLoading={mutation.isLoading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CertificateCreatePage;

// src/pages/certificates/CertificateEditPage.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CertificateForm from "../../components/certificates/CertificateForm";
import { certificateService } from "../../services/api";
import { CertificateCreateData } from "../../types/auth";

const CertificateEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const { data: certificate, isLoading: isLoadingCertificate } = useQuery(
    ["certificate", id],
    () => certificateService.getById(Number(id)).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  const mutation = useMutation(
    (data: CertificateCreateData) =>
      certificateService.update(Number(id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["certificate", id]);
        queryClient.invalidateQueries("certificates");
        navigate("/certificates");
      },
      onError: (error: any) => {
        setError(
          error.response?.data?.message || "Failed to update certificate"
        );
      },
    }
  );

  const handleSubmit = async (data: CertificateCreateData) => {
    setError("");
    mutation.mutate(data);
  };

  if (isLoadingCertificate) {
    return (
      <DashboardLayout title="Edit Certificate">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-500">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Certificate">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-6">Edit Certificate</h3>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {certificate && (
            <CertificateForm
              initialData={certificate}
              onSubmit={handleSubmit}
              isLoading={mutation.isLoading}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CertificateEditPage;

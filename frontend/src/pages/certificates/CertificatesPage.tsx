// src/pages/certificates/CertificatesPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { format } from "date-fns";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { certificateService } from "../../services/api";

const CertificatesPage = () => {
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const { data: certificates, isLoading } = useQuery("certificates", () =>
    certificateService.getAll().then((res) => res.data)
  );

  const deleteMutation = useMutation(
    (id: number) => certificateService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("certificates");
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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <DashboardLayout title="Certificates">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Your Certificates</h3>
        <Link
          to="/certificates/create"
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          <i className="mr-2 feather-plus"></i>
          Add Certificate
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-500">Loading...</div>
        </div>
      ) : certificates && certificates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{certificate.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {certificate.issuer}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Issued: {formatDate(certificate.issueDate)}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link
                    to={`/certificates/${certificate.id}`}
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(certificate.id)}
                    className={`text-${
                      confirmDelete === certificate.id ? "red" : "gray"
                    }-600 hover:text-${
                      confirmDelete === certificate.id ? "red" : "gray"
                    }-700 text-sm`}
                  >
                    {confirmDelete === certificate.id ? "Confirm" : "Delete"}
                  </button>
                </div>
              </div>

              {certificate.url && (
                <div className="mt-4">
                  <a
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary-600"
                  >
                    <i className="mr-1 feather-external-link"></i>
                    View Certificate
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 mb-4">
            You haven't added any certificates yet.
          </p>
          <Link
            to="/certificates/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <i className="mr-2 feather-plus"></i>
            Add Certificate
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CertificatesPage;

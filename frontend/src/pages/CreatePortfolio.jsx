import PortfolioForm from "../components/PortfolioForm";
import { createPortfolio } from "../services/api";

const CreatePortfolio = () => {
  const handleSubmit = async (formData) => {
    return await createPortfolio(formData);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Portfolio</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <PortfolioForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreatePortfolio;

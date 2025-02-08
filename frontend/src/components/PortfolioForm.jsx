import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const PortfolioForm = ({ initialData, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    initialData || {
      template: "",
      title: "",
      description: "",
      skills: [],
    },
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast.success("Portfolio saved successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to save portfolio");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Template
        </label>
        <select
          value={formData.template}
          onChange={(e) =>
            setFormData({ ...formData, template: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a template</option>
          <option value="modern">Modern</option>
          <option value="classic">Classic</option>
          <option value="minimal">Minimal</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows="4"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Skills (comma-separated)
        </label>
        <input
          type="text"
          value={formData.skills.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              skills: e.target.value.split(",").map((skill) => skill.trim()),
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Save Portfolio
      </button>
    </form>
  );
};

export default PortfolioForm;

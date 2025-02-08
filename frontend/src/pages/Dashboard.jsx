import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { getPortfolios } from "../services/api";

const Dashboard = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      const data = await getPortfolios();
      setPortfolios(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Portfolios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <div
            key={portfolio.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{portfolio.title}</h2>
            <p className="text-gray-600 mb-4">{portfolio.description}</p>
            <div className="flex justify-between items-center">
              <Link
                to={`/portfolio/${portfolio.shareableLink}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View Portfolio
              </Link>
              <Link
                to={`/edit/${portfolio.id}`}
                className="text-gray-600 hover:text-gray-800"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

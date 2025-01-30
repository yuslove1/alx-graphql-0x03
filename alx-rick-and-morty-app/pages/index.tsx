import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "@/graphql/queries";
import EpisodeCard from "@/components/common/EpisodeCard";
import { useEffect, useState } from "react";
import { EpisodeProps } from "@/interfaces";

// Home component - displays a list of Rick and Morty episodes
const Home: React.FC = () => {
  // State for the current page number
  const [page, setPage] = useState<number>(1);

  // Use Apollo Client's useQuery hook to fetch episode data
  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    variables: {
      page: page, // Pass the current page number as a variable to the query
    },
  });

  // Use effect to refetch data whenever the page number changes
  useEffect(() => {
    refetch(); // Refetch the episodes with the new page number
  }, [page, refetch]);

  // Display loading message while data is being fetched
  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;

  // Display error message if there's an error during fetching
  if (error) return <h1 className="text-center mt-10">Error: {error.message}</h1>; // Display error message

  // Extract results and info from the fetched data
  const results = data?.episodes.results;
  const info = data?.episodes.info;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
      {/* Header section */}
      <header className="bg-[#4CA1AF] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold tracking-wide">Rick and Morty Episodes</h1>
        <p className="mt-2 text-lg italic">Explore the multiverse of adventures!</p>
      </header>

      {/* Main content section */}
      <main className="flex-grow p-6">
        {/* Episode grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results &&
            results.map(({ id, name, air_date, episode }, key) => (
              <EpisodeCard
                id={id}
                name={name}
                air_date={air_date}
                episode={episode}
                key={key}
              />
            ))}
        </div>

        {/* Pagination buttons */}
        <div className="flex justify-between mt-6">
          {/* Previous button */}
          <button
            onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105"
            disabled={page === 1} // Disable if on the first page
          >
            Previous
          </button>

          {/* Next button */}
          <button
            onClick={() => setPage((prev) => (prev < info.pages ? prev + 1 : prev))}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105"
            disabled={page === info.pages} // Disable if on the last page
          >
            Next
          </button>
        </div>
      </main>

      {/* Footer section */}
      <footer className="bg-[#4CA1AF] text-white py-4 text-center shadow-md">
        <p>&copy; 2024 Rick and Morty Fan Page</p>
      </footer>
    </div>
  );
};

export default Home;
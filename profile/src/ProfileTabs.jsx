import React, {useState} from "react";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 3;

  // Handle Tab Switching
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const imageUrls = uploadedFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  // Calculate the index of the first and last image to display on the current page
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Handle Next and Previous page
  const nextPage = () => {
    if (currentPage < Math.ceil(images.length / imagesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-start pt-12 px-4 lg:px-0">
      <div className="max-w-2xl w-full">
        {/* Tabs */}
        <div className="flex justify-center items-center bg-gray-800 p-4 rounded-l-lg rounded-r-lg">
          <div className="flex space-x-8 bg-black rounded-full text-gray-400">
            <button
              className={`py-2 px-4 rounded-lg transition-colors duration-300 ${
                activeTab === "about"
                  ? "bg-gray-700 text-white shadow-custom"
                  : ""
              }`}
              onClick={() => switchTab("about")}
            >
              About Me
            </button>
            <button
              className={`py-2 px-4 rounded-lg transition-colors duration-300 ${
                activeTab === "experiences"
                  ? "bg-gray-700 text-white shadow-custom"
                  : ""
              }`}
              onClick={() => switchTab("experiences")}
            >
              Experiences
            </button>
            <button
              className={`py-2 px-4 rounded-lg transition-colors duration-300 ${
                activeTab === "recommended"
                  ? "bg-gray-700 text-white shadow-custom"
                  : ""
              }`}
              onClick={() => switchTab("recommended")}
            >
              Recommended
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800 p-6 rounded-b-lg">
          {activeTab === "about" && (
            <div>
              <h1 className="text-2xl font-semibold mb-4">About Me</h1>
              <p className="text-gray-400">
                Hello! I’m Dave, your sales rep here from Salesforce. I’ve been
                working at this awesome company for 3 years now.
              </p>
              <br />
              <p className="text-gray-400">
                I was born and raised in Albany, NY & have been living in Santa
                Carla for the past 10 years with my wife Tiffany and my
                4-year-old twin daughters, Emma and Ella. Both of them are just
                starting school, so my calendar is usually blocked between 9-10
                AM. This is a...
              </p>
            </div>
          )}
          {activeTab === "experiences" && (
            <div>
              <h1 className="text-2xl font-semibold mb-4">Experiences</h1>
              <p>List of experiences will go here...</p>
            </div>
          )}
          {activeTab === "recommended" && (
            <div>
              <h1 className="text-2xl font-semibold mb-4">Recommended</h1>
              <p>Recommended content will go here...</p>
            </div>
          )}
        </div>

        {/* Gallery Section */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold bg-black rounded-lg p-4">
              Gallery
            </h2>
            <div className="flex items-center space-x-2">
              {/* Add Image Button */}
              <label className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg cursor-pointer shadow-custom">
                <span>+ Add Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>

              {/* Navigation Arrows */}
              <div className="flex items-center space-x-2 ">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="bg-gray-800 px-2 py-1 rounded-lg text-white disabled:opacity-50 shadow-custom"
                >
                  &lt;
                </button>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage >= Math.ceil(images.length / imagesPerPage)
                  }
                  className="bg-gray-800 px-2 py-1 rounded-lg text-white disabled:opacity-50 shadow-custom"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {images.length === 0 ? (
              <p className="col-span-3 text-gray-400">No images added yet</p>
            ) : (
              currentImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;


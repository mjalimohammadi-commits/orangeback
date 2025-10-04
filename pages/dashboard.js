import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [productLink, setProductLink] = useState("");
  const [amazonBase, setAmazonBase] = useState("https://www.amazon.com");
  const [recentSearches, setRecentSearches] = useState([]);

  // --- دریافت اطلاعات کاربر و تشخیص کشور ---
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("mockSession"));
    if (session) {
      setUser(session);
    } else {
      window.location.href = "/login";
      return;
    }

    // تشخیص کشور از IP و انتخاب دامنه مناسب آمازون
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const countryCode = data?.country_code;
        const amazonDomains = {
          US: "https://www.amazon.com",
          DE: "https://www.amazon.de",
          UK: "https://www.amazon.co.uk",
          FR: "https://www.amazon.fr",
          CA: "https://www.amazon.ca",
          AE: "https://www.amazon.ae",
          IN: "https://www.amazon.in",
          JP: "https://www.amazon.co.jp",
          IT: "https://www.amazon.it",
          ES: "https://www.amazon.es",
          NL: "https://www.amazon.nl",
          BR: "https://www.amazon.com.br",
          AU: "https://www.amazon.com.au",
          MX: "https://www.amazon.com.mx",
        };
        setAmazonBase(amazonDomains[countryCode] || "https://www.amazon.com");
      })
      .catch(() => setAmazonBase("https://www.amazon.com"));

    // بارگذاری جستجوهای قبلی از localStorage
    const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(savedSearches);
  }, []);

  // --- ذخیره جستجو در localStorage ---
  const saveSearch = (term) => {
    if (!term.trim()) return;

    const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // --- هندل سرچ بر اساس نام محصول ---
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.error("Please enter a product name to search 🔍");
      return;
    }

    const amazonUrl = `${amazonBase}/s?k=${encodeURIComponent(searchQuery.trim())}`;
    toast.success(`Searching Amazon for "${searchQuery}"...`);
    saveSearch(searchQuery.trim());
    window.open(amazonUrl, "_blank");
  };

  // --- هندل لینک مستقیم محصول ---
  const handleProductLink = (e) => {
    e.preventDefault();

    if (!productLink.trim()) {
      toast.error("Please paste a valid Amazon product link 🔗");
      return;
    }

    if (!productLink.startsWith("http")) {
      toast.error("Invalid link format. Must start with http or https");
      return;
    }

    toast.success("Opening product page on Amazon 🛒");
    window.open(productLink.trim(), "_blank");
  };

  // --- حذف جستجوها ---
  const clearRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
    toast.success("Recent searches cleared 🧹");
  };

  if (!user) {
    return (
      <Layout title="Dashboard - OrangeBack">
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard - OrangeBack">
      <div className="flex items-center justify-center py-16 px-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h1>
          <p className="mt-3 text-gray-600">
            Hi, <span className="font-semibold text-orange-600">{user.name || user.email}</span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Search products and earn cashback on Amazon.
          </p>

          {/* --- Search by Product Name --- */}
          <form onSubmit={handleSearch} className="mt-8 space-y-3 text-left">
            <label className="block text-sm text-gray-600">Search for a product</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. iPhone 15 case"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-orange-700 transition"
            >
              Search on Amazon
            </button>
          </form>

          {/* --- Recent Searches --- */}
          {recentSearches.length > 0 && (
            <div className="mt-6 text-left">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Recent Searches</h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-red-500 hover:underline"
                >
                  Clear all
                </button>
              </div>
              <ul className="space-y-2">
                {recentSearches.map((term, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        const amazonUrl = `${amazonBase}/s?k=${encodeURIComponent(term)}`;
                        window.open(amazonUrl, "_blank");
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* --- OR Divider --- */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* --- Direct Product Link --- */}
          <form onSubmit={handleProductLink} className="space-y-3 text-left">
            <label className="block text-sm text-gray-600">Paste an Amazon product link</label>
            <input
              type="url"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
              placeholder="https://www.amazon.com/..."
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition"
            >
              Go to Product
            </button>
          </form>

          {/* --- نمایش دامنه فعلی آمازون --- */}
          <p className="mt-6 text-sm text-gray-500">
            Redirecting to:{" "}
            <span className="font-medium text-orange-600">
              {amazonBase.replace("https://", "")}
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}

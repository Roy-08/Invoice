import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Vandaya Global Logistics
        </h1>
        <p className="text-lg text-gray-600">Invoice Generation System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
        {/* Air Invoice Card */}
        <Link
          href="/air"
          className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-300"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Create Invoice for Air
            </h2>
            <p className="text-base text-gray-500">
              Generate air freight invoice with AWB details
            </p>
          </div>
        </Link>

        {/* Sea Invoice Card */}
        <Link
          href="/sea"
          className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-teal-300"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
              <svg
                className="w-8 h-8 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Create Invoice for Sea
            </h2>
            <p className="text-base text-gray-500">
              Generate sea freight invoice with BL &amp; Container details
            </p>
          </div>
        </Link>
      </div>

      <p className="mt-10 text-sm text-gray-400">
        GSTIN: {`27AAJCV3770N1ZF`} | State: Maharashtra | Code: 27
      </p>
    </div>
  );
}
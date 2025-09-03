export default function TestImage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Image Test Page</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Test 1: Root public folder</h2>
          <img
            src="/elite_logo.png"
            alt="Test 1"
            className="w-20 h-20 border"
            // onError={(e) => console.error("Test 1 failed:", e)}
            // onLoad={() => console.log("Test 1 succeeded")}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Test 2: Imgs subfolder</h2>
          <img
            src="/imgs/elite_logo.png"
            alt="Test 2"
            className="w-20 h-20 border"
            // onError={(e) => console.error("Test 2 failed:", e)}
            // onLoad={() => console.log("Test 2 succeeded")}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Test 3: Relative path</h2>
          <img
            src="./elite_logo.png"
            alt="Test 3"
            className="w-20 h-20 border"
            // onError={(e) => console.error("Test 3 failed:", e)}
            // onLoad={() => console.log("Test 3 succeeded")}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Test 4: Existing placeholder
          </h2>
          <img
            src="/placeholder.svg"
            alt="Test 4"
            className="w-20 h-20 border"
            // onError={(e) => console.error("Test 4 failed:", e)}
            // onLoad={() => console.log("Test 4 succeeded")}
          />
        </div>
      </div>
    </div>
  );
}

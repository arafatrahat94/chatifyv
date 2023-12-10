"use client";
const GlobalError = (error, reset) => {
  return (
    <div>
      <div className="min-h-screen w-full flex justify-center items-center">
        <div>
          {" "}
          <div class="loading-barE">Error</div>
          <h1>{error.message || "something went wrong"}</h1>
          <button onClick={() => reset()}>Retry</button>
        </div>
      </div>
    </div>
  );
};

export default GlobalError;

"use client";
const GlobalError = (error, reset) => {
  return (
    <div>
      <div class="loading-barE">Error</div>
      <h1>{error.message || "something went wrong"}</h1>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
};

export default GlobalError;

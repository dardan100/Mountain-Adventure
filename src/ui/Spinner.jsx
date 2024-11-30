import React from "react";

const Spinner = () => {
  return (
    <div
      className="mx-auto my-20 w-16 h-16 rounded-full animate-spin"
      style={{
        background: `
          radial-gradient(farthest-side, #1D4ED8 94%, transparent) top/10px 10px no-repeat,
          conic-gradient(transparent 30%, #1D4ED8)
        `,
        mask: "radial-gradient(farthest-side, transparent calc(100% - 10px), black 0)",
      }}
    >
      {/* The spinner itself is created using background gradients */}
    </div>
  );
};

export default Spinner;

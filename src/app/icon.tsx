import { ImageResponse } from "next/og";
import portfolioConfig from "@/config/portfolio.config";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Icon() {
  const initials = getInitials(portfolioConfig.name);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: portfolioConfig.theme.primary,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: initials.length === 1 ? 24 : 20,
          fontWeight: 800,
          borderRadius: "6px",
          fontFamily: "sans-serif",
        }}
      >
        {initials}
      </div>
    ),
    size
  );
}
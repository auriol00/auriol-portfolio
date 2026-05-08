// Tag — small pill label. "neutral" uses theme-aware border colors (for skill/project tags),
// "brand" uses the secondary color as solid background (for timeline type badges).
import portfolioConfig from "@/config/portfolio.config";

type TagProps = {
  label: string;
  variant?: "neutral" | "brand";
};

export default function Tag({ label, variant = "neutral" }: TagProps) {
  return (
    <span
      className="text-xs px-2.5 py-0.5 rounded-full"
      style={
        variant === "brand"
          ? {
              background: portfolioConfig.theme.secondary,
              color: "white",
            }
          : {
              background: "var(--background-secondary)",
              color: "var(--foreground-secondary)",
              border: "1px solid var(--border)",
            }
      }
    >
      {label}
    </span>
  );
}

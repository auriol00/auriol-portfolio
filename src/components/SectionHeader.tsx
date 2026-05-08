// SectionHeader — consistent heading block used at the top of every major section.
// subtitle (small accent text) + title (large heading) + optional description.
type SectionHeaderProps = {
  subtitle: string;
  title: string;
  description?: string;
};

export default function SectionHeader({ subtitle, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-10">
      <p
        className="text-sm font-semibold tracking-widest uppercase mb-2 text-accent"
      >
        {subtitle}
      </p>
      <h2
        className="text-3xl font-semibold text-main"
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm mt-2 text-muted">
          {description}
        </p>
      )}
    </div>
  );
}

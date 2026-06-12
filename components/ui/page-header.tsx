export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        {eyebrow ? <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">{eyebrow}</p> : null}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-slate-600">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

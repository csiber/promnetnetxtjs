import Left from "@/app/dashboard/Left/page";

export default function DashboardLayout({ children }) {
  return (
    <div className="mx-auto max-w-[78rem]">
      <div className="flex flex-col gap-4 md:mt-5 md:flex-row md:items-start">
        <Left />
        <div className="flex-1 md:self-start">{children}</div>
      </div>
    </div>
  );
}

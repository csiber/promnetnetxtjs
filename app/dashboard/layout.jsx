import Left from "@/app/dashboard/Left/page";

export default function DashboardLayout({ children }) {
  return (
    <div className="mx-auto max-w-[78rem]">
      <div className="flex flex-col gap-4 md:mt-5 md:flex-row">
        <Left />
        {children}
      </div>
    </div>
  );
}

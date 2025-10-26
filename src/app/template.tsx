import RedirectToast from "@/components/general/redirect-toast";

type RootTemplateProps = { children: React.ReactNode };

export default function Template({ children }: RootTemplateProps) {
  return (
    <>
      <>{children}</>
      <RedirectToast />
    </>
  );
}

import { Separator } from "../ui/separator";

type HeadingProps = {
  params: {
    pageTitle: string;
    pageDesc?: string;
  };
};

const Heading = async ({ params }: HeadingProps) => {
  const { pageTitle, pageDesc } = await params;
  return (
    <>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2>
        {pageDesc && (
          <p className="text-sm text-muted-foreground">{pageDesc}</p>
        )}
      </div>

      <Separator />
    </>
  );
};

export default Heading;

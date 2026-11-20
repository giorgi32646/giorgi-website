import { Seo } from "../components/Seo";
import { pageByPath } from "../../lib/seo";
import { WorkSection } from "../components/WorkSection";

export function WorkPage() {
  return (
    <div style={{ paddingTop: "72px" }}>
      <Seo page={pageByPath("/work")!} />

      <WorkSection />
    </div>
  );
}

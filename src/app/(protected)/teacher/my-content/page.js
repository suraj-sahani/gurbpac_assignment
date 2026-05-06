import ContentCard from "@/components/cards/content-card";
import { Card } from "@/components/ui/card";
import { redirectUserByRole } from "@/lib/auth";
import { getTeacherContent } from "@/lib/services/content.service";

// SSR Page Example
export default async function TeacherContentPage() {
  const session = await redirectUserByRole();
  const teacherContent = await getTeacherContent(session.user.id);
  console.log(teacherContent);
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {teacherContent.map((c) => (
        <ContentCard content={c} key={c.id} />
      ))}
    </div>
  );
}

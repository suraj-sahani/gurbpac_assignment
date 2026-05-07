import ContentCard from "@/components/cards/content-card";
import NoData from "@/components/no-data";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/services/auth.service";

import { getTeacherContent } from "@/lib/services/content.service";
import { FolderOpen, Upload06Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

// SSR Page Example
export default async function TeacherContentPage() {
  const session = await getSession();
  const teacherContent = await getTeacherContent(session?.user?.id);

  if (!teacherContent.length) {
    return (
      <NoData
        icon={
          <HugeiconsIcon
            icon={FolderOpen}
            size={24}
            color="currentColor"
            className="h-4 w-4 mr-2"
          />
        }
        title="No content yet"
        description="Upload your first piece of content to get started."
        action={
          <Link href="/teacher/upload-content">
            <Button>
              <HugeiconsIcon
                icon={Upload06Icon}
                size={24}
                color="currentColor"
                className="h-4 w-4 mr-2"
              />
              Upload Content
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {teacherContent.map((c) => (
        <ContentCard content={c} key={c.id} />
      ))}
    </div>
  );
}

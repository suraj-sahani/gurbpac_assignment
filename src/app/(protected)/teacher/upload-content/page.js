import { UploadForm } from "@/components/forms/teacher/upload-content-form";
import { Card, CardContent } from "@/components/ui/card";

export default function UploadContentPage() {
  return (
    <Card className="max-w-3xl rounded-xl">
      <CardContent className="p-6">
        <UploadForm />
      </CardContent>
    </Card>
  );
}

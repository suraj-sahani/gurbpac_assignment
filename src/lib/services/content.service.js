import { SAMPLE_CONTENT } from "../constants";

const inMemoryContents = structuredClone(SAMPLE_CONTENT);

export async function getTeacherStats(teacherId) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const teacherContent = inMemoryContents.filter(
    (c) => c.teacherId === teacherId,
  );

  return {
    total: teacherContent.length,
    approved: teacherContent.filter((c) => c.status === "approved").length,
    pending: teacherContent.filter((c) => c.status === "pending").length,
    rejected: teacherContent.filter((c) => c.status === "rejected").length,
  };
}

export async function getTeacherContent(teacherId) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return inMemoryContents.filter((c) => c.teacherId === teacherId);
}

export async function uploadContent(content) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newContent = {
    ...content,
    id: `content-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  inMemoryContents.push(newContent);
  return newContent;
}

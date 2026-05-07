import { SAMPLE_CONTENT } from "../constants";

export const inMemoryContents = structuredClone(SAMPLE_CONTENT);
export const inMemoryApprovalStore = [];

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

export async function getContentStats() {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    total: inMemoryContents.length,
    approved: inMemoryContents.filter((c) => c.status === "approved").length,
    pending: inMemoryContents.filter((c) => c.status === "pending").length,
    rejected: inMemoryContents.filter((c) => c.status === "rejected").length,
  };
}

export async function getContentByStatus(status) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return inMemoryContents.filter((c) => c.status === status);
}

export async function getAllContent(filters) {
  const { search, status } = filters || {};
  await new Promise((resolve) => setTimeout(resolve, 300));

  let items = structuredClone(inMemoryContents);
  if (status && status.toLowerCase() !== "all")
    items = items.filter((c) => c.status === status.toLowerCase());
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.teacherName.toLowerCase().includes(q),
    );
  }

  return items.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export const getLiveTeachers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const now = Date.now();
  const live = inMemoryContents.filter(
    (c) =>
      c.status === "approved" &&
      +new Date(c.startTime) <= now &&
      +new Date(c.endTime) >= now,
  );

  const map = new Map();
  for (const c of live) {
    const existing = map.get(c.teacherId);
    if (!existing || +new Date(c.startTime) > +new Date(existing.startTime)) {
      map.set(c.teacherId, c);
    }
  }

  return Array.from(map.values()).map((c) => ({
    teacherId: c.teacherId,
    teacherName: c.teacherName,
    subject: c.subject,
    content: c,
  }));
};

export const getLiveTeacherContent = async (teacherId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const now = Date.now();
  const live = inMemoryContents.filter(
    (c) =>
      c.teacherId === teacherId &&
      c.status === "approved" &&
      +new Date(c.startTime) <= now &&
      +new Date(c.endTime) >= now,
  );

  if (!live.length) return null;

  return live.sort(
    (a, b) => +new Date(b.startTime) - +new Date(a.startTime),
  )[0];
};

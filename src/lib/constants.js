export const SAMPLE_USERS = [
  {
    id: "user-1",
    email: "teacher@example.com",
    name: "Ms. Sarah Johnson",
    role: "teacher",
  },
  {
    id: "user-2",
    email: "teacher2@example.com",
    name: "Mr. James Smith",
    role: "teacher",
  },
  {
    id: "user-3",
    email: "principal@example.com",
    name: "Dr. Robert Williams",
    role: "principal",
  },
  {
    id: "user-4",
    email: "student@example.com",
    name: "Emma Davis",
    role: "student",
  },
];

export const TEST_CREDENTIALS = [
  { email: "teacher@example.com", password: "password123" },
  { email: "teacher2@example.com", password: "password123" },
  { email: "principal@example.com", password: "password123" },
  { email: "student@example.com", password: "password123" },
];

export const SAMPLE_CONTENT = [
  {
    id: "content-1",
    teacherId: "user-1",
    teacherName: "Ms. Sarah Johnson",
    title: "Introduction to Mathematics",
    subject: "Mathematics",
    description:
      "A comprehensive introduction to basic mathematical concepts including arithmetic, algebra, and geometry.",
    fileUrl: "/test-content.svg",
    fileType: "image",
    status: "approved",
    startTime: "2026-05-07T10:00:00.000Z",
    endTime: "2026-05-08T10:00:00.000Z",
    rotationDuration: 30,
    createdAt: "2026-04-29T10:00:00.000Z",
    updatedAt: "2026-04-29T10:00:00.000Z",
  },
  {
    id: "content-2",
    teacherId: "user-1",
    teacherName: "Ms. Sarah Johnson",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    description:
      "Learn the fundamentals of algebra with practical examples and exercises.",
    fileUrl: "/test-content.svg",
    fileType: "image",
    status: "pending",
    startTime: "2026-05-09T10:00:00.000Z",
    endTime: "2026-05-10T10:00:00.000Z",
    rotationDuration: 45,
    createdAt: "2026-05-05T10:00:00.000Z",
    updatedAt: "2026-05-05T10:00:00.000Z",
  },
  {
    id: "content-3",
    teacherId: "user-2",
    teacherName: "Mr. James Smith",
    title: "World History Overview",
    subject: "History",
    description:
      "A general overview of major historical events and civilizations throughout world history.",
    fileUrl: "/test-content.svg",
    fileType: "image",
    status: "rejected",
    rejectionReason:
      "Image quality too low. Please provide a higher resolution image.",
    startTime: "2026-05-04T10:00:00.000Z",
    endTime: "2026-05-05T10:00:00.000Z",
    rotationDuration: 60,
    createdAt: "2026-05-03T10:00:00.000Z",
    updatedAt: "2026-05-04T10:00:00.000Z",
  },
  {
    id: "content-4",
    teacherId: "user-2",
    teacherName: "Mr. James Smith",
    title: "Ancient Egypt Civilization",
    subject: "History",
    description:
      "Deep dive into the ancient Egyptian civilization, culture, and achievements.",
    fileUrl: "/test-content.svg",
    fileType: "image",
    status: "approved",
    startTime: "2026-05-11T10:00:00.000Z",
    endTime: "2026-05-12T10:00:00.000Z",
    rotationDuration: 40,
    createdAt: "2026-05-02T10:00:00.000Z",
    updatedAt: "2026-05-02T10:00:00.000Z",
  },
];

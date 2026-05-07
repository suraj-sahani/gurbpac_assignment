export default async function TeacherLivePage({ params }) {
  const { teacherId } = await params;

  return <>{teacherId}</>;
}

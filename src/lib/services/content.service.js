import { SAMPLE_CONTENT } from "../constants";

const inMemoryContents = structuredClone(SAMPLE_CONTENT);
let inMemoryApprovalStore = [];

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

export async function updateContentStatus(contentId, status, rejectionReason) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const content = inMemoryContents.find((c) => c.id === contentId);
  if (!content) return null;

  content.status = status;
  if (rejectionReason) {
    content.rejectionReason = rejectionReason;
  }
  content.updatedAt = new Date().toISOString();

  return content;
}

export async function getContentByStatus(status) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return inMemoryContents.filter((c) => c.status === status);
}

export async function approveContent(contentId, principalId) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Update content status to approved
  const updated = await updateContentStatus(contentId, "approved");
  if (!updated) return null;

  const approval = {
    id: `approval-${Date.now()}`,
    contentId,
    action: "approved",
    approvedAt: new Date().toISOString(),
    approvedBy: principalId,
  };

  inMemoryApprovalStore.push(approval);
  return {
    success: true,
    message: "Content Approved successfully",
    data: approval,
  };
}

export async function rejectContent(contentId, principalId, reason) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Update content status to rejected with reason
  const updated = await updateContentStatus(contentId, "rejected", reason);
  if (!updated) return null;

  const approval = {
    id: `approval-${Date.now()}`,
    contentId,
    action: "rejected",
    reason,
    approvedAt: new Date().toISOString(),
    approvedBy: principalId,
  };

  inMemoryApprovalStore.push(approval);
  return {
    success: true,
    message: "Content Rejected successfully",
    data: approval,
  };
}

export async function updateContentApprovalStatus(
  contentId,
  principalId,
  action,
  reason = null,
) {
  // Shared delay logic
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Update content status (passes reason if provided, otherwise undefined)
  const updated = await updateContentStatus(contentId, action, reason);
  if (!updated) return null;

  const result = {
    id: `approval-${Date.now()}`,
    contentId,
    action,
    ...(reason && { reason }), // Only includes 'reason' key if a reason was provided
    approvedAt: new Date().toISOString(),
    approvedBy: principalId,
  };

  inMemoryApprovalStore.push(result);

  return {
    success: true,
    // Capitalizes the action for the message (e.g., "approved" -> "Approved")
    message: `Content ${action.charAt(0).toUpperCase() + action.slice(1)} successfully`,
    data: result,
  };
}

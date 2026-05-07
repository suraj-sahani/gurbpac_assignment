import { inMemoryApprovalStore, inMemoryContents } from "./content.service";

export async function updateContentStatus(contentId, status, rejectionReason) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const content = inMemoryContents.find((c) => c.id === contentId);
    if (!content) return null;

    content.status = status;
    if (rejectionReason) {
      content.rejectionReason = rejectionReason;
    }
    content.updatedAt = new Date().toISOString();

    return content;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to update content status.",
    );
  }
}

export async function updateContentApprovalStatus(
  contentId,
  principalId,
  action,
  reason = null,
) {
  try {
    // Shared delay logic
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Update content status (passes reason if provided, otherwise undefined)
    const updated = await updateContentStatus(contentId, action, reason);

    // Logic check: if updated failed or returned an error message string
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
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to update content approval status.",
    );
  }
}

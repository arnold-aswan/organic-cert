import ActivityLog from "../models/activity.model";

type ResourceType =
	| "Farmer"
	| "Farm"
	| "Field"
	| "Inspection"
	| "Agronomist"
	| "Certificate";
type ActionType = "created" | "updated" | "deleted" | "issued";

const logActivity = async (
	resourceType: ResourceType,
	action: ActionType,
	resourceId: string,
	title: string,
	description: string
) => {
	try {
		await ActivityLog.create({
			action,
			resourceType,
			resourceId,
			description,
			title,
		});
	} catch (error) {
		console.error("Error logging activity:", error);
	}
};

export { logActivity };
